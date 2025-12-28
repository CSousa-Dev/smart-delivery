# Design: [NOME DA CAPABILITY]

**Created**: [DATE]  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../project.md](../project.md)

---

<!--
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║  DESIGN TÉCNICO - Define COMO a capability será implementada              ║
  ║                                                                           ║
  ║  Este documento é a inteligência do arquiteto/senior dev.                 ║
  ║  Foca em DECISÕES, FLUXOS e ORGANIZAÇÃO - não em código.                  ║
  ║                                                                           ║
  ║  Usa diagramas Mermaid para visualização.                                 ║
  ║  Segue a arquitetura definida em: ../project.md                           ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
-->

## Overview

<!--
  Visão geral técnica em 2-3 frases:
  - Qual o fluxo principal?
  - Quais camadas são envolvidas?
  - Qual a complexidade esperada?
-->

[Visão geral técnica]

---

## Component Map

<!--
  FUNÇÃO: Mapear ONDE cada componente fica
  Seguir estrutura de ../project.md
-->

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `[EntityName]` | [o que representa] |
| Value Object | `[VOName]` | [o que valida/encapsula] |
| Repository Interface | `I[EntityName]Repository` | [operações disponíveis] |
| Domain Service | `[ServiceName]` | [regra entre aggregates - se necessário] |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `[Action][Entity]Service` | [caso de uso] |
| Input DTO | `[Action][Entity]Input` | [dados de entrada] |
| Output DTO | `[Action][Entity]Output` | [dados de saída] |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `Prisma[Entity]Repository` | [implementa interface do domain] |
| Mapper | `[Entity]Mapper` | [converte Prisma ↔ Domain] |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `[Entity]Controller` | [endpoints HTTP] |

---

## Dependency Graph

<!--
  FUNÇÃO: Visualizar dependências entre componentes
-->

```mermaid
graph TD
    subgraph Presentation
        CTRL[Controller]
    end
    
    subgraph Application
        SVC[AppService]
        DTO_IN[Input DTO]
        DTO_OUT[Output DTO]
    end
    
    subgraph Domain
        ENT[Entity]
        VO[Value Objects]
        REPO_INT[Repository Interface]
    end
    
    subgraph Infrastructure
        REPO_IMPL[Repository Impl]
        MAPPER[Mapper]
        PRISMA[Prisma Client]
    end
    
    CTRL --> SVC
    CTRL --> DTO_IN
    CTRL --> DTO_OUT
    SVC --> REPO_INT
    SVC --> ENT
    ENT --> VO
    REPO_IMPL -.->|implements| REPO_INT
    REPO_IMPL --> MAPPER
    REPO_IMPL --> PRISMA
    MAPPER --> ENT
```

---

## Data Flow

<!--
  FUNÇÃO: Descrever o fluxo de dados para operações principais
-->

### Fluxo: [Nome da Operação - ex: Criar Entity]

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant Entity
    participant Repository
    participant Database
    
    Client->>Controller: HTTP Request
    Controller->>Controller: Extrai dados do request
    Controller->>AppService: Input DTO
    AppService->>Entity: Cria/valida Entity
    Entity-->>AppService: Entity válida
    AppService->>Repository: save(Entity)
    Repository->>Repository: Mapper converte Entity → Prisma
    Repository->>Database: INSERT/UPDATE
    Database-->>Repository: OK
    Repository-->>AppService: void
    AppService-->>Controller: Output DTO
    Controller-->>Client: HTTP Response
```

**Transformações de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller → AppService | JSON body | Input DTO |
| AppService → Entity | Input DTO | Domain Entity |
| Repository → DB | Domain Entity | Prisma Model |

---

## Entity Structure

<!--
  FUNÇÃO: Definir a estrutura conceitual da Entity
-->

### [EntityName]

```mermaid
classDiagram
    class EntityName {
        -EntityId id
        -string name
        -string description
        -EntityStatus status
        +create() Entity
        +update() void
        +getId() EntityId
    }
    
    class EntityId {
        -string value
        +create(string) EntityId
        +getValue() string
    }
    
    class EntityStatus {
        <<enumeration>>
        ACTIVE
        INACTIVE
    }
    
    EntityName *-- EntityId : contains
    EntityName *-- EntityStatus : contains
```

**Propriedades:**

| Propriedade | Tipo | Mutável? | Regras |
|-------------|------|----------|--------|
| `id` | EntityId | Não | [regras] |
| `name` | string | Sim | [regras] |
| `status` | EntityStatus | Sim | [valores: active, inactive] |

**Comportamentos:**

| Método | Regras |
|--------|--------|
| `create` | [validações na criação] |
| `update` | [o que pode/não pode mudar] |

---

## Repository Operations

| Operação | Descrição | Usada por |
|----------|-----------|-----------|
| `save(entity)` | Persiste entity | AppService |
| `findById(id)` | Busca por ID | AppService |
| `existsById(id)` | Verifica existência | AppService |

---

## Database Model

### Tabela: `[table_name]`

```mermaid
erDiagram
    ENTITY_NAME {
        varchar(25) id PK
        varchar(55) name
        varchar(550) description
        varchar(10) status
        timestamp created_at
        timestamp updated_at
    }
```

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(25) | PK |
| `name` | VARCHAR(55) | NOT NULL |
| `description` | VARCHAR(550) | NOT NULL |
| `status` | VARCHAR(10) | NOT NULL, DEFAULT 'active' |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_at` | TIMESTAMP | NOT NULL, auto-update |

---

## API Endpoints

| Método | Path | Operação | Sucesso | Erros |
|--------|------|----------|---------|-------|
| POST | `/[resource]` | Criar | 201 | 400, 409 |
| PATCH | `/[resource]/:id` | Atualizar | 200 | 400, 404 |
| GET | `/[resource]/:id` | Buscar | 200 | 404 |

---

## Error Handling

```mermaid
flowchart LR
    subgraph Domain Errors
        DE1[DuplicateIdError]
        DE2[ValidationError]
        DE3[NotFoundError]
    end
    
    subgraph HTTP Response
        H409[409 Conflict]
        H400[400 Bad Request]
        H404[404 Not Found]
    end
    
    DE1 --> H409
    DE2 --> H400
    DE3 --> H404
```

| Erro de Domínio | Quando Ocorre | HTTP Status | Código |
|-----------------|---------------|-------------|--------|
| `DuplicateIdError` | ID já existe | 409 | `DUPLICATE_ID` |
| `ValidationError` | Dados inválidos | 400 | `VALIDATION_ERROR` |
| `NotFoundError` | Entity não existe | 404 | `NOT_FOUND` |

---

## Technical Decisions

<!--
  FUNÇÃO: Documentar decisões técnicas específicas desta capability
-->

### Decisão 1: [Título]

**Contexto**: [Situação que exigiu decisão]

**Decisão**: [O que foi decidido]

**Justificativa**: [Por que]

---

## Implementation Notes

<!--
  Notas importantes para quem for implementar
-->

- [Nota 1 - algo que precisa de atenção]
- [Nota 2 - ordem de implementação recomendada]
- [Nota 3 - dependências com outras capabilities]

---
