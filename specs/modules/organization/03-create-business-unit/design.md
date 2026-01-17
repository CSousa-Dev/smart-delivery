# Design: Create Business Unit

**Created**: 2026-01-08  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Create Business Unit no contexto Organization cria a unidade de negocio com dados publicos e endereco completo.
A orquestracao ocorre no Application Service, que valida organizacao e owner, normaliza dados, cria BusinessUnit com status inicial PENDING_PRODUCTS e persiste em transacao.
A complexidade e moderada por validacoes de endereco Brasil e pelo update condicional do status da organizacao.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `BusinessUnit` | Unidade de negocio com dados publicos e status |
| Entity | `Organization` | Organizacao usada para validar owner e status |
| Value Object | `BusinessUnitId` | Identificador unico da unidade |
| Value Object | `OrganizationId` | Identificador unico da organizacao |
| Value Object | `BusinessUnitAddress` | Endereco completo com validacoes BR |
| Value Object | `BusinessUnitStatus` | Estado da unidade (PENDING_PRODUCTS, ACTIVE) |
| Value Object | `PhoneNumber` | Telefone normalizado (apenas digitos) |
| Value Object | `EmailAddress` | Email validado quando informado |
| Repository Interface | `BusinessUnitRepository` | Persistencia e consultas por organizacao |
| Repository Interface | `OrganizationRepository` | Consulta e atualizacao de organizacao |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `CreateBusinessUnitService` | Orquestra a criacao da unidade |
| Input DTO | `CreateBusinessUnitInput` | Dados de entrada para criacao |
| Output DTO | `CreateBusinessUnitOutput` | Dados retornados apos criacao |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaBusinessUnitRepository` | Implementa `BusinessUnitRepository` |
| Repository Impl | `PrismaOrganizationRepository` | Implementa `OrganizationRepository` |
| Mapper | `BusinessUnitMapper` | Converte Domain ↔ Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `BusinessUnitController` | Exposicao HTTP do caso de uso |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[BusinessUnitController]
    end

    subgraph Application
        SVC[CreateBusinessUnitService]
        DTO_IN[CreateBusinessUnitInput]
        DTO_OUT[CreateBusinessUnitOutput]
    end

    subgraph Domain
        BU[BusinessUnit]
        ORG[Organization]
        VO_ID[BusinessUnitId]
        VO_ORG[OrganizationId]
        VO_ADDR[BusinessUnitAddress]
        VO_PHONE[PhoneNumber]
        VO_EMAIL[EmailAddress]
        VO_STATUS[BusinessUnitStatus]
        BU_REPO[BusinessUnitRepository]
        ORG_REPO[OrganizationRepository]
    end

    subgraph Infrastructure
        BU_REPO_IMPL[PrismaBusinessUnitRepository]
        ORG_REPO_IMPL[PrismaOrganizationRepository]
        BU_MAPPER[BusinessUnitMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> BU
    SVC --> ORG
    SVC --> BU_REPO
    SVC --> ORG_REPO
    BU --> VO_ID
    BU --> VO_ORG
    BU --> VO_ADDR
    BU --> VO_PHONE
    BU --> VO_EMAIL
    BU --> VO_STATUS
    BU_REPO_IMPL -.->|implements| BU_REPO
    ORG_REPO_IMPL -.->|implements| ORG_REPO
    BU_REPO_IMPL --> BU_MAPPER
    BU_REPO_IMPL --> PRISMA
    ORG_REPO_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Criar Business Unit

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant OrgRepo
    participant BuRepo
    participant BusinessUnit
    participant Database

    Client->>Controller: POST /organization/business-units
    Controller->>AppService: CreateBusinessUnitInput

    AppService->>OrgRepo: findById(organizationId)
    OrgRepo->>Database: SELECT
    Database-->>OrgRepo: Organization

    AppService->>AppService: valida owner (organization.ownerUserId)
    AppService->>AppService: normaliza telefone e CEP

    AppService->>BuRepo: countByOrganizationId(organizationId)
    BuRepo->>Database: SELECT COUNT
    Database-->>BuRepo: total

    AppService->>BusinessUnit: BusinessUnit.create(status=PENDING_PRODUCTS)

    Note over AppService,Database: Persistencia em transacao
    AppService->>BuRepo: save(BusinessUnit)
    BuRepo->>Database: INSERT business_units + address
    Database-->>BuRepo: OK

    alt primeira unidade (count == 0)
        AppService->>OrgRepo: updateStatus(organizationId, ACTIVE)
        OrgRepo->>Database: UPDATE
        Database-->>OrgRepo: OK
    end

    AppService-->>Controller: CreateBusinessUnitOutput
    Controller-->>Client: 201 Created
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller → AppService | JSON body + actorUserId | CreateBusinessUnitInput |
| AppService → Domain | DTO | BusinessUnit |
| Domain → Infra | Entity | Prisma Models |

---

## Entity Structure

### BusinessUnit

```mermaid
classDiagram
    class BusinessUnit {
        -BusinessUnitId id
        -OrganizationId organizationId
        -string publicName
        -PhoneNumber phoneNumber
        -boolean phoneHasWhatsapp
        -EmailAddress email
        -string instagram
        -string website
        -BusinessUnitAddress address
        -BusinessUnitStatus status
        -Date createdAt
        -Date updatedAt
        +create() BusinessUnit
        +getId() BusinessUnitId
        +getStatus() BusinessUnitStatus
    }

    class BusinessUnitAddress {
        -string street
        -string number
        -string complement
        -string neighborhood
        -string city
        -string state
        -string postalCode
        -string country
        -string referencePoint
    }

    class BusinessUnitStatus {
        <<enumeration>>
        PENDING_PRODUCTS
        ACTIVE
    }

    BusinessUnit *-- BusinessUnitAddress
    BusinessUnit *-- BusinessUnitStatus
    BusinessUnit *-- PhoneNumber
    BusinessUnit *-- EmailAddress
```

**Propriedades:**

| Propriedade | Tipo | Mutavel? | Regras |
|-------------|------|----------|--------|
| `id` | BusinessUnitId | Nao | Gerado internamente |
| `organizationId` | OrganizationId | Nao | Obrigatorio |
| `publicName` | string | Nao | Obrigatorio |
| `phoneNumber` | PhoneNumber | Nao | Apenas digitos, max 15 |
| `phoneHasWhatsapp` | boolean | Nao | Obrigatorio |
| `email` | EmailAddress | Nao | Opcional, formato valido |
| `instagram` | string | Nao | Opcional |
| `website` | string | Nao | Opcional |
| `address` | BusinessUnitAddress | Nao | Obrigatorio |
| `status` | BusinessUnitStatus | Nao | Definido pela aplicacao |
| `createdAt` | Date | Nao | Automatico |
| `updatedAt` | Date | Sim | Atualizado em mudancas futuras |

### BusinessUnitAddress

**Propriedades:**

| Propriedade | Tipo | Mutavel? | Regras |
|-------------|------|----------|--------|
| `street` | string | Nao | Obrigatorio |
| `number` | string | Nao | Obrigatorio |
| `complement` | string | Nao | Opcional |
| `neighborhood` | string | Nao | Obrigatorio |
| `city` | string | Nao | Obrigatorio |
| `state` | string | Nao | UF valida do Brasil |
| `postalCode` | string | Nao | 8 digitos numericos |
| `country` | string | Nao | Valor fixo `BR` |
| `referencePoint` | string | Nao | Obrigatorio |

**Comportamentos:**

| Metodo | Regras |
|--------|--------|
| `create` | Valida dados obrigatorios, UF e pais BR |

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `BusinessUnitRepository.save(unit)` | Persiste unidade e endereco | CreateBusinessUnitService |
| `BusinessUnitRepository.countByOrganizationId(orgId)` | Conta unidades da organizacao | CreateBusinessUnitService |
| `OrganizationRepository.findById(id)` | Carrega organizacao e owner | CreateBusinessUnitService |
| `OrganizationRepository.updateStatus(id, status)` | Atualiza status da organizacao | CreateBusinessUnitService |

---

## Database Model

```mermaid
erDiagram
    ORGANIZATIONS {
        varchar(36) id PK
        varchar(36) owner_user_id
        varchar(20) status_id
    }

    BUSINESS_UNITS {
        varchar(36) id PK
        varchar(36) organization_id FK
        varchar(120) public_name
        varchar(15) phone_number
        boolean phone_has_whatsapp
        varchar(120) email
        varchar(120) instagram
        varchar(255) website
        varchar(20) status_id
        timestamp created_at
        timestamp updated_at
    }

    BUSINESS_UNIT_ADDRESSES {
        varchar(36) business_unit_id PK, FK
        varchar(120) street
        varchar(20) number
        varchar(120) complement
        varchar(120) neighborhood
        varchar(120) city
        varchar(2) state
        varchar(8) postal_code
        varchar(2) country
        varchar(120) reference_point
    }

    ORGANIZATIONS ||--o{ BUSINESS_UNITS : has
    BUSINESS_UNITS ||--|| BUSINESS_UNIT_ADDRESSES : address
```

### Tabela: `business_units`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `organization_id` | VARCHAR(36) | FK(organizations.id), NOT NULL |
| `public_name` | VARCHAR(120) | NOT NULL |
| `phone_number` | VARCHAR(15) | NOT NULL |
| `phone_has_whatsapp` | BOOLEAN | NOT NULL |
| `email` | VARCHAR(120) | NULL |
| `instagram` | VARCHAR(120) | NULL |
| `website` | VARCHAR(255) | NULL |
| `status_id` | VARCHAR(20) | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_at` | TIMESTAMP | NULL |

### Tabela: `business_unit_addresses`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `business_unit_id` | VARCHAR(36) | PK, FK(business_units.id) |
| `street` | VARCHAR(120) | NOT NULL |
| `number` | VARCHAR(20) | NOT NULL |
| `complement` | VARCHAR(120) | NULL |
| `neighborhood` | VARCHAR(120) | NOT NULL |
| `city` | VARCHAR(120) | NOT NULL |
| `state` | VARCHAR(2) | NOT NULL |
| `postal_code` | VARCHAR(8) | NOT NULL |
| `country` | VARCHAR(2) | NOT NULL |
| `reference_point` | VARCHAR(120) | NOT NULL |

### Tabela: `organizations`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `owner_user_id` | VARCHAR(36) | NOT NULL |
| `status_id` | VARCHAR(20) | NOT NULL |

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| POST | `/organization/business-units` | Criar unidade de negocio | 201 | 400, 403, 404 |

---

## Error Handling

```mermaid
flowchart LR
    ORG404[OrganizationNotFoundError] --> H404[404 Not Found]
    OWNER403[UserNotOwnerError] --> H403[403 Forbidden]
    PHONE400[InvalidPhoneNumberError] --> H400[400 Bad Request]
    EMAIL400[InvalidEmailError] --> H400
    CEP400[InvalidPostalCodeError] --> H400
    UF400[InvalidStateError] --> H400
    COUNTRY400[InvalidCountryError] --> H400
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `OrganizationNotFoundError` | organizationId inexistente | 404 | `ORGANIZATION_NOT_FOUND` |
| `UserNotOwnerError` | usuario nao e owner da organizacao | 403 | `USER_NOT_OWNER` |
| `InvalidPhoneNumberError` | telefone invalido | 400 | `INVALID_PHONE_NUMBER` |
| `InvalidEmailError` | email invalido | 400 | `INVALID_EMAIL` |
| `InvalidPostalCodeError` | CEP invalido | 400 | `INVALID_POSTAL_CODE` |
| `InvalidStateError` | UF invalida | 400 | `INVALID_STATE` |
| `InvalidCountryError` | pais diferente de BR | 400 | `INVALID_COUNTRY` |

---

## Technical Decisions

### Decisao 1: Validar ownership via ownerUserId da organizacao

**Contexto**: A criacao exige que o solicitante seja owner da organizacao.

**Decisao**: O `CreateBusinessUnitService` carrega a organizacao e compara `ownerUserId` com o `actorUserId` do request.

**Justificativa**: Evita consultas adicionais ao vinculo usuario-organizacao e usa a fonte unica de ownership da organizacao.

---

### Decisao 2: Transacao unica para unidade, endereco e update de organizacao

**Contexto**: A primeira unidade ativa a organizacao e nao pode existir inconsistencias.

**Decisao**: Persistir `BusinessUnit`, `BusinessUnitAddress` e o update de status da organizacao na mesma transacao do Prisma.

**Justificativa**: Garante atomicidade entre criacao da unidade e status da organizacao.

---

### Decisao 3: Endereco como Value Object e tabela 1:1

**Contexto**: O endereco tem regras de validacao Brasil e eh parte obrigatoria da unidade.

**Decisao**: Modelar `BusinessUnitAddress` como VO dentro de `BusinessUnit` e persistir em `business_unit_addresses`.

**Justificativa**: Mantem regras de endereco encapsuladas e permite evolucao do endereco sem inflar a tabela principal.

---

## Implementation Notes

- Normalizar `phoneNumber` e `postalCode` para apenas digitos antes da validacao.
- Rejeitar `state` fora da lista de UFs e `country` diferente de `BR`.
- Definir `status` como `PENDING_PRODUCTS` sempre na criacao.
- Atualizar `organizations.status_id` para `ACTIVE` apenas quando `countByOrganizationId` for 0.
- Usar transacao unica para `business_units`, `business_unit_addresses` e update de organizacao.

---
