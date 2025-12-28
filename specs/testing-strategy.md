# Testing Strategy  
**Versão:** 1.0  
**Última atualização:** 2025-01-11  
**Status:** Ativo

---

# 1. Objetivos

A estratégia de testes tem como finalidade:

- Garantir que todas as camadas (`domain`, `application`, `presentation`, `infrastructure`) sejam testadas no nível adequado **em cada módulo/contexto**.
- Eliminar flakiness causado por concorrência, uso inadequado de banco ou mistura de níveis de teste.
- Alinhar testes ao Spec-Driven Development (SDD), permitindo rastreabilidade direta entre **capabilities** e **testes de integração**.
- Manter testes rápidos, estáveis, isolados e determinísticos.
- Reduzir mocks onde eles enfraquecem a qualidade (integration) e usá-los onde são essenciais (unit).
- Garantir isolamento entre módulos/contextos, refletindo a arquitetura multimódulo.
- Testar comunicação entre contextos via eventos (RabbitMQ) e ports de forma adequada.

---

# 2. Classificação de Testes

O projeto utiliza três níveis oficiais de testes:

```
Unit → testa uma unidade isolada de código (não usa DB, não usa serviços externos)
Integration (Capability) → testa um fluxo completo de negócio dentro de um módulo (usa DB real do módulo)
Integration (Cross-Context) → testa comunicação entre contextos via eventos/ports (opcional, para casos específicos)
E2E → testa a aplicação inteira via HTTP (pode envolver múltiplos módulos)
```

Cada nível possui responsabilidade e regras de isolamento próprias.

**Nota**: A arquitetura multimódulo exige que cada módulo/contexto seja testado de forma isolada. Testes de integração entre contextos são opcionais e devem ser usados apenas quando necessário validar comunicação entre módulos.

---

# 3. Estrutura de Diretórios

A estrutura de testes reflete a arquitetura multimódulo:

```
tests/
  unit/
    <contexto>/
      domain/
      application/
      infrastructure/

  integration/
    <contexto>/
      capabilities/
        <capability-name>/
          <capability>.integration.test.ts
    cross-context/                    # Testes de comunicação entre contextos (opcional)
      <contexto-1>-to-<contexto-2>/
        <scenario>.integration.test.ts

  e2e/
    http/
      <feature>.e2e.test.ts

  helpers/
    factories/
      <contexto>/                    # Factories por contexto
    prisma/
      <contexto>/                    # Helpers de Prisma por contexto
    http-client.ts
    event-bus.ts                      # Helpers para testes com RabbitMQ
    docker/                           # Helpers para setup de containers Docker
```

**Nota**: Cada módulo/contexto possui seus próprios testes isolados. A estrutura permite que novos módulos sejam adicionados gradualmente sem impactar testes existentes.

---

# 4. Detalhamento dos Tipos de Teste

## 4.1 Unit Tests (Testes Unitários)

**Local:**  
`tests/unit/<contexto>/**`

**Objetivo:**  
Testar **uma unidade isolada** dentro de um contexto específico: função, classe, serviço de domínio, DTO, mapper, validador, service de aplicação.

**Características:**

- Não usam banco de dados.
- Não usam serviços externos (RabbitMQ, Redis, etc.).
- Sempre mockam dependências externas (repositories, event publishers, cache, ports de outros contextos).
- Executam extremamente rápido.
- Garantem que cada arquivo é testado de forma isolada e previsível.
- Não testam integração entre camadas.
- Testam apenas código do contexto específico.

---

## 4.2 Integration Tests (orientados a Capability)

**Local:**  
`tests/integration/<contexto>/capabilities/<capability>/`

**Objetivo:**  
Testar a **capability completa dentro de um contexto específico** conforme definida em SDD.

Fluxo testado:

```
Application Service → Domain → Infrastructure → Banco Real (do contexto)
```

**Características:**

- Usam banco real isolado **do contexto específico** (cada módulo tem seu próprio banco de teste).
- Executados **serialmente** (`maxWorkers: 1`) para evitar concorrência.
- Testam regras de negócio completas dentro do contexto.
- Não usam HTTP.
- Não mockam repositories, Prisma ou serviços internos à capability.
- Mockam comunicação com outros contextos (event publishers, ports de outros contextos) para manter isolamento.
- Alto alinhamento com SDD: 1 capability → 1 suite de teste.
- Cada contexto testa apenas suas próprias capabilities de forma isolada.

---

## 4.3 Integration Tests (Cross-Context) - Opcional

**Local:**  
`tests/integration/cross-context/<contexto-1>-to-<contexto-2>/`

**Objetivo:**  
Testar comunicação entre contextos via eventos (RabbitMQ) ou ports.

Fluxo testado:

```
Contexto A → Event Publisher → RabbitMQ → Event Subscriber → Contexto B
```

**Características:**

- Usam RabbitMQ real (container Docker) para testes.
- Usam bancos reais de ambos os contextos envolvidos.
- Executados **serialmente** (`maxWorkers: 1`).
- Testam integração real entre módulos quando necessário.
- Devem ser usados com parcimônia; preferir testar isoladamente e validar contratos de eventos.
- Úteis para validar que eventos são publicados e consumidos corretamente entre contextos.

**Quando usar:**
- Validar que eventos são publicados com estrutura correta.
- Validar que eventos são consumidos e processados corretamente.
- Validar comunicação síncrona via ports entre contextos.

**Quando não usar:**
- Preferir testar cada contexto isoladamente.
- Se a comunicação pode ser validada via contratos de eventos.

---

## 4.4 E2E Tests

**Local:**  
`tests/e2e/http/**`

**Objetivo:**  
Testar a aplicação como um cliente final, via HTTP real, podendo envolver múltiplos módulos.

Fluxo testado:

```
HTTP → Controllers → Application → Domain → Infra → Banco (múltiplos contextos)
```

**Características:**

- Inicializam o servidor Fastify para testes.
- Usam bancos reais de todos os módulos envolvidos, limpos antes de cada teste ou schema isolado.
- Podem usar RabbitMQ real para validar comunicação entre contextos.
- Validam respostas HTTP, status codes, formatos e mensagens de erro.
- Garantem que presentation + application funcionam de ponta a ponta.
- Testam fluxos que podem atravessar múltiplos contextos.

---

# 5. Regras de Isolamento

## 5.1 Unit
- Nenhum acesso a banco.
- Nenhum serviço externo real (RabbitMQ, Redis, etc.).
- Apenas mocks/stubs.
- Testes totalmente paralelizáveis.
- Isolados por contexto (não testam comunicação entre contextos).

## 5.2 Integration (Capability)
- Usam banco real **do contexto específico**.
- Rodam de forma **serializada** (evita concorrência).
- Banco deve ser limpo antes de cada teste.
- Sem mocks internos: fluxo real da capability dentro do contexto.
- Mockam comunicação com outros contextos (event publishers, ports).
- Cada contexto testa apenas suas próprias capabilities.

## 5.3 Integration (Cross-Context)
- Usam bancos reais de **todos os contextos envolvidos**.
- Usam RabbitMQ real (container Docker).
- Rodam de forma **serializada** (evita concorrência).
- Bancos devem ser limpos antes de cada teste.
- Testam comunicação real entre contextos.

## 5.4 E2E
- Podem rodar paralelos, desde que usem schema isolado ou limpeza agressiva.
- Usam bancos reais de todos os módulos envolvidos.
- Podem usar RabbitMQ real.
- Avaliam contrato HTTP e comportamento de ponta a ponta.
- Podem testar fluxos que atravessam múltiplos contextos.

---

# 6. Naming Convention

## 6.1 Unit
```
<arquivo>.unit.test.ts
```

## 6.2 Integration (por capability)
```
<capability>.integration.test.ts
```

## 6.3 Integration (Cross-Context)
```
<scenario>.integration.test.ts
```

## 6.4 E2E (por feature/rota)
```
<feature>.e2e.test.ts
```

---

# 7. Factories de Teste

As factories ficam em:

```
tests/helpers/factories/<contexto>/
```

Devem:

- Usar UUIDs para evitar colisões em campos únicos.
- Criar dados minimamente válidos para as capabilities do contexto.
- Ser independentes de serviços reais (exceto nos integration tests).
- Estar organizadas por contexto para manter isolamento.
- Cada contexto possui suas próprias factories.

---

# 8. Banco de Dados em Testes

## Integration Tests (Capability)
- Banco real **do contexto específico** (ex.: MySQL de teste para o módulo).
- Cada módulo usa seu próprio banco de teste isolado.
- Reset do banco a cada teste.
- Configuração via variáveis de ambiente específicas por contexto (ex.: `DATABASE_URL_MODULE_1_TEST`).

## Integration Tests (Cross-Context)
- Bancos reais de **todos os contextos envolvidos**.
- Reset de todos os bancos a cada teste.

## E2E Tests
- Bancos reais de **todos os módulos envolvidos**, porém com:
  - limpeza agressiva, ou
  - schema isolado por suite.
- Cada módulo mantém seu próprio banco isolado.

## Regras Gerais
- Nunca usar banco compartilhado com ambiente de desenvolvimento.
- Cada módulo/contexto possui seu próprio banco de teste.
- Bancos de teste devem ser configurados via Docker Compose para testes.
- SQLite em memória pode ser usado para testes unitários de infraestrutura quando apropriado.

---

# 9. Relação com SDD

O SDD define capabilities **por contexto/módulo**.  
Cada capability deve possuir **exatamente um** teste de integração.

A rastreabilidade fica:

```
specs/<contexto>/capabilities/<capability>.md
   ↓
tests/integration/<contexto>/capabilities/<capability>/<capability>.integration.test.ts
```

**Nota**: Como os módulos são implementados gradualmente, a estrutura de specs também será organizada por contexto quando os módulos forem criados.

Além disso:

- Cada **cenário** relevante descrito na spec da capability (casos de sucesso, erros, bordas) deve ter **ao menos um caso de teste correspondente** na suíte de integração.
- Novas regras de negócio ou mudanças de comportamento **devem ser introduzidas primeiro na spec** da capability; apenas depois são adicionados/atualizados os testes e o código.  
  → O teste de integração nunca deve validar comportamento que não esteja especificado.
- Os nomes de `describe` e `it` nos testes de integração devem refletir o título/ID dos cenários da spec, por exemplo:  
  `describe('Capability XYZ – [CAP-001]')`  
  `it('deve criar XYZ – [SCN-001]')`.

Para E2E, se houver specs de nível feature/rota HTTP, recomenda-se seguir a mesma rastreabilidade:

```
specs/features/<feature>.md
   ↓
tests/e2e/http/<feature>.e2e.test.ts
```

E, quando aplicável, replicar o mesmo mapeamento de cenários (spec → casos de teste E2E) usando nomes de testes alinhados aos cenários.

---

# 10. Testes com Serviços Externos

## RabbitMQ (Event Bus)

- **Unit Tests**: Sempre mockar event publishers/subscribers.
- **Integration Tests (Capability)**: Mockar event publishers/subscribers para manter isolamento do contexto.
- **Integration Tests (Cross-Context)**: Usar RabbitMQ real (container Docker) para validar comunicação entre contextos.
- **E2E Tests**: Podem usar RabbitMQ real para testar fluxos completos.

## Redis (Cache)

- **Unit Tests**: Sempre mockar cache client.
- **Integration Tests**: Podem usar Redis real (container Docker) ou mockar, dependendo do que está sendo testado.
- **E2E Tests**: Usar Redis real (container Docker).

## Docker Compose para Testes

Os testes que requerem serviços externos devem usar containers Docker:

- Configurar `docker-compose.test.yml` para serviços de teste.
- Inicializar containers antes dos testes e limpar após.
- Usar helpers em `tests/helpers/docker/` para gerenciar lifecycle dos containers.

---

# 11. Benefícios da Estratégia

- Previsibilidade: cada teste está no nível correto.
- Zero flakiness por concorrência.
- Facilidade de manutenção e refatoração.
- Alinhamento direto com o modelo arquitetural multimódulo.
- Alta qualidade dos testes sem redundância.
- Aumento de velocidade do feedback de desenvolvimento.
- Isolamento entre módulos reflete a arquitetura real.
- Facilita migração futura para microserviços (testes já isolados por contexto).

---

# 12. Resumo

| Tipo | O que testa | Usa DB? | Usa RabbitMQ? | Serial? | Usa HTTP? | Escopo |
|------|-------------|---------|---------------|---------|-----------|--------|
| Unit | Arquivo individual | Não | Não | Não | Não | Contexto único |
| Integration (Capability) | Fluxo completo de negócio | Sim (do contexto) | Não (mockado) | Sim | Não | Contexto único |
| Integration (Cross-Context) | Comunicação entre contextos | Sim (múltiplos) | Sim | Sim | Não | Múltiplos contextos |
| E2E | Aplicação como o cliente vê | Sim (múltiplos) | Opcional | Opcional | Sim | Múltiplos contextos |

---

**Fim do documento.**
