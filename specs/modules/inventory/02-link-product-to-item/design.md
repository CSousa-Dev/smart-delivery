# Design: Link Product to Inventory Item

**Created**: 2026-01-12  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Link Product to Inventory Item cria o vinculo 1:1 entre um produto comercial e um item fisico no estoque.
O Application Service valida existencia de produto e item, garante que pertencem a mesma unidade e aplica regras de idempotencia/reativacao.
A complexidade e moderada por restricoes de unicidade ativa e pela necessidade de reconciliar status existentes.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `ProductItemLink` | Vinculo entre produto e item com status |
| Value Object | `ProductItemLinkId` | Identificador unico do vinculo |
| Value Object | `BusinessUnitId` | Identificador da unidade de negocio |
| Value Object | `ProductId` | Identificador do produto |
| Value Object | `InventoryItemId` | Identificador do item |
| Value Object | `LinkStatus` | Estado do vinculo (`ACTIVE`, `INACTIVE`) |
| Repository Interface | `ProductItemLinkRepository` | Persistencia e consultas de vinculo |
| Repository Interface | `InventoryItemRepository` | Consulta item de estoque |
| Repository Interface | `ProductRepository` | Consulta produto no modulo products (port) |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `LinkProductToItemService` | Orquestra o vinculo produto-item |
| Input DTO | `LinkProductToItemInput` | Dados de entrada do vinculo |
| Output DTO | `LinkProductToItemOutput` | Dados retornados apos vinculo |

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
        SVC[LinkProductToItemService]
        DTO_IN[LinkProductToItemInput]
        DTO_OUT[LinkProductToItemOutput]
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
    ITEM_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Vincular Produto a Item

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant ProductRepo
    participant ItemRepo
    participant LinkRepo
    participant Database

    Client->>Controller: POST /inventory/product-item-links
    Controller->>AppService: LinkProductToItemInput

    AppService->>ProductRepo: findById(productId)
    ProductRepo->>Database: SELECT (products)
    Database-->>ProductRepo: product

    AppService->>ItemRepo: findById(itemId)
    ItemRepo->>Database: SELECT (inventory_items)
    Database-->>ItemRepo: item

    AppService->>AppService: valida businessUnitId do produto e do item

    AppService->>LinkRepo: findByProductId(productId, businessUnitId)
    LinkRepo->>Database: SELECT
    Database-->>LinkRepo: link? (se existir)

    AppService->>LinkRepo: findByItemId(itemId, businessUnitId)
    LinkRepo->>Database: SELECT
    Database-->>LinkRepo: link? (se existir)

    AppService->>LinkRepo: findByProductAndItem(productId, itemId, businessUnitId)
    LinkRepo->>Database: SELECT
    Database-->>LinkRepo: link? (se existir)

    alt vinculo ACTIVE ja existe
        AppService-->>Controller: LinkProductToItemOutput (idempotente)
    else vinculo INACTIVE existe
        AppService->>LinkRepo: updateStatus(linkId, ACTIVE, updatedBy)
        LinkRepo->>Database: UPDATE
        Database-->>LinkRepo: OK
        AppService-->>Controller: LinkProductToItemOutput
    else sem vinculo
        AppService->>LinkRepo: save(new Link)
        LinkRepo->>Database: INSERT
        Database-->>LinkRepo: OK
        AppService-->>Controller: LinkProductToItemOutput
    end

    Controller-->>Client: 201 Created
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | JSON body | LinkProductToItemInput |
| AppService -> Domain | DTO | ProductItemLink |
| Repository -> DB | Entity | Prisma Model |

---

## Entity Structure

### ProductItemLink

```mermaid
classDiagram
    class ProductItemLink {
        -ProductItemLinkId id
        -BusinessUnitId businessUnitId
        -ProductId productId
        -InventoryItemId itemId
        -LinkStatus status
        -string createdBy
        -Date createdAt
        -string updatedBy
        -Date updatedAt
        +create() ProductItemLink
        +activate() void
    }

    class ProductItemLinkId {
        -string value
    }

    class LinkStatus {
        <<enumeration>>
        ACTIVE
        INACTIVE
    }

    ProductItemLink *-- ProductItemLinkId
    ProductItemLink *-- LinkStatus
```

**Propriedades:**

| Propriedade | Tipo | Mutavel? | Regras |
|-------------|------|----------|--------|
| `id` | ProductItemLinkId | Nao | Gerado internamente |
| `businessUnitId` | BusinessUnitId | Nao | Obrigatorio |
| `productId` | ProductId | Nao | Obrigatorio |
| `itemId` | InventoryItemId | Nao | Obrigatorio |
| `status` | LinkStatus | Sim | ACTIVE ou INACTIVE |
| `createdBy` | string | Nao | Obrigatorio |
| `createdAt` | Date | Nao | Automatico |
| `updatedBy` | string | Sim | Obrigatorio na reativacao |
| `updatedAt` | Date | Sim | Atualizado na reativacao |

**Comportamentos:**

| Metodo | Regras |
|--------|--------|
| `create` | Inicia com status ACTIVE |
| `activate` | Se INACTIVE, reativa e registra updatedBy/updatedAt |

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `ProductRepository.findById(id)` | Busca produto e businessUnitId | LinkProductToItemService |
| `InventoryItemRepository.findById(id)` | Busca item e businessUnitId | LinkProductToItemService |
| `ProductItemLinkRepository.findByProductId(productId, businessUnitId)` | Verifica vinculo por produto | LinkProductToItemService |
| `ProductItemLinkRepository.findByItemId(itemId, businessUnitId)` | Verifica vinculo por item | LinkProductToItemService |
| `ProductItemLinkRepository.findByProductAndItem(productId, itemId, businessUnitId)` | Verifica vinculo existente | LinkProductToItemService |
| `ProductItemLinkRepository.save(link)` | Persiste novo vinculo | LinkProductToItemService |
| `ProductItemLinkRepository.updateStatus(id, status, updatedBy)` | Reativa vinculo | LinkProductToItemService |

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

### Tabela: `product_item_links`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `business_unit_id` | VARCHAR(36) | NOT NULL |
| `product_id` | VARCHAR(36) | NOT NULL, UNIQUE(business_unit_id + product_id) |
| `item_id` | VARCHAR(36) | NOT NULL, UNIQUE(business_unit_id + item_id) |
| `status` | VARCHAR(10) | NOT NULL |
| `created_by` | VARCHAR(36) | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_by` | VARCHAR(36) | NULL |
| `updated_at` | TIMESTAMP | NULL |

Notas:
- A unicidade por produto e item garante relacao 1:1 com status alternado.

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| POST | `/inventory/product-item-links` | Vincular produto a item | 201 | 400, 404, 409 |

---

## Error Handling

```mermaid
flowchart LR
    PROD404[ProductNotFoundError] --> H404[404 Not Found]
    ITEM404[InventoryItemNotFoundError] --> H404
    BU400[BusinessUnitMismatchError] --> H400[400 Bad Request]
    PROD409[ProductAlreadyLinkedError] --> H409[409 Conflict]
    ITEM409[ItemAlreadyLinkedError] --> H409
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `ProductNotFoundError` | productId inexistente | 404 | `PRODUCT_NOT_FOUND` |
| `InventoryItemNotFoundError` | itemId inexistente | 404 | `INVENTORY_ITEM_NOT_FOUND` |
| `BusinessUnitMismatchError` | produto e item em unidades diferentes | 400 | `PRODUCT_ITEM_BUSINESS_UNIT_MISMATCH` |
| `ProductAlreadyLinkedError` | produto ja vinculado a outro item | 409 | `PRODUCT_ALREADY_LINKED` |
| `ItemAlreadyLinkedError` | item ja vinculado a outro produto | 409 | `ITEM_ALREADY_LINKED` |

---

## Technical Decisions

### Decisao 1: Reativacao reutiliza o mesmo registro

**Contexto**: O vinculo pode ser reativado sem criar novo registro.

**Decisao**: Quando existir `INACTIVE`, atualizar status e `updatedAt/updatedBy` no mesmo registro.

**Justificativa**: Preserva historico e garante idempotencia sem duplicidade.

---

### Decisao 2: Validar unidade via leitura de produto e item

**Contexto**: Produto e item devem pertencer a mesma unidade.

**Decisao**: O service carrega `businessUnitId` do produto (port) e do item (repo local) antes do vinculo.

**Justificativa**: Evita inconsistencias entre contextos e mantem regra 1:1 por unidade.

---

### Decisao 3: Unicidade garantida por constraints e validacao

**Contexto**: Nao pode haver mais de um vinculo ativo para produto ou item.

**Decisao**: Unicidade por `business_unit_id + product_id` e `business_unit_id + item_id` com validacao previa.

**Justificativa**: Evita concorrencia e falhas logicas na criacao de vinculos.

---

## Implementation Notes

- Retornar resposta idempotente quando vinculo ACTIVE ja existir.
- Rejeitar criacao quando existir vinculo ACTIVE para produto ou item diferente.
- Usar transacao apenas quando houver atualizacao de status (reativacao).
- `createdAt` nao deve ser alterado na reativacao.
- Indicar no output o `status` final do vinculo.

---
