# Design: Create Allowed Value

**Created**: 2026-01-08  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Create Allowed Value cadastra valores permitidos para atributos do tipo option.
O Application Service valida a existencia do atributo, o tipo option, formato Pascal Case do value e unicidade case-insensitive de name/value.
O valor permitido e persistido e passa a compor as opcoes globais do atributo.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `AllowedValue` | Representa um valor permitido de atributo option |
| Value Object | `AllowedValueId` | Identificador unico do valor permitido |
| Value Object | `AllowedValueName` | Nome validado e normalizado |
| Value Object | `AllowedValueValue` | Value em Pascal Case validado |
| Value Object | `AttributeId` | Identificador do atributo |
| Repository Interface | `AllowedValueRepository` | Persistencia e consultas de valores permitidos |
| Repository Interface | `AttributeRepository` | Consulta de atributo e limites |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `CreateAllowedValueService` | Orquestra a criacao do valor permitido |
| Input DTO | `CreateAllowedValueInput` | Dados de entrada para criacao |
| Output DTO | `CreateAllowedValueOutput` | Dados retornados apos criacao |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaAllowedValueRepository` | Implementa `AllowedValueRepository` |
| Repository Impl | `PrismaAttributeRepository` | Implementa `AttributeRepository` |
| Mapper | `AllowedValueMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `AllowedValueController` | Exposicao HTTP do caso de uso |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[AllowedValueController]
    end

    subgraph Application
        SVC[CreateAllowedValueService]
        DTO_IN[CreateAllowedValueInput]
        DTO_OUT[CreateAllowedValueOutput]
    end

    subgraph Domain
        ALLOWED[AllowedValue]
        VO_ID[AllowedValueId]
        VO_NAME[AllowedValueName]
        VO_VALUE[AllowedValueValue]
        VO_ATTR[AttributeId]
        ALLOWED_REPO[AllowedValueRepository]
        ATTR_REPO[AttributeRepository]
    end

    subgraph Infrastructure
        ALLOWED_REPO_IMPL[PrismaAllowedValueRepository]
        ATTR_REPO_IMPL[PrismaAttributeRepository]
        ALLOWED_MAPPER[AllowedValueMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> ALLOWED
    SVC --> ALLOWED_REPO
    SVC --> ATTR_REPO
    ALLOWED --> VO_ID
    ALLOWED --> VO_NAME
    ALLOWED --> VO_VALUE
    ALLOWED --> VO_ATTR
    ALLOWED_REPO_IMPL -.->|implements| ALLOWED_REPO
    ATTR_REPO_IMPL -.->|implements| ATTR_REPO
    ALLOWED_REPO_IMPL --> ALLOWED_MAPPER
    ALLOWED_REPO_IMPL --> PRISMA
    ATTR_REPO_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Criar Allowed Value

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant AttributeRepo
    participant AllowedValueRepo
    participant AllowedValue
    participant Database

    Client->>Controller: POST /attributes/:attributeId/allowed-values
    Controller->>AppService: CreateAllowedValueInput

    AppService->>AttributeRepo: findById(attributeId)
    AttributeRepo->>Database: SELECT
    Database-->>AttributeRepo: attribute

    AppService->>AppService: valida tipo option e limites do atributo

    AppService->>AllowedValueRepo: existsByName(attributeId, name)
    AllowedValueRepo->>Database: SELECT
    Database-->>AllowedValueRepo: resultado

    AppService->>AllowedValueRepo: existsByValue(attributeId, value)
    AllowedValueRepo->>Database: SELECT
    Database-->>AllowedValueRepo: resultado

    AppService->>AllowedValue: AllowedValue.create(...)
    AllowedValue-->>AppService: AllowedValue valido

    AppService->>AllowedValueRepo: save(AllowedValue)
    AllowedValueRepo->>Database: INSERT
    Database-->>AllowedValueRepo: OK

    AppService-->>Controller: CreateAllowedValueOutput
    Controller-->>Client: 201 Created
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | JSON body | CreateAllowedValueInput |
| AppService -> Domain | DTO | AllowedValue |
| Repository -> DB | AllowedValue | Prisma Model |

---

## Entity Structure

### AllowedValue

```mermaid
classDiagram
    class AllowedValue {
        -AllowedValueId id
        -AttributeId attributeId
        -string name
        -string value
        -string description
        -Date createdAt
        -Date updatedAt
        +create() AllowedValue
    }

    class AllowedValueId {
        -string value
    }

    AllowedValue *-- AllowedValueId
```

**Propriedades:**

| Propriedade | Tipo | Mutavel? | Regras |
|-------------|------|----------|--------|
| `id` | AllowedValueId | Nao | Gerado internamente |
| `attributeId` | AttributeId | Nao | Obrigatorio, atributo option |
| `name` | string | Nao | Obrigatorio, unico por atributo, trim, case-insensitive |
| `value` | string | Nao | Obrigatorio, Pascal Case, unico por atributo, case-insensitive |
| `description` | string | Nao | Opcional |
| `createdAt` | Date | Nao | Automatico |
| `updatedAt` | Date | Sim | Atualizado em mudancas futuras |

**Comportamentos:**

| Metodo | Regras |
|--------|--------|
| `create` | Valida Pascal Case e tamanho do value conforme limites do atributo |

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `AttributeRepository.findById(id)` | Busca atributo e limites | CreateAllowedValueService |
| `AllowedValueRepository.existsByName(attributeId, name)` | Verifica duplicidade de name | CreateAllowedValueService |
| `AllowedValueRepository.existsByValue(attributeId, value)` | Verifica duplicidade de value | CreateAllowedValueService |
| `AllowedValueRepository.save(allowedValue)` | Persiste valor permitido | CreateAllowedValueService |

---

## Database Model

```mermaid
erDiagram
    ATTRIBUTES {
        varchar(36) id PK
        varchar(20) type
        decimal(18,4) min_value
        decimal(18,4) max_value
    }

    ATTRIBUTE_ALLOWED_VALUES {
        varchar(36) id PK
        varchar(36) attribute_id FK
        varchar(120) name
        varchar(120) value
        varchar(120) name_normalized
        varchar(120) value_normalized
        varchar(255) description
        timestamp created_at
        timestamp updated_at
    }

    ATTRIBUTES ||--o{ ATTRIBUTE_ALLOWED_VALUES : has
```

### Tabela: `attribute_allowed_values`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `attribute_id` | VARCHAR(36) | NOT NULL, FK(attributes.id) |
| `name` | VARCHAR(120) | NOT NULL |
| `value` | VARCHAR(120) | NOT NULL |
| `name_normalized` | VARCHAR(120) | NOT NULL |
| `value_normalized` | VARCHAR(120) | NOT NULL |
| `description` | VARCHAR(255) | NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_at` | TIMESTAMP | NULL |

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| POST | `/attributes/:attributeId/allowed-values` | Criar valor permitido | 201 | 400, 404, 409 |

---

## Error Handling

```mermaid
flowchart LR
    ATTR404[AttributeNotFoundError] --> H404[404 Not Found]
    TYPE400[AttributeNotOptionTypeError] --> H400[400 Bad Request]
    NAME409[AllowedValueNameAlreadyExistsError] --> H409[409 Conflict]
    VALUE409[AllowedValueValueAlreadyExistsError] --> H409
    VALUE400[InvalidAllowedValueValueError] --> H400
    NAME400[InvalidAllowedValueNameError] --> H400
    LENGTH400[AllowedValueLengthOutOfBoundsError] --> H400
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `AttributeNotFoundError` | attributeId inexistente | 404 | `ATTRIBUTE_NOT_FOUND` |
| `AttributeNotOptionTypeError` | atributo nao e option | 400 | `ATTRIBUTE_NOT_OPTION` |
| `AllowedValueNameAlreadyExistsError` | Name duplicado no atributo | 409 | `ALLOWED_VALUE_NAME_EXISTS` |
| `AllowedValueValueAlreadyExistsError` | Value duplicado no atributo | 409 | `ALLOWED_VALUE_VALUE_EXISTS` |
| `InvalidAllowedValueValueError` | Formato de value invalido | 400 | `INVALID_ALLOWED_VALUE_VALUE` |
| `InvalidAllowedValueNameError` | Name vazio apos trim | 400 | `INVALID_ALLOWED_VALUE_NAME` |
| `AllowedValueLengthOutOfBoundsError` | Value fora dos limites | 400 | `ALLOWED_VALUE_OUT_OF_BOUNDS` |

---

## Technical Decisions

### Decisao 1: Unicidade case-insensitive com colunas normalizadas

**Contexto**: Name e value devem ser unicos por atributo, ignorando caixa.

**Decisao**: Persistir `name_normalized` e `value_normalized` em lowercase e aplicar indices unicos.

**Justificativa**: Evita dependencia de collation do banco e garante regra consistente.

---

### Decisao 2: Validar tamanho do value com limites do atributo

**Contexto**: `value` deve respeitar minValue/maxValue do atributo.

**Decisao**: O Application Service obtem os limites efetivos do atributo (com defaults) antes de criar o AllowedValue.

**Justificativa**: Garante consistencia entre definicao do atributo e seus valores permitidos.

---

## Implementation Notes

- Validar `value` com regex de Pascal Case, permitindo numeros e espacos simples.
- Aplicar trim em `name` e `value` antes de validar duplicidade.
- Rejeitar criacao quando o atributo nao for do tipo option.
- Criar indices unicos em `attribute_allowed_values(attribute_id, name_normalized)` e `attribute_allowed_values(attribute_id, value_normalized)`.

---
