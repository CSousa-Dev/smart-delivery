# Design: List Stock Movements

**Created**: 2026-01-12  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability List Stock Movements consulta o historico imutavel de entradas e saidas de estoque com filtros e paginacao.
O Application Service valida `businessUnitId` como escopo obrigatorio, filtros, intervalo de datas e parametros de pagina antes de consultar o repositorio.
A complexidade e baixa, focada em leitura ordenada e consistente.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `StockMovementRecord` | Registro de movimentacao para leitura |
| Value Object | `BusinessUnitId` | Identificador da unidade |
| Value Object | `StockMovementType` | Tipo (`ENTRY`, `EXIT`) |
| Value Object | `StockMovementSource` | Origem da movimentacao |
| Repository Interface | `StockMovementRepository` | Consulta de movimentacoes |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `ListStockMovementsService` | Orquestra a listagem de historico |
| Input DTO | `ListStockMovementsInput` | Escopo (`businessUnitId`), filtros e pagina |
| Output DTO | `ListStockMovementsOutput` | Lista paginada de movimentacoes |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaStockMovementRepository` | Implementa `StockMovementRepository` |
| Mapper | `StockMovementMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `StockMovementController` | Exposicao HTTP da listagem |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[StockMovementController]
    end

    subgraph Application
        SVC[ListStockMovementsService]
        DTO_IN[ListStockMovementsInput]
        DTO_OUT[ListStockMovementsOutput]
    end

    subgraph Domain
        REC[StockMovementRecord]
        VO_BU[BusinessUnitId]
        VO_TYPE[StockMovementType]
        VO_SRC[StockMovementSource]
        MOV_REPO[StockMovementRepository]
    end

    subgraph Infrastructure
        MOV_IMPL[PrismaStockMovementRepository]
        MOV_MAPPER[StockMovementMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> MOV_REPO
    SVC --> REC
    REC --> VO_TYPE
    REC --> VO_SRC
    MOV_IMPL -.->|implements| MOV_REPO
    MOV_IMPL --> MOV_MAPPER
    MOV_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Listar Movimentacoes

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant MovRepo
    participant Database

    Client->>Controller: GET /inventory/stock-movements
    Controller->>AppService: ListStockMovementsInput

    AppService->>AppService: valida businessUnitId, filtros, datas e paginacao

    AppService->>MovRepo: listByFilters(businessUnitId, filters, page, pageSize)
    MovRepo->>Database: SELECT
    Database-->>MovRepo: movements

    AppService-->>Controller: ListStockMovementsOutput
    Controller-->>Client: 200 OK
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | Query params | ListStockMovementsInput |
| AppService -> Domain | DTO | StockMovementRecord[] |
| Repository -> DB | Query | Prisma Models |

---

## Entity Structure

### StockMovementRecord

```mermaid
classDiagram
    class StockMovementRecord {
        -string id
        -string itemId
        -string lotNumber
        -StockMovementType type
        -number quantity
        -StockMovementSource movementSource
        -string externalId
        -Date occurredAt
        -string createdBy
    }

    class StockMovementType {
        <<enumeration>>
        ENTRY
        EXIT
    }

    class StockMovementSource {
        <<enumeration>>
        PURCHASE_ORDER
        PRODUCTION_ORDER
        INVENTORY_ADJUSTMENT
        SALES_ORDER
        WASTE
    }

    StockMovementRecord *-- StockMovementType
    StockMovementRecord *-- StockMovementSource
```

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `StockMovementRepository.listByFilters(businessUnitId, filters, page, pageSize)` | Lista movimentacoes por unidade com filtros | ListStockMovementsService |

---

## Database Model

```mermaid
erDiagram
    STOCK_MOVEMENTS {
        varchar(36) id PK
        varchar(36) business_unit_id
        varchar(36) item_id
        varchar(80) lot_number
        varchar(10) type
        decimal(18,4) quantity
        varchar(30) movement_source
        varchar(60) external_id
        timestamp occurred_at
        varchar(36) created_by
        timestamp created_at
    }
```

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| GET | `/inventory/stock-movements` | Listar movimentacoes | 200 | 400 |

---

## Error Handling

```mermaid
flowchart LR
    DATE400[InvalidDateRangeError] --> H400[400 Bad Request]
    TYPE400[InvalidMovementTypeError] --> H400
    SRC400[InvalidMovementSourceError] --> H400
    PAGE400[InvalidPaginationError] --> H400
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `InvalidDateRangeError` | data inicial > final | 400 | `INVALID_DATE_RANGE` |
| `InvalidMovementTypeError` | movementType invalido | 400 | `INVALID_MOVEMENT_TYPE` |
| `InvalidMovementSourceError` | movementSource invalido | 400 | `INVALID_MOVEMENT_SOURCE` |
| `InvalidPaginationError` | page < 1 ou pageSize > 200 | 400 | `INVALID_PAGINATION` |

---

## Technical Decisions

### Decisao 1: Ordenacao cronologica com desempate por id

**Contexto**: A spec exige ordenacao por occurredAt asc e desempate por id.

**Decisao**: Implementar ordenacao no repository com `ORDER BY occurred_at ASC, id ASC`.

**Justificativa**: Garante retorno deterministico para paginacao.

---

### Decisao 2: Paginacao padrao no repository

**Contexto**: Page e pageSize sao parametros obrigatorios com limites.

**Decisao**: Aplicar default `pageSize = 50` e limitar a 200 no Application Service.

**Justificativa**: Evita consultas pesadas e padroniza respostas.

---

## Implementation Notes

- Converter datas ISO-8601 para UTC quando timezone ausente.
- Exigir `businessUnitId` como filtro obrigatorio de escopo.
- Validar `movementType` e `movementSource` contra enums suportados.
- Retornar lista vazia quando nao houver movimentacoes para os filtros.
- Incluir `externalId` apenas quando existir.

---
