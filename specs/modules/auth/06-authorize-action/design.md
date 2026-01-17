# Authorize Access (verify identity)

**Created**: 2025-12-29

**Spec**: `./spec.md`

**Project**: `../project.md`

---

## Overview

A capability **Authorize Access** valida um token e confirma se ele representa uma identidade existente e ativa.

Ela **não avalia regras de acesso**, **não interpreta domínio**, **não emite tokens** e **não mantém estado**.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| Entity | `AccessAuthorizationResult` | Resultado da verificação de acesso |

---

### Application Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| App Service | `AuthorizeAccessService` | Orquestra verificação do token e da identidade |
| Input DTO | `AuthorizeAccessInput` | Token informado pelo módulo consumidor |
| Output DTO | `AuthorizeAccessOutput` | `authorized`, `userId?`, `checkedAt` |

---

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| Token Verifier | `IdentityTokenVerifier` | Verifica assinatura, expiração e revogação |
| Repository Impl | `PrismaUserRepository` | Consulta de identidade |
| Clock Adapter | `SystemClock` | Fornece `checkedAt` |

---

### Presentation Layer

| Tipo | Nome | Responsabilidade |
| --- | --- | --- |
| Controller | `AccessAuthorizationController` | Endpoint HTTP de verificação |

---

## Dependency Graph

```mermaid
graph TD
    CTRL[AccessAuthorizationController]
    SVC[AuthorizeAccessService]
    RES[AccessAuthorizationResult]
    TV[IdentityTokenVerifier]
    USER_REPO[UserRepository]
    CLOCK[SystemClock]

    CTRL --> SVC
    SVC --> TV
    SVC --> USER_REPO
    SVC --> RES
    SVC --> CLOCK

```

---

## Data Flow

### Fluxo: Verificar acesso por token

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant TokenVerifier
    participant UserRepository
    participant Clock

    Client->>Controller: POST /identity/authorize (token)
    Controller->>AppService: AuthorizeAccessInput

    AppService->>TokenVerifier: verify(token)
    TokenVerifier-->>AppService: userId | invalid | revoked

    AppService->>UserRepository: findById(userId)
    UserRepository-->>AppService: User | not found

    AppService->>AppService: se user inexistente ou INACTIVE, authorized=false

    AppService->>Clock: now()
    Clock-->>AppService: checkedAt

    AppService-->>Controller: AuthorizeAccessOutput
    Controller-->>Client: 200 OK (authorized + meta)

```

---

## Entity Structure

### AccessAuthorizationResult

```mermaid
classDiagram
    class AccessAuthorizationResult {
        -boolean authorized
        -string userId
        -Date checkedAt
        +create(authorized, userId, checkedAt)
    }

```

📌 `userId` só é preenchido quando `authorized = true`.

---

## API Endpoints

| Método | Path | Operação | Sucesso | Erros |
| --- | --- | --- | --- | --- |
| POST | `/identity/authorize` | Verificar acesso | 200 | 400 |

Notas:

- `400`: payload inválido (token ausente ou malformado).

---

## Error Handling

```mermaid
flowchart LR
    VAL[ValidationError] --> H400[400 Bad Request]

```

| Erro | Quando | HTTP | Code |
| --- | --- | --- | --- |
| `ValidationError` | Token ausente ou inválido no payload | 400 | `VALIDATION_ERROR` |

---

## Technical Decisions

### TD-01: Verificação de token isolada na Infrastructure

**Contexto**: O domínio não deve conhecer formato de token ou criptografia.

**Decisão**: `IdentityTokenVerifier` fica na Infrastructure e retorna apenas `userId` ou falha.

**Justificativa**: Mantém o domínio puro e desacopla decisões técnicas.

---

## Implementation Notes

- **Stateless**: nenhuma persistência ou cache de decisão.
- **Fail-closed**: token inválido ou revogado resulta em `authorized=false`.
- **Sem regras de acesso**: apenas verificação de identidade.
