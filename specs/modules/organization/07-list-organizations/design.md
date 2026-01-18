# Design: List Organizations

**Created**: 2026-01-08  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability List Organizations no contexto Organization retorna organizacoes cadastradas com metadados de paginacao e verticais com dados basicos.
A orquestracao ocorre no Application Service, que normaliza paginacao e ordenacao por createdAt, consulta o repositorio e agrega verticais vinculadas.
A complexidade e baixa, com foco em leitura paginada, enriquecimento de verticais e resposta consistente.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `Organization` | Dados basicos da organizacao |
| Entity | `OrganizationVerticalLink` | Vinculo entre organizacao e vertical |
| Entity | `Vertical` | Dados basicos da vertical |
| Value Object | `OrganizationId` | Identificador unico da organizacao |
| Value Object | `DocumentType` | Tipo do documento (CPF, CNPJ) |
| Value Object | `DocumentNumber` | Documento normalizado |
| Value Object | `VerticalId` | Identificador da vertical |
| Value Object | `VerticalName` | Nome normalizado |
| Value Object | `VerticalCode` | Codigo UPPERCASE com `_` |
| Value Object | `VerticalDescription` | Descricao normalizada |
| Value Object | `VerticalLinkStatus` | Estado do vinculo (ACTIVE, INACTIVE) |
| Value Object | `OrganizationStatus` | Status atual da organizacao |
| Repository Interface | `OrganizationRepository` | Listagem e totalizacao de organizacoes |
| Repository Interface | `OrganizationVerticalRepository` | Lista verticais por organizacao |
| Repository Interface | `VerticalRepository` | Consulta dados basicos de verticais |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `ListOrganizationsService` | Orquestra a listagem paginada |
| Input DTO | `ListOrganizationsInput` | Parametros de paginacao e ordenacao |
| Output DTO | `ListOrganizationsOutput` | Lista de organizacoes + metadados |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaOrganizationRepository` | Implementa `OrganizationRepository` |
| Repository Impl | `PrismaOrganizationVerticalRepository` | Implementa `OrganizationVerticalRepository` |
| Repository Impl | `PrismaVerticalRepository` | Implementa `VerticalRepository` |
| Mapper | `OrganizationMapper` | Converte Domain <-> Prisma |
| Mapper | `OrganizationVerticalMapper` | Converte Domain <-> Prisma |
| Mapper | `VerticalMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `OrganizationController` | Endpoint HTTP de listagem |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[OrganizationController]
    end

    subgraph Application
        SVC[ListOrganizationsService]
        DTO_IN[ListOrganizationsInput]
        DTO_OUT[ListOrganizationsOutput]
    end

    subgraph Domain
        ORG[Organization]
        ORG_VERT_LINK[OrganizationVerticalLink]
        VERT[Vertical]
        VO_ID[OrganizationId]
        VO_DOC_TYPE[DocumentType]
        VO_DOC[DocumentNumber]
        VO_VERT_ID[VerticalId]
        VO_VERT_NAME[VerticalName]
        VO_VERT_CODE[VerticalCode]
        VO_VERT_DESC[VerticalDescription]
        VO_LINK_STATUS[VerticalLinkStatus]
        VO_STATUS[OrganizationStatus]
        ORG_REPO[OrganizationRepository]
        ORG_VERT_REPO[OrganizationVerticalRepository]
        VERT_REPO[VerticalRepository]
    end

    subgraph Infrastructure
        ORG_REPO_IMPL[PrismaOrganizationRepository]
        ORG_VERT_REPO_IMPL[PrismaOrganizationVerticalRepository]
        VERT_REPO_IMPL[PrismaVerticalRepository]
        ORG_MAPPER[OrganizationMapper]
        ORG_VERT_MAPPER[OrganizationVerticalMapper]
        VERT_MAPPER[VerticalMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> ORG_REPO
    SVC --> ORG_VERT_REPO
    SVC --> VERT_REPO
    SVC --> ORG
    SVC --> VERT
    ORG --> VO_ID
    ORG --> VO_DOC_TYPE
    ORG --> VO_DOC
    ORG --> VO_VERT_ID
    ORG --> VO_STATUS
    ORG_VERT_LINK --> VO_ID
    ORG_VERT_LINK --> VO_VERT_ID
    ORG_VERT_LINK --> VO_LINK_STATUS
    VERT --> VO_VERT_ID
    VERT --> VO_VERT_NAME
    VERT --> VO_VERT_CODE
    VERT --> VO_VERT_DESC
    ORG_REPO_IMPL -.->|implements| ORG_REPO
    ORG_VERT_REPO_IMPL -.->|implements| ORG_VERT_REPO
    VERT_REPO_IMPL -.->|implements| VERT_REPO
    ORG_REPO_IMPL --> ORG_MAPPER
    ORG_VERT_REPO_IMPL --> ORG_VERT_MAPPER
    VERT_REPO_IMPL --> VERT_MAPPER
    ORG_REPO_IMPL --> PRISMA
    ORG_VERT_REPO_IMPL --> PRISMA
    VERT_REPO_IMPL --> PRISMA
    ORG_MAPPER --> ORG
    ORG_VERT_MAPPER --> ORG_VERT_LINK
    VERT_MAPPER --> VERT
```

---

## Data Flow

### Fluxo: Listar Organizacoes

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant OrgRepo
    participant OrgVertRepo
    participant VerticalRepo
    participant Database

    Client->>Controller: GET /organization/organizations?page=&pageSize=&sortDirection=
    Controller->>AppService: ListOrganizationsInput

    AppService->>AppService: normaliza paginacao e ordenacao

    AppService->>OrgRepo: list(page, pageSize, sortDirection)
    OrgRepo->>Database: SELECT organizations (ORDER BY created_at)
    Database-->>OrgRepo: Organization[]

    AppService->>OrgVertRepo: listByOrganizationIds(organizationIds)
    OrgVertRepo->>Database: SELECT organization_verticals
    Database-->>OrgVertRepo: OrganizationVerticalLink[]

    AppService->>VerticalRepo: listByIds(verticalIds)
    VerticalRepo->>Database: SELECT verticals
    Database-->>VerticalRepo: Vertical[]

    AppService->>OrgRepo: countAll()
    OrgRepo->>Database: SELECT COUNT(*)
    Database-->>OrgRepo: totalItems

    AppService-->>Controller: ListOrganizationsOutput
    Controller-->>Client: 200 OK
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | Query params | ListOrganizationsInput |
| AppService -> Domain | DTO | Organization + verticals |
| Domain -> Presentation | Entities | ListOrganizationsOutput |

---

## Entity Structure

### Organization

```mermaid
classDiagram
    class Organization {
        -OrganizationId id
        -string tradeName
        -DocumentType documentType
        -DocumentNumber documentNumber
        -Vertical[] verticals
        -OrganizationStatus status
        -Date createdAt
        +getId() OrganizationId
    }

    class OrganizationId {
        -string value
    }

    class DocumentType {
        <<enumeration>>
        CPF
        CNPJ
    }

    class DocumentNumber {
        -string value
    }

    class VerticalId {
        -string value
    }

    class OrganizationStatus {
        <<enumeration>>
        PENDING_BUSINESS_UNIT
        ACTIVE
    }

    Organization *-- OrganizationId
    Organization *-- DocumentType
    Organization *-- DocumentNumber
    Organization *-- Vertical
    Organization *-- OrganizationStatus
```

### Vertical

```mermaid
classDiagram
    class Vertical {
        -VerticalId id
        -VerticalName name
        -VerticalCode code
        -VerticalDescription description
    }

    class VerticalName {
        -string value
    }

    class VerticalCode {
        -string value
    }

    class VerticalDescription {
        -string value
    }

    Vertical *-- VerticalId
    Vertical *-- VerticalName
    Vertical *-- VerticalCode
    Vertical *-- VerticalDescription
```

### OrganizationVerticalLink

```mermaid
classDiagram
    class OrganizationVerticalLink {
        -OrganizationId organizationId
        -VerticalId verticalId
        -VerticalLinkStatus status
    }

    class VerticalLinkStatus {
        <<enumeration>>
        ACTIVE
        INACTIVE
    }

    OrganizationVerticalLink *-- OrganizationId
    OrganizationVerticalLink *-- VerticalId
    OrganizationVerticalLink *-- VerticalLinkStatus
```

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `OrganizationRepository.list(page, pageSize, sortDirection)` | Lista organizacoes paginadas | ListOrganizationsService |
| `OrganizationRepository.countAll()` | Total de organizacoes | ListOrganizationsService |
| `OrganizationVerticalRepository.listByOrganizationIds(ids)` | Lista verticais por organizacoes | ListOrganizationsService |
| `VerticalRepository.listByIds(ids)` | Carrega dados das verticais | ListOrganizationsService |

---

## Database Model

```mermaid
erDiagram
    ORGANIZATIONS {
        varchar(36) id PK
        varchar(80) trade_name
        varchar(4) document_type
        varchar(14) document_number
        varchar(30) status_id
        timestamp created_at
    }

    ORGANIZATION_VERTICALS {
        varchar(36) organization_id FK
        varchar(36) vertical_id FK
        varchar(20) status_id
        timestamp created_at
        timestamp updated_at
    }

    VERTICALS {
        varchar(36) id PK
        varchar(80) name
        varchar(40) code
        varchar(255) description
    }

    ORGANIZATIONS ||--o{ ORGANIZATION_VERTICALS : links
    VERTICALS ||--o{ ORGANIZATION_VERTICALS : links
```

### Tabela: `organizations`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `trade_name` | VARCHAR(80) | NOT NULL |
| `document_type` | VARCHAR(4) | NOT NULL |
| `document_number` | VARCHAR(14) | NOT NULL, UNIQUE |
| `status_id` | VARCHAR(30) | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |

### Tabela: `organization_verticals`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `organization_id` | VARCHAR(36) | FK(organizations.id), NOT NULL |
| `vertical_id` | VARCHAR(36) | FK(verticals.id), NOT NULL |
| `status_id` | VARCHAR(20) | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_at` | TIMESTAMP | NULL |

### Tabela: `verticals`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `name` | VARCHAR(80) | NOT NULL |
| `code` | VARCHAR(40) | NOT NULL, UNIQUE |
| `description` | VARCHAR(255) | NOT NULL |

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| GET | `/organization/organizations?page=&pageSize=&sortDirection=` | Listar organizacoes | 200 | 500 |

---

## Error Handling

```mermaid
flowchart LR
    INF500[InfrastructureError] --> H500[500 Internal Server Error]
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `InfrastructureError` | Falha inesperada de infraestrutura | 500 | `INTERNAL_ERROR` |

---

## Technical Decisions

### Decisao 1: Normalizacao de paginacao e ordenacao na aplicacao

**Contexto**: A spec define ajustes automaticos para `page`, `pageSize` e `sortDirection` invalidos.

**Decisao**: O `ListOrganizationsService` normaliza valores para `page = 1`, `pageSize = 20` e `sortDirection = desc` quando necessario.

**Justificativa**: Mantem comportamento consistente e evita erros desnecessarios.

---

### Decisao 2: Sem filtros adicionais

**Contexto**: A listagem nao deve aplicar filtros alem de paginacao e ordenacao.

**Decisao**: O repositorio aplica apenas `LIMIT/OFFSET` e `ORDER BY created_at`.

**Justificativa**: Garante aderencia total aos requisitos.

---

## Implementation Notes

- Se `items` estiver vazio, retornar `totalItems = 0` e `totalPages = 0`.
- Ordenar sempre por `createdAt` conforme `sortDirection`.
- Nao aplicar filtros adicionais.
- Carregar verticais vinculadas via `organization_verticals` e hidratar dados basicos pela tabela `verticals`.

---
