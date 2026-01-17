# Design: List Users

**Created**: 2026-01-08  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability List Users no contexto Organization retorna usuarios cadastrados com metadados de paginacao e o organizationId quando houver vinculo.
A orquestracao ocorre no Application Service, que normaliza paginacao e ordenacao, consulta usuarios e agrega os vinculos em lote.
A complexidade e baixa, com foco em leitura paginada e montagem de resposta consistente.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `User` | Dados do usuario para listagem |
| Entity | `UserOrganizationLink` | Vinculo entre usuario e organizacao |
| Value Object | `UserId` | Identificador unico do usuario |
| Value Object | `OrganizationId` | Identificador unico da organizacao |
| Value Object | `EmailAddress` | Email validado e normalizado |
| Value Object | `PhoneNumber` | Celular validado e normalizado |
| Value Object | `UserStatus` | Status atual do usuario |
| Repository Interface | `UserRepository` | Listagem e totalizacao de usuarios |
| Repository Interface | `UserOrganizationLinkRepository` | Consulta de vinculos em lote |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `ListUsersService` | Orquestra a listagem paginada |
| Input DTO | `ListUsersInput` | Parametros de paginacao e ordenacao |
| Output DTO | `ListUsersOutput` | Lista de usuarios + metadados |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaUserRepository` | Implementa `UserRepository` |
| Repository Impl | `PrismaUserOrganizationLinkRepository` | Implementa `UserOrganizationLinkRepository` |
| Mapper | `UserMapper` | Converte Domain <-> Prisma |
| Mapper | `UserOrganizationLinkMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `UserController` | Endpoint HTTP de listagem |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[UserController]
    end

    subgraph Application
        SVC[ListUsersService]
        DTO_IN[ListUsersInput]
        DTO_OUT[ListUsersOutput]
    end

    subgraph Domain
        USER[User]
        LINK[UserOrganizationLink]
        VO_ID[UserId]
        VO_ORG[OrganizationId]
        VO_EMAIL[EmailAddress]
        VO_PHONE[PhoneNumber]
        VO_STATUS[UserStatus]
        USER_REPO[UserRepository]
        LINK_REPO[UserOrganizationLinkRepository]
    end

    subgraph Infrastructure
        USER_REPO_IMPL[PrismaUserRepository]
        LINK_REPO_IMPL[PrismaUserOrganizationLinkRepository]
        USER_MAPPER[UserMapper]
        LINK_MAPPER[UserOrganizationLinkMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> USER_REPO
    SVC --> LINK_REPO
    SVC --> USER
    SVC --> LINK
    USER --> VO_ID
    USER --> VO_EMAIL
    USER --> VO_PHONE
    USER --> VO_STATUS
    LINK --> VO_ID
    LINK --> VO_ORG
    USER_REPO_IMPL -.->|implements| USER_REPO
    LINK_REPO_IMPL -.->|implements| LINK_REPO
    USER_REPO_IMPL --> USER_MAPPER
    LINK_REPO_IMPL --> LINK_MAPPER
    USER_REPO_IMPL --> PRISMA
    LINK_REPO_IMPL --> PRISMA
    USER_MAPPER --> USER
    LINK_MAPPER --> LINK
```

---

## Data Flow

### Fluxo: Listar Usuarios

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant UserRepo
    participant LinkRepo
    participant Database

    Client->>Controller: GET /organization/users?page=&pageSize=&sortDirection=
    Controller->>AppService: ListUsersInput

    AppService->>AppService: normaliza paginacao e ordenacao

    AppService->>UserRepo: list(page, pageSize, sortDirection)
    UserRepo->>Database: SELECT users (ORDER BY created_at)
    Database-->>UserRepo: User[]

    AppService->>UserRepo: countAll()
    UserRepo->>Database: SELECT COUNT(*)
    Database-->>UserRepo: totalItems

    opt usuarios encontrados
        AppService->>LinkRepo: listByUserIds(userIds)
        LinkRepo->>Database: SELECT user_organization_links
        Database-->>LinkRepo: links
    end

    AppService-->>Controller: ListUsersOutput
    Controller-->>Client: 200 OK
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | Query params | ListUsersInput |
| AppService -> Domain | DTO | User + UserOrganizationLink |
| Domain -> Presentation | Entities | ListUsersOutput |

---

## Entity Structure

### User

```mermaid
classDiagram
    class User {
        -UserId id
        -string firstName
        -string lastName
        -EmailAddress email
        -PhoneNumber phoneNumber
        -UserStatus status
        -Date createdAt
        +getId() UserId
    }

    class UserId {
        -string value
    }

    class EmailAddress {
        -string value
    }

    class PhoneNumber {
        -string value
    }

    class UserStatus {
        <<enumeration>>
        PENDING_ORG_LINK
        ORG_LINKED
        ACTIVE
        INACTIVE
    }

    User *-- UserId
    User *-- EmailAddress
    User *-- PhoneNumber
    User *-- UserStatus
```

### UserOrganizationLink

```mermaid
classDiagram
    class UserOrganizationLink {
        -UserId userId
        -OrganizationId organizationId
    }

    class OrganizationId {
        -string value
    }

    UserOrganizationLink *-- UserId
    UserOrganizationLink *-- OrganizationId
```

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `UserRepository.list(page, pageSize, sortDirection)` | Lista usuarios paginados | ListUsersService |
| `UserRepository.countAll()` | Total de usuarios | ListUsersService |
| `UserOrganizationLinkRepository.listByUserIds(userIds)` | Vinculos dos usuarios listados | ListUsersService |

---

## Database Model

```mermaid
erDiagram
    USERS {
        varchar(36) id PK
        varchar(60) first_name
        varchar(60) last_name
        varchar(120) email
        varchar(15) phone_number
        varchar(20) status_id
        timestamp created_at
    }

    USER_ORGANIZATION_LINKS {
        varchar(36) user_id PK, FK
        varchar(36) organization_id FK
    }

    ORGANIZATIONS {
        varchar(36) id PK
    }

    USERS ||--o| USER_ORGANIZATION_LINKS : has
    ORGANIZATIONS ||--o{ USER_ORGANIZATION_LINKS : links
```

### Tabela: `users`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `first_name` | VARCHAR(60) | NOT NULL |
| `last_name` | VARCHAR(60) | NOT NULL |
| `email` | VARCHAR(120) | NOT NULL |
| `phone_number` | VARCHAR(15) | NOT NULL |
| `status_id` | VARCHAR(20) | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| GET | `/organization/users` | Listar usuarios | 200 | 500 |

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

**Decisao**: O `ListUsersService` normaliza valores para `page = 1`, `pageSize = 20` e `sortDirection = desc` quando necessario.

**Justificativa**: Mantem comportamento consistente e evita erros desnecessarios.

---

### Decisao 2: Vinculos carregados em lote

**Contexto**: Cada usuario pode ou nao ter organizacao vinculada.

**Decisao**: Buscar vinculos via `listByUserIds` e montar o `organizationId` no AppService.

**Justificativa**: Evita N+1 e mantem o `User` independente do vinculo.

---

## Implementation Notes

- Se `items` estiver vazio, retornar `totalItems = 0` e `totalPages = 0`.
- Ordenar sempre por `createdAt` conforme `sortDirection`.
- `organizationId` deve ser `null` quando nao houver vinculo.
- Nao aplicar filtros adicionais alem de paginacao e ordenacao.

---
