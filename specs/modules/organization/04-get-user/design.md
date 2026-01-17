# Design: Get User

**Created**: 2026-01-08  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Get User no contexto Organization consulta um usuario por id e retorna seus dados completos com o organizationId quando houver vinculo.
A orquestracao ocorre no Application Service, que valida o UserId, aplica politica de acesso e consulta UserRepository e UserOrganizationLinkRepository.
A complexidade e baixa, com foco em leitura consistente e retorno de vinculo opcional.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `User` | Dados do usuario e status atual |
| Entity | `UserOrganizationLink` | Vinculo entre usuario e organizacao |
| Value Object | `UserId` | Identificador unico do usuario |
| Value Object | `OrganizationId` | Identificador unico da organizacao |
| Value Object | `DocumentType` | Tipo do documento (CPF, CNPJ) |
| Value Object | `DocumentNumber` | Documento normalizado |
| Value Object | `EmailAddress` | Email validado e normalizado |
| Value Object | `PhoneNumber` | Celular validado e normalizado |
| Value Object | `UserStatus` | Status atual do usuario |
| Repository Interface | `UserRepository` | Consulta de usuario por id |
| Repository Interface | `UserOrganizationLinkRepository` | Consulta de vinculo usuario-organizacao |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `GetUserService` | Orquestra a consulta do usuario |
| Input DTO | `GetUserInput` | Dados de entrada (userId, actorUserId) |
| Output DTO | `GetUserOutput` | Dados completos do usuario |

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
| Controller | `UserController` | Endpoint HTTP de consulta |
| Middleware | `AccessControlMiddleware` | Valida permissao e rejeita com FORBIDDEN |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        MW[AccessControlMiddleware]
        CTRL[UserController]
    end

    subgraph Application
        SVC[GetUserService]
        DTO_IN[GetUserInput]
        DTO_OUT[GetUserOutput]
    end

    subgraph Domain
        USER[User]
        LINK[UserOrganizationLink]
        VO_ID[UserId]
        VO_ORG[OrganizationId]
        VO_DOC_TYPE[DocumentType]
        VO_DOC[DocumentNumber]
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

    MW --> CTRL
    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> USER_REPO
    SVC --> LINK_REPO
    SVC --> USER
    SVC --> LINK
    USER --> VO_ID
    USER --> VO_DOC_TYPE
    USER --> VO_DOC
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

### Fluxo: Consultar Usuario

```mermaid
sequenceDiagram
    participant Client
    participant Middleware
    participant Controller
    participant AppService
    participant UserRepo
    participant LinkRepo
    participant Database

    Client->>Middleware: GET /organization/users/:id (token)
    Middleware->>Middleware: valida permissao

    alt sem permissao
        Middleware-->>Client: 403 Forbidden
    else permitido
        Middleware->>Controller: request autorizado
        Controller->>AppService: GetUserInput

        AppService->>UserRepo: findById(userId)
        UserRepo->>Database: SELECT users
        Database-->>UserRepo: User | null

        alt usuario inexistente
            AppService-->>Controller: erro USER_NOT_FOUND
            Controller-->>Client: 404 Not Found
        else usuario encontrado
            AppService->>LinkRepo: findByUserId(userId)
            LinkRepo->>Database: SELECT user_organization_links
            Database-->>LinkRepo: link | null

            AppService-->>Controller: GetUserOutput (organizationId opcional)
            Controller-->>Client: 200 OK
        end
    end
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | Params + actorUserId | GetUserInput |
| AppService -> Domain | DTO | User, UserOrganizationLink |
| Domain -> Presentation | Entities | GetUserOutput |

---

## Entity Structure

### User

```mermaid
classDiagram
    class User {
        -UserId id
        -string firstName
        -string lastName
        -DocumentType documentType
        -DocumentNumber documentNumber
        -EmailAddress email
        -PhoneNumber phoneNumber
        -boolean emailOptIn
        -boolean phoneOptIn
        -UserStatus status
        -Date createdAt
        -Date updatedAt
        +getId() UserId
    }

    class UserId {
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
    User *-- DocumentType
    User *-- DocumentNumber
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
        -boolean isOwner
    }

    class OrganizationId {
        -string value
    }

    UserOrganizationLink *-- UserId
    UserOrganizationLink *-- OrganizationId
```

**Propriedades:**

| Propriedade | Tipo | Mutavel? | Regras |
|-------------|------|----------|--------|
| `id` | UserId | Nao | Obrigatorio |
| `firstName` | string | Nao | Obrigatorio |
| `lastName` | string | Nao | Obrigatorio |
| `documentType` | DocumentType | Nao | CPF ou CNPJ |
| `documentNumber` | DocumentNumber | Nao | Apenas digitos |
| `email` | EmailAddress | Nao | Formato valido |
| `phoneNumber` | PhoneNumber | Nao | Apenas digitos |
| `status` | UserStatus | Nao | Retornar estado atual |

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `UserRepository.findById(id)` | Busca usuario por id | GetUserService |
| `UserOrganizationLinkRepository.findByUserId(userId)` | Busca vinculo do usuario | GetUserService |

---

## Database Model

```mermaid
erDiagram
    USERS {
        varchar(36) id PK
        varchar(60) first_name
        varchar(60) last_name
        varchar(4) document_type
        varchar(14) document_number
        varchar(120) email
        varchar(15) phone_number
        varchar(20) status_id
        timestamp created_at
        timestamp updated_at
    }

    USER_ORGANIZATION_LINKS {
        varchar(36) user_id PK, FK
        varchar(36) organization_id FK
        boolean is_owner
        timestamp created_at
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
| `document_type` | VARCHAR(4) | NOT NULL |
| `document_number` | VARCHAR(14) | NOT NULL, UNIQUE |
| `email` | VARCHAR(120) | NOT NULL, UNIQUE |
| `phone_number` | VARCHAR(15) | NOT NULL, UNIQUE |
| `status_id` | VARCHAR(20) | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_at` | TIMESTAMP | NULL |

### Tabela: `user_organization_links`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `user_id` | VARCHAR(36) | PK, FK(users.id) |
| `organization_id` | VARCHAR(36) | FK(organizations.id) |
| `is_owner` | BOOLEAN | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| GET | `/organization/users/:id` | Consultar usuario | 200 | 400, 403, 404 |

---

## Error Handling

```mermaid
flowchart LR
    ID400[InvalidUserIdError] --> H400[400 Bad Request]
    NF404[UserNotFoundError] --> H404[404 Not Found]
    FORB403[ForbiddenError] --> H403[403 Forbidden]
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `InvalidUserIdError` | userId invalido | 400 | `INVALID_USER_ID` |
| `UserNotFoundError` | usuario inexistente | 404 | `USER_NOT_FOUND` |
| `ForbiddenError` | sem permissao para consultar | 403 | `FORBIDDEN` |

---

## Technical Decisions

### Decisao 1: Vinculo separado do usuario

**Contexto**: O organizationId e opcional e vive em tabela de vinculo.

**Decisao**: Consultar `UserOrganizationLinkRepository` apos carregar o usuario, retornando `organizationId` quando existir.

**Justificativa**: Mantem `User` independente do vinculo e permite ausencia de organizacao.

---

### Decisao 2: Permissao validada antes da consulta

**Contexto**: A spec exige rejeitar consultas sem permissao.

**Decisao**: `AccessControlMiddleware` valida a permissao do solicitante antes de chamar o `GetUserService`.

**Justificativa**: Bloqueia acesso cedo e padroniza respostas 403 na camada de presentation.

---

## Implementation Notes

- Validar `userId` via `UserId` antes de consultar repositorios.
- Quando nao existir vinculo, retornar `organizationId = null`.
- Evitar consulta ao vinculo quando o usuario nao existir.
- Manter mapeamento de status conforme valor atual do `UserStatus`.

---
