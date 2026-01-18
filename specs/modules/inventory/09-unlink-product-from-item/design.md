# Design: Unlink Product from Inventory Item

**Created**: 2026-01-12  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Unlink Product from Inventory Item desativa um vinculo existente entre produto e item, preservando historico.
O Application Service valida existencia de produto, item e vinculo na unidade informada e aplica a transicao para INACTIVE.
A complexidade e baixa, com foco em validacao e atualizacao idempotente.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `ProductItemLink` | Vinculo entre produto e item com status |
| Value Object | `ProductItemLinkId` | Identificador unico do vinculo |
| Value Object | `BusinessUnitId` | Identificador da unidade |
| Value Object | `ProductId` | Identificador do produto |
| Value Object | `InventoryItemId` | Identificador do item |
| Value Object | `LinkStatus` | Estado do vinculo (`ACTIVE`, `INACTIVE`) |
| Repository Interface | `ProductItemLinkRepository` | Persistencia e consultas de vinculo |
| Repository Interface | `InventoryItemRepository` | Consulta item de estoque |
| Repository Interface | `ProductRepository` | Consulta produto no modulo products (port) |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `UnlinkProductFromItemService` | Orquestra a desativacao do vinculo |
| Input DTO | `UnlinkProductFromItemInput` | Dados de entrada |
| Output DTO | `UnlinkProductFromItemOutput` | Dados retornados apos desativacao |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaProductItemLinkRepository` | Implementa `ProductItemLinkRepository` |
| Repository Impl | `PrismaInventoryItemRepository` | Implementa `InventoryItemRepository` |
| Port Adapter | `ProductCatalogAdapter` | Implementa `ProductRepository` |
| Mapper | `ProductItemLinkMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `ProductItemLinkController` | Exposicao HTTP do caso de uso |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[ProductItemLinkController]
    end

    subgraph Application
        SVC[UnlinkProductFromItemService]
        DTO_IN[UnlinkProductFromItemInput]
        DTO_OUT[UnlinkProductFromItemOutput]
    end

    subgraph Domain
        LINK[ProductItemLink]
        VO_ID[ProductItemLinkId]
        VO_BU[BusinessUnitId]
        VO_PROD[ProductId]
        VO_ITEM[InventoryItemId]
        VO_STATUS[LinkStatus]
        LINK_REPO[ProductItemLinkRepository]
        ITEM_REPO[InventoryItemRepository]
        PROD_REPO[ProductRepository]
    end

    subgraph Infrastructure
        LINK_IMPL[PrismaProductItemLinkRepository]
        ITEM_IMPL[PrismaInventoryItemRepository]
        PROD_ADAPTER[ProductCatalogAdapter]
        LINK_MAPPER[ProductItemLinkMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> LINK
    SVC --> LINK_REPO
    SVC --> ITEM_REPO
    SVC --> PROD_REPO
    LINK --> VO_ID
    LINK --> VO_BU
    LINK --> VO_PROD
    LINK --> VO_ITEM
    LINK --> VO_STATUS
    LINK_IMPL -.->|implements| LINK_REPO
    ITEM_IMPL -.->|implements| ITEM_REPO
    PROD_ADAPTER -.->|implements| PROD_REPO
    LINK_IMPL --> LINK_MAPPER
    LINK_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Desvincular Produto de Item

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant ProductRepo
    participant ItemRepo
    participant LinkRepo
    participant Database

    Client->>Controller: POST /inventory/product-item-links/deactivate
    Controller->>AppService: UnlinkProductFromItemInput

    AppService->>ProductRepo: findById(productId)
    ProductRepo->>Database: SELECT
    Database-->>ProductRepo: product

    AppService->>ItemRepo: findById(itemId)
    ItemRepo->>Database: SELECT
    Database-->>ItemRepo: item

    AppService->>LinkRepo: findByProductAndItem(productId, itemId, businessUnitId)
    LinkRepo->>Database: SELECT
    Database-->>LinkRepo: link

    AppService->>AppService: valida status ACTIVE e unidade

    AppService->>LinkRepo: updateStatus(linkId, INACTIVE, updatedBy)
    LinkRepo->>Database: UPDATE
    Database-->>LinkRepo: OK

    AppService-->>Controller: UnlinkProductFromItemOutput
    Controller-->>Client: 200 OK
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | JSON body | UnlinkProductFromItemInput |
| AppService -> Domain | DTO | ProductItemLink |
| Repository -> DB | Entity | Prisma Model |

---

## Entity Structure

### ProductItemLink (recorte relevante)

```mermaid
classDiagram
    class ProductItemLink {
        -ProductItemLinkId id
        -BusinessUnitId businessUnitId
        -ProductId productId
        -InventoryItemId itemId
        -LinkStatus status
        -string updatedBy
        -Date updatedAt
        +deactivate() void
    }

    class LinkStatus {
        <<enumeration>>
        ACTIVE
        INACTIVE
    }

    ProductItemLink *-- LinkStatus
```

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `ProductRepository.findById(id)` | Busca produto e businessUnitId | UnlinkProductFromItemService |
| `InventoryItemRepository.findById(id)` | Busca item e businessUnitId | UnlinkProductFromItemService |
| `ProductItemLinkRepository.findByProductAndItem(productId, itemId, businessUnitId)` | Busca vinculo | UnlinkProductFromItemService |
| `ProductItemLinkRepository.updateStatus(id, status, updatedBy)` | Desativa vinculo | UnlinkProductFromItemService |

---

## Database Model

```mermaid
erDiagram
    PRODUCT_ITEM_LINKS {
        varchar(36) id PK
        varchar(36) business_unit_id
        varchar(36) product_id
        varchar(36) item_id
        varchar(10) status
        varchar(36) created_by
        timestamp created_at
        varchar(36) updated_by
        timestamp updated_at
    }
```

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| POST | `/inventory/product-item-links/deactivate` | Desvincular produto de item | 200 | 400, 404, 409 |

---

## Error Handling

```mermaid
flowchart LR
    PROD404[ProductNotFoundError] --> H404[404 Not Found]
    ITEM404[InventoryItemNotFoundError] --> H404
    LINK404[ProductItemLinkNotFoundError] --> H404
    BU400[BusinessUnitMismatchError] --> H400[400 Bad Request]
    STATUS409[LinkAlreadyInactiveError] --> H409[409 Conflict]
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `ProductNotFoundError` | productId inexistente | 404 | `PRODUCT_NOT_FOUND` |
| `InventoryItemNotFoundError` | itemId inexistente | 404 | `INVENTORY_ITEM_NOT_FOUND` |
| `ProductItemLinkNotFoundError` | vinculo inexistente | 404 | `PRODUCT_ITEM_LINK_NOT_FOUND` |
| `BusinessUnitMismatchError` | vinculo nao pertence a unidade | 400 | `PRODUCT_ITEM_BUSINESS_UNIT_MISMATCH` |
| `LinkAlreadyInactiveError` | vinculo ja inativo | 409 | `LINK_ALREADY_INACTIVE` |

---

## Technical Decisions

### Decisao 1: Desativacao preserva historico

**Contexto**: O vinculo nao deve ser removido para manter rastreabilidade.

**Decisao**: Atualizar `status` para `INACTIVE` e manter o registro.

**Justificativa**: Permite reativacao futura e auditoria de vinculos.

---

### Decisao 2: Validar existencia de produto e item antes do vinculo

**Contexto**: A spec exige erro especifico para produto/item inexistente.

**Decisao**: Consultar `ProductRepository` e `InventoryItemRepository` antes de buscar o vinculo.

**Justificativa**: Garante mensagens corretas e evita ambiguidade.

---

## Implementation Notes

- Rejeitar quando o vinculo estiver `INACTIVE` com erro especifico.
- Garantir que `updatedBy` seja obrigatorio na desativacao.
- Manter `createdAt` inalterado ao desativar.

---
