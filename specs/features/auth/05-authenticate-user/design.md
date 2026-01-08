# Authenticate User

**Created**: 2025-12-29

**Spec**: `./spec.md`

**Project**: `../project.md`

---

## Overview

A capability **Authenticate User** autentica uma identidade **ativa** a partir de credenciais previamente registradas e, em caso de sucesso, **emite um token de autenticação**.

Ela **não interpreta autorização**, **não carrega permissões**, **não decide comportamento de negócio** e **não mantém estado de sessão** além do token emitido.

O fluxo segue **Presentation → Application → Domain → Infrastructure**, com decisões criptográficas e de token **isoladas na Infrastructure**.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| Entity | `AuthenticationToken` | Representa um token emitido |
| Value Object | `AuthTokenId` | Identificador do token |
| Value Object | `TokenExpiration` | Expiração do token |
| Repository Interface | `UserRepository` | Consulta de identidade |
| Repository Interface | `UserCredentialRepository` | Consulta de credenciais |

📌 O Domain **não valida segredo** e **não conhece algoritmo criptográfico**.

---

### Application Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| App Service | `AuthenticateUserService` | Orquestra a autenticação |
| Input DTO | `AuthenticateUserInput` | Dados fornecidos pelo usuário |
| Output DTO | `AuthenticateUserOutput` | Token emitido |

---

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| Credential Verifier | `CredentialVerifier` | Valida segredo (hash compare) |
| Token Generator | `AuthTokenGenerator` | Gera token assinado |
| Clock Adapter | `SystemClock` | Fonte de tempo |
| Repository Impl | `PrismaUserCredentialRepository` | Persistência |
| Repository Impl | `PrismaUserRepository` | Persistência |

📌 JWT, libs crypto e formato do token **vivem aqui**.

---

### Presentation Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| Controller | `AuthenticationController` | Endpoint de login |

---

## Dependency Graph

```mermaid
graph TD
    CTRL[AuthenticationController]
    SVC[AuthenticateUserService]

    USER_REPO[UserRepository]
    CRED_REPO[UserCredentialRepository]

    TOKEN[AuthenticationToken]
    TOKEN_GEN[AuthTokenGenerator]
    VERIFIER[CredentialVerifier]
    CLOCK[SystemClock]

    DB[(Database)]

    CTRL --> SVC
    SVC --> USER_REPO
    SVC --> CRED_REPO
    SVC --> VERIFIER
    SVC --> TOKEN_GEN
    SVC --> CLOCK
    SVC --> TOKEN

    USER_REPO --> DB
    CRED_REPO --> DB

```

---

## Data Flow

### Fluxo: Autenticar Usuário

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant UserRepo
    participant CredentialRepo
    participant Verifier
    participant TokenGen
    participant Database

    Client->>Controller: POST /auth/login
    Controller->>AppService: AuthenticateUserInput

    AppService->>CredentialRepo: findByIdentifierAndMethod(identifier, method)
    CredentialRepo->>Database: SELECT
    Database-->>CredentialRepo: Credential

    AppService->>UserRepo: findById(userId)
    UserRepo->>Database: SELECT
    Database-->>UserRepo: User

    AppService->>AppService: valida status == ACTIVE

    AppService->>Verifier: verify(inputSecret, storedHash)
    Verifier-->>AppService: valid | invalid

    AppService->>TokenGen: generate(userId, issuedAt, expiresAt)
    TokenGen-->>AppService: token

    AppService-->>Controller: AuthenticateUserOutput
    Controller-->>Client: 200 OK (token)

```

---

## Entity Structure

### AuthenticationToken

```mermaid
classDiagram
    class AuthenticationToken {
        -AuthTokenId id
        -string userId
        -Date issuedAt
        -Date expiresAt
    }

    class AuthTokenId {
        -string value
    }

    AuthenticationToken *-- AuthTokenId

```

📌 O token **não carrega permissões, roles ou grants**.

---

## Repository Operations

| Operação | Descrição | Usada por |
| --- | --- | --- |
| `findByIdentifierAndMethod(identifier, method)` | Localiza credencial | AuthenticateUserService |
| `findById(userId)` | Localiza identidade | AuthenticateUserService |

---

## API Endpoints

| Método | Path | Operação | Sucesso | Erros |
| --- | --- | --- | --- | --- |
| POST | `/auth/login` | Autenticar | 200 | 401, 403, 404 |

---

## Error Handling

```mermaid
flowchart LR
    NF[UserNotFoundError] --> H404[404]
    INACTIVE[UserInactiveError] --> H403[403]
    CRED[InvalidCredentialError] --> H401[401]
    CNF[CredentialNotFoundError] --> H401[401]

```

| Erro | Quando | Code |
| --- | --- | --- |
| UserNotFoundError | Identidade inexistente | `USER_NOT_FOUND` |
| UserInactiveError | Usuário INACTIVE | `USER_INACTIVE` |
| InvalidCredentialError | Segredo inválido | `INVALID_CREDENTIAL` |
| CredentialNotFoundError | Credencial inexistente | `CREDENTIAL_NOT_FOUND` |

📌 Todos os erros **negam autenticação** e **não retornam token**.

---

## Alignment Notes (Spec-Driven)

- Autenticação **exige usuário ACTIVE**
- Credenciais inválidas **sempre negam**
- Token **não implica autorização**
- Nenhuma permissão é resolvida aqui
- Nenhum estado de sessão é criado

---

## Implementation Notes

- Verificação de segredo **isolada na Infrastructure**
- Token é **opaco para módulos consumidores**
- Clock injetado para testes determinísticos
- Nenhum cache de autenticação
- Nenhum acoplamento com Permissions Provider
- `identifier` normalizado (trim + lowercase) antes da busca
- `identifier` validado como email ou username antes da busca
