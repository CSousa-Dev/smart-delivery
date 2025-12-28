# Project Definition

**Last Updated**: 2025-01-11

---

## Contexto do Projeto

Este projeto é um sistema **ERP multimódulo** focado em delivery, gerenciando operações de negócio através de múltiplos contextos especializados:

- **Cadastro de Produtos**: Gerencia o catálogo de produtos disponíveis para venda
- **Cadastro de Insumos**: Gerencia matérias-primas e insumos necessários para produção
- **Gestão de Pedidos**: Processa e gerencia pedidos de clientes
- **Estoque**: Controla entrada, saída e disponibilidade de produtos e insumos
- **Produção**: Gerencia processos de produção e transformação de insumos em produtos

**Nota**: Os módulos serão implementados de forma gradual. Novos módulos podem ser adicionados conforme a necessidade do projeto (ex: gestão de clientes, financeiro, entregas, etc.).

---

## Stack

| Aspecto | Valor |
|---------|-------|
| Language | TypeScript (última versão estável) |
| Runtime | Node.js (última versão LTS) |
| Package Manager | npm |
| Build | tsc |
| Test | Jest |
| Lint | ESLint |
| Format | Prettier |

---

## Database & Infrastructure

| Aspecto | Valor |
|---------|-------|
| Database | MySQL (via Docker) |
| ORM | Prisma |
| Infra Local | Docker Compose (todos os serviços containerizados) |
| Testes de Integração | SQLite em memória |
| Event Bus | RabbitMQ (via Docker) |
| Cache | Redis (via Docker) |
| Logging Centralizado | Grafana Loki + Promtail + Grafana (via Docker) |

### Containers Docker

A aplicação roda completamente containerizada via Docker Compose:

- **Aplicação**: Container Node.js com TypeScript executando a aplicação
- **Banco de Dados**: Container MySQL (um banco por módulo/contexto)
- **Event Bus**: Container RabbitMQ para comunicação assíncrona entre contextos
- **Cache**: Container Redis para cache distribuído
- **Logging**: Stack Grafana (Loki + Promtail + Grafana) para centralização e visualização de logs

### Banco de Dados por Módulo

**Cada módulo possui seu próprio banco de dados**, garantindo isolamento e facilitando a migração futura para microserviços. Os módulos não compartilham banco de dados.

### Event Bus (RabbitMQ)

- Utilizado para comunicação assíncrona entre contextos/módulos
- Interface web de gerenciamento disponível (RabbitMQ Management UI) para visualizar eventos publicados e sua estrutura
- Eventos são publicados de forma agnóstica à infraestrutura (abstração via ports/interfaces)

### Cache (Redis)

- Container Redis disponível para toda a aplicação
- Acesso via abstrações/ports para manter desacoplamento

### Logging Centralizado (Grafana Stack)

- **Grafana Loki**: Armazena e indexa logs de forma eficiente
- **Promtail**: Coleta logs dos containers e envia para Loki
- **Grafana**: Interface web para visualização, busca e análise de logs
- Suporta alertas baseados em queries de log
- Integração nativa com logs estruturados (JSON do Pino)
- Interface similar a Datadog/New Relic, mas self-hosted

---

## HTTP Layer & Framework

| Aspecto | Valor |
|---------|-------|
| HTTP Framework | Fastify |

### Diretrizes

- Presentation usa Fastify apenas como mecanismo de transporte HTTP, sem vazar conceitos de framework para Domain ou Application.
- Controllers em `presentation/http/controllers` são adaptadores finos entre Fastify e os Application Services.
- Rotas e lifecycle de Fastify ficam encapsulados em um módulo de bootstrap na camada de infrastructure/presentation.

---

## Architecture

### Estilo Arquitetural

**DDD (Domain-Driven Design)** com 4 camadas, organizado em **múltiplos contextos delimitados**.

### Arquitetura Multimódulo

O projeto é dividido em **diversos contextos diferentes**, cada um seguindo DDD com suas próprias 4 camadas. Os contextos se comunicam através de:

- **Eventos**: Comunicação assíncrona via Event Bus (RabbitMQ)
- **Ports**: Interfaces/contratos para comunicação síncrona entre contextos

Esta arquitetura permite que o monolito seja facilmente transformado em microserviços no futuro, onde cada contexto pode se tornar um serviço independente.

### Comunicação entre Contextos

#### Eventos

- Eventos são publicados e escritos de forma **agnóstica a decisões de infraestrutura**
- A implementação do adapter de eventos fica na camada de Infrastructure
- Quando um contexto evolui para microserviço, apenas o adapter de infraestrutura precisa ser alterado
- Eventos de domínio e aplicação são definidos nas camadas Domain e Application respectivamente

#### Ports

- Interfaces definidas no Domain ou Application para comunicação síncrona entre contextos
- Implementações ficam na Infrastructure
- Permitem desacoplamento e facilitam migração para microserviços

### Camadas (por Contexto)

Cada contexto segue a estrutura de 4 camadas:

```
Presentation → Application → Domain ← Infrastructure
                               ↑
                          (implementa interfaces)
```

---

#### Domain (núcleo, zero dependências externas)

```
O QUE É: Regras de negócio puras
CONTÉM: Entities, Value Objects, Domain Services, Domain Events, Repository Interfaces
CONHECE: Nada além de si mesmo
NÃO PODE: Importar de application, presentation, infrastructure
```

| Pasta | Responsabilidade |
|-------|------------------|
| `entities/` | Objetos com identidade + seus Value Objects |
| `services/` | Regras que envolvem múltiplas entities |
| `events/` | Eventos que o domínio emite |
| `repositories/` | **Interfaces** (contratos, não implementações) |
| `ports/` | Interfaces para serviços externos e comunicação entre contextos |

---

#### Application (orquestração)

```
O QUE É: Casos de uso, coordena o domínio
CONTÉM: Application Services, DTOs, Application Events
CONHECE: Domain
NÃO PODE: Importar de presentation, infrastructure
```

| Pasta | Responsabilidade |
|-------|------------------|
| `services/` | Orquestra chamadas ao domain, implementa casos de uso |
| `dtos/` | Entrada e saída da aplicação (não são entities!) |
| `events/` | Eventos de aplicação (ex: notificações) |

---

#### Presentation (interface com mundo externo)

```
O QUE É: Como o mundo externo acessa a aplicação
CONTÉM: Controllers, Routes, Middlewares
CONHECE: Application (DTOs)
NÃO PODE: Importar de domain diretamente, infrastructure
```

| Pasta | Responsabilidade |
|-------|------------------|
| `http/controllers/` | Recebe request, chama application service, retorna response |
| `http/middlewares/` | Validação, auth, logging de request |

---

#### Infrastructure (implementações concretas)

```
O QUE É: Detalhes técnicos, implementações
CONTÉM: Repository Implementations, Database, External APIs, Event Adapters, Cache Adapters, DI
CONHECE: Domain (para implementar interfaces), Application
NÃO PODE: Ser importado por domain
```

| Pasta | Responsabilidade |
|-------|------------------|
| `repositories/` | Implementa interfaces do domain |
| `database/` | Prisma schemas, migrations (um banco por contexto) |
| `events/` | Adapters para Event Bus (RabbitMQ) - publicação e subscrição de eventos |
| `cache/` | Adapters para Cache (Redis) |
| `external/` | SDKs, APIs externas |
| `di/` | Factories de injeção de dependências |

---

## Project Structure

### Estrutura Multimódulo

O projeto é organizado por contextos/módulos. Cada módulo possui sua própria estrutura DDD:

```
src/
├── [contexto-1]/              # Ex: product-catalog, ingredient-management, order-management, inventory, production, etc.
│   ├── domain/
│   │   ├── entities/          # entidades + seus value objects
│   │   ├── services/          # domain services
│   │   ├── events/            # domain events (publicados para outros contextos)
│   │   ├── repositories/      # interfaces apenas
│   │   └── ports/             # interfaces para comunicação com outros contextos
│   │
│   ├── application/
│   │   ├── services/          # application services (use cases)
│   │   ├── dtos/              # input/output DTOs
│   │   └── events/            # application events
│   │
│   ├── presentation/
│   │   └── http/
│   │       ├── controllers/
│   │       └── middlewares/
│   │
│   └── infrastructure/
│       ├── database/
│       │   └── prisma/
│       │       ├── schema.prisma  # Schema específico deste contexto
│       │       └── migrations/
│       │
│       ├── repositories/
│       │   └── [entity]/
│       │       ├── [entity].repository.impl.ts
│       │       └── [entity].mapper.ts
│       │
│       ├── events/            # Implementação do adapter de eventos (RabbitMQ)
│       │   ├── event-publisher.ts
│       │   └── event-subscriber.ts
│       │
│       ├── cache/             # Implementação do adapter de cache (Redis)
│       │   └── cache-client.ts
│       │
│       ├── external/          # APIs externas, SDKs
│       │
│       └── di/
│           ├── index.ts       # exporta container montado
│           ├── repositories.ts
│           ├── services.ts
│           └── controllers.ts
│
├── [contexto-2]/              # Outro contexto/módulo
│   └── ...                    # Mesma estrutura
│
└── shared/                    # Código compartilhado entre contextos (se necessário)
    ├── events/                # Definições de eventos compartilhados
    └── types/                 # Tipos compartilhados
```

### Nota sobre Módulos

- Inicialmente, nenhum módulo será criado; a estrutura será definida conforme a necessidade
- Novos módulos podem ser adicionados gradualmente
- Cada módulo é independente e pode evoluir para microserviço sem impactar outros

---

## Comunicação entre Contextos

### Eventos (Comunicação Assíncrona)

Os contextos se comunicam principalmente através de **eventos** publicados no Event Bus (RabbitMQ).

#### Princípios

- **Agnóstico à Infraestrutura**: Eventos são definidos nas camadas Domain/Application, não conhecem RabbitMQ
- **Adapter Pattern**: A implementação do adapter (RabbitMQ) fica em Infrastructure
- **Facilita Migração**: Quando um contexto vira microserviço, apenas o adapter de infraestrutura muda

#### Estrutura (EXEMPLO)

```typescript
// domain/events/[event-name].event.ts (Domain Event)
export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly items: Array<{ productId: string; quantity: number }>,
    public readonly createdAt: Date
  ) {}
}

// infrastructure/events/event-publisher.ts (Adapter)
export class RabbitMQEventPublisher implements EventPublisher {
  async publish(event: DomainEvent): Promise<void> {
    // Implementação específica do RabbitMQ
  }
}
```

#### Visualização de Eventos

O RabbitMQ Management UI (porta 15672) permite visualizar:
- Eventos publicados
- Estrutura dos eventos
- Filas e exchanges
- Status de processamento

### Ports (Comunicação Síncrona)

Para comunicação síncrona entre contextos, utilizamos **Ports** (interfaces):

- Definidos em Domain ou Application
- Implementados em Infrastructure
- Permitem desacoplamento e facilitam migração para microserviços (HTTP, gRPC, etc.)

---

## Dependency Injection

### Abordagem Por Contexto

**DI Manual** com factories organizadas.

### Error Handling Pattern

- Erros de domínio herdam de um tipo base `DomainError`, que por sua vez herda de um erro de aplicação base (`BaseAppError`).
- Erros de aplicação herdam de `ApplicationError`, também baseado em `BaseAppError`.
- Todo erro de domínio ou aplicação possui:
  - `code` (string estável, ex.: `PRODUCT_NOT_FOUND`, `INSUFFICIENT_STOCK`);
  - `args` opcionais para parametrizar mensagens (ex.: `{ productId: "123", availableStock: 5 }`);
  - metadados de camada (`layer`: `domain`, `application`, `infrastructure`).
- A camada de presentation é responsável por:
  - mapear `code` → `httpStatus` e mensagem em um catálogo centralizado (com suporte a múltiplos idiomas);
  - serializar respostas de erro consistentes para clientes.

### Estrutura

```typescript
// infrastructure/di/repositories.ts
export function createRepositories(db: PrismaClient) {
  return {
    productRepository: new PrismaProductRepository(db),
    orderRepository: new PrismaOrderRepository(db),
    inventoryRepository: new PrismaInventoryRepository(db),
  }
}
```

```typescript
// infrastructure/di/services.ts
export function createDomainServices(repos: Repositories) {
  return {
    // domain services que precisam de repos
  }
}

export function createAppServices(repos: Repositories) {
  return {
    createProduct: new CreateProductService(repos.productRepository),
    createOrder: new CreateOrderService(repos.orderRepository),
    updateInventory: new UpdateInventoryService(repos.inventoryRepository),
  }
}
```

```typescript
// infrastructure/di/controllers.ts
export function createControllers(appServices: AppServices) {
  return {
    productController: new ProductController(appServices.createProduct),
    orderController: new OrderController(appServices.createOrder),
    inventoryController: new InventoryController(appServices.updateInventory),
  }
}
```

```typescript
// infrastructure/di/index.ts
export function bootstrap(db: PrismaClient) {
  const repos = createRepositories(db)
  const domainServices = createDomainServices(repos)
  const appServices = createAppServices(repos)
  const controllers = createControllers(appServices)
  
  return { repos, domainServices, appServices, controllers }
}
```

### Regras

| Regra | Motivo |
|-------|--------|
| Um arquivo por tipo de dependência | Fácil localizar |
| Funções factory, não classes | Simples, testável |
| Ordem: repos → domain services → app services → controllers | Respeita dependências |
| Domain não conhece o DI | Domain permanece puro |

---

## Docker & Infraestrutura

### Abordagem

Toda a aplicação roda via **Docker Compose**, facilitando:
- Desenvolvimento local consistente
- Migração futura para ambientes escaláveis
- Isolamento de serviços
- Facilidade de deploy

### Containers

#### Aplicação
- Container Node.js com TypeScript
- Executa a aplicação Fastify
- Conecta-se aos demais serviços via rede Docker

#### Banco de Dados
- **Um container MySQL por módulo/contexto**
- Cada módulo possui seu próprio banco isolado
- Facilita migração para microserviços (cada um com seu banco)

#### RabbitMQ (Event Bus)
- Container RabbitMQ com Management UI
- Porta 5672: AMQP (comunicação)
- Porta 15672: Management UI (visualização de eventos)
- Permite visualizar eventos publicados e sua estrutura

#### Redis (Cache)
- Container Redis para cache distribuído
- Acesso via abstrações/ports na Infrastructure
- Suporta estratégias de cache por módulo

#### Grafana Stack (Logging)
- **Loki**: Armazena logs de todos os containers
- **Promtail**: Coleta logs automaticamente dos containers Docker
- **Grafana**: Interface web (porta 3001) para:
  - Visualização de logs em tempo real
  - Busca e filtragem avançada
  - Criação de dashboards
  - Configuração de alertas baseados em queries
  - Análise de padrões e tendências
- Logs estruturados (JSON do Pino) são indexados e pesquisáveis
- Funcionalidades similares a Datadog/New Relic, mas self-hosted

### Rede Docker

Todos os serviços se comunicam via rede Docker interna:
- Aplicação → MySQL (por módulo)
- Aplicação → RabbitMQ
- Aplicação → Redis
- Promtail → Loki (coleta de logs)
- Grafana → Loki (visualização de logs)
- Comunicação via nomes de serviço do Docker Compose

---

## Logging

### Abordagem

- Logging estruturado usando `pino` em toda a aplicação.
- Domain não realiza logging diretamente; apenas lança erros e emite eventos de domínio.
- Application registra eventos de negócio relevantes em nível `info` ou `warn`.
- Infrastructure registra falhas técnicas (DB, rede, IO) em nível `error`, incluindo contexto e stacktrace.

### Centralização de Logs

Os logs são centralizados através da **Grafana Stack**:

- **Pino** emite logs em formato JSON para `stdout`
- **Promtail** coleta automaticamente os logs dos containers Docker
- **Loki** armazena e indexa os logs de forma eficiente
- **Grafana** fornece interface web para visualização e análise

### Funcionalidades

- **Visualização em Tempo Real**: Acompanhe logs conforme são gerados
- **Busca Avançada**: Query language (LogQL) para filtrar e buscar logs específicos
- **Dashboards**: Crie visualizações customizadas de métricas de log
- **Alertas**: Configure alertas baseados em padrões de log (ex.: muitos erros, latência alta)
- **Análise de Padrões**: Identifique tendências e problemas recorrentes
- **Multi-módulo**: Visualize logs de todos os contextos/módulos em um único lugar

### Diretrizes

- Em desenvolvimento: nível mínimo `debug`/`info`.
- Em produção: nível mínimo `info`/`warn`, com cuidado para não logar payloads sensíveis.
- Logs são emitidos para `stdout` em formato JSON (Pino).
- Promtail coleta automaticamente sem necessidade de configuração adicional na aplicação.

---

## Conventions

### Naming de Arquivos

| Tipo | Pattern | Exemplo |
|------|---------|---------|
| Entity | `[name].entity.ts` | `product.entity.ts` |
| Value Object | Dentro da entity | `product.entity.ts` (exporta VO junto) |
| Domain Service | `[name].service.ts` | `inventory-validation.service.ts` |
| App Service | `[name].service.ts` | `create-order.service.ts` |
| Repository Interface | `[name].repository.ts` | `product.repository.ts` |
| Repository Impl | `[name].repository.impl.ts` | `product.repository.impl.ts` |
| Mapper | `[name].mapper.ts` | `product.mapper.ts` |
| Controller | `[name].controller.ts` | `product.controller.ts` |
| DTO | `[name].dto.ts` | `create-order.dto.ts` |

### Import Rules

```typescript
// ✅ PERMITIDO
// domain/* pode importar de: domain/*
// application/* pode importar de: domain/*, application/*
// infrastructure/* pode importar de: domain/*, application/*
// presentation/* pode importar de: application/*

// ❌ PROIBIDO
// domain/* importar de infrastructure/*
// domain/* importar de presentation/*
// domain/* importar de application/*
// application/* importar de infrastructure/*
// presentation/* importar de domain/* diretamente
```

---

## Technical Capabilities

| Aspecto | Status |
|---------|--------|
| HTTP Framework | Fastify definido para camada HTTP |
| Validation Library | A definir |
| Logging | Pino definido como logger estruturado |
| Logging Centralizado | Grafana Stack (Loki + Promtail + Grafana) definido (via Docker) |
| Cache | Redis definido (via Docker) |
| Event Bus | RabbitMQ definido (via Docker) com Management UI |
| Env Config | A definir |
| Error Handling Pattern | Padrão com `BaseAppError` + catálogo centralizado de mensagens e HTTP status |
| Containerização | Docker Compose para toda a infraestrutura |

---

## Database Configuration

### Docker Compose

Toda a infraestrutura roda via Docker Compose. O arquivo `docker-compose.yml` deve conter:

- **Aplicação**: Container Node.js com TypeScript
- **Bancos de Dados**: Um container MySQL por módulo/contexto
- **RabbitMQ**: Container para Event Bus
- **Redis**: Container para Cache
- **Grafana Stack**: Containers Loki, Promtail e Grafana para centralização de logs

### Banco de Dados por Módulo

Cada módulo/contexto possui seu próprio banco de dados MySQL:

- **Isolamento**: Cada contexto gerencia seu próprio schema e migrations
- **Migração para Microserviços**: Facilita a separação quando um contexto vira microserviço
- **Configuração**: Cada módulo tem sua própria `DATABASE_URL` apontando para seu banco específico

### Exemplo de Configuração

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL_MODULE_1=mysql://user:pass@mysql-module-1:3306/module_1_db
      - DATABASE_URL_MODULE_2=mysql://user:pass@mysql-module-2:3306/module_2_db
      - RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
      - REDIS_URL=redis://redis:6379
      - LOKI_URL=http://loki:3100
    depends_on:
      - mysql-module-1
      - mysql-module-2
      - rabbitmq
      - redis
      - loki

  mysql-module-1:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: module_1_db
    volumes:
      - mysql_module_1_data:/var/lib/mysql

  mysql-module-2:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: module_2_db
    volumes:
      - mysql_module_2_data:/var/lib/mysql

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"  # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - loki_data:/loki

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
    command: -config.file=/etc/promtail/config.yml
    depends_on:
      - loki

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - loki

volumes:
  mysql_module_1_data:
  mysql_module_2_data:
  rabbitmq_data:
  redis_data:
  loki_data:
  grafana_data:
```

### Migrations

Cada módulo gerencia suas próprias migrations:

- Execute migrations por módulo: `npm run db:migrate:module-1`
- Cada módulo tem seu próprio diretório de migrations em `src/[contexto]/infrastructure/database/prisma/migrations/`

---
