# Design: Update/Deactivate Unit of Measure

**Created**: 2026-01-12  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Update/Deactivate Unit of Measure permite alterar o nome exibido e o status da unidade de medida sem remover registros.
O Application Service valida existencia, unicidade de nome e idempotencia, bloqueando mudancas em campos imutaveis.
A complexidade e baixa, focada em validacoes e atualizacao controlada.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `UnitOfMeasure` | Unidade de medida do catalogo |
| Value Object | `UnitOfMeasureId` | Identificador unico |
| Value Object | `UnitName` | Nome validado e normalizado |
| Value Object | `UnitStatus` | Status (`ACTIVE`, `INACTIVE`) |
| Repository Interface | `UnitOfMeasureRepository` | Persistencia e consultas |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `UpdateUnitOfMeasureService` | Orquestra atualizacao e desativacao |
| Input DTO | `UpdateUnitOfMeasureInput` | Dados de entrada |
| Output DTO | `UpdateUnitOfMeasureOutput` | Unidade atualizada |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaUnitOfMeasureRepository` | Implementa `UnitOfMeasureRepository` |
| Mapper | `UnitOfMeasureMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `UnitOfMeasureController` | Exposicao HTTP do caso de uso |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[UnitOfMeasureController]
    end

    subgraph Application
        SVC[UpdateUnitOfMeasureService]
        DTO_IN[UpdateUnitOfMeasureInput]
        DTO_OUT[UpdateUnitOfMeasureOutput]
    end

    subgraph Domain
        UOM[UnitOfMeasure]
        VO_ID[UnitOfMeasureId]
        VO_NAME[UnitName]
        VO_STATUS[UnitStatus]
        UOM_REPO[UnitOfMeasureRepository]
    end

    subgraph Infrastructure
        UOM_IMPL[PrismaUnitOfMeasureRepository]
        UOM_MAPPER[UnitOfMeasureMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> UOM
    SVC --> UOM_REPO
    UOM --> VO_ID
    UOM --> VO_NAME
    UOM --> VO_STATUS
    UOM_IMPL -.->|implements| UOM_REPO
    UOM_IMPL --> UOM_MAPPER
    UOM_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Atualizar/Desativar Unidade de Medida

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant UomRepo
    participant Database

    Client->>Controller: PATCH /inventory/units-of-measure/:id
    Controller->>AppService: UpdateUnitOfMeasureInput

    AppService->>UomRepo: findById(unitOfMeasureId)
    UomRepo->>Database: SELECT
    Database-->>UomRepo: unit

    AppService->>AppService: valida campos atualizaveis

    opt name informado
        AppService->>UomRepo: existsByName(organizationId, nameNormalized)
        UomRepo->>Database: SELECT
        Database-->>UomRepo: resultado
    end

    AppService->>AppService: aplica update idempotente (quando sem mudanca)

    AppService->>UomRepo: save(updated unit)
    UomRepo->>Database: UPDATE
    Database-->>UomRepo: OK

    AppService-->>Controller: UpdateUnitOfMeasureOutput
    Controller-->>Client: 200 OK
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | Params + body | UpdateUnitOfMeasureInput |
| AppService -> Domain | DTO | UnitOfMeasure |
| Repository -> DB | Entity | Prisma Model |

---

## Entity Structure

### UnitOfMeasure (recorte relevante)

```mermaid
classDiagram
    class UnitOfMeasure {
        -UnitOfMeasureId id
        -string name
        -UnitStatus status
        -string updatedBy
        -Date updatedAt
        +updateName() void
        +changeStatus() void
    }

    class UnitStatus {
        <<enumeration>>
        ACTIVE
        INACTIVE
    }

    UnitOfMeasure *-- UnitStatus
```

**Comportamentos:**

| Metodo | Regras |
|--------|--------|
| `updateName` | Valida tamanho e aplica normalizacao |
| `changeStatus` | Aceita apenas ACTIVE/INACTIVE |

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `UnitOfMeasureRepository.findById(id)` | Busca unidade | UpdateUnitOfMeasureService |
| `UnitOfMeasureRepository.existsByName(orgId, name)` | Verifica duplicidade de name | UpdateUnitOfMeasureService |
| `UnitOfMeasureRepository.save(unit)` | Persiste atualizacao | UpdateUnitOfMeasureService |

---

## Database Model

```mermaid
erDiagram
    UNIT_OF_MEASURES {
        varchar(36) id PK
        varchar(36) organization_id
        varchar(10) code
        varchar(60) name
        varchar(60) name_normalized
        varchar(10) symbol
        boolean allows_fraction
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
| PATCH | `/inventory/units-of-measure/:id` | Atualizar/desativar unidade | 200 | 400, 404, 409 |

---

## Error Handling

```mermaid
flowchart LR
    UOM404[UnitOfMeasureNotFoundError] --> H404[404 Not Found]
    NAME409[UnitNameAlreadyExistsError] --> H409[409 Conflict]
    NAME400[InvalidUnitNameError] --> H400[400 Bad Request]
    STATUS400[InvalidUnitStatusError] --> H400
    FIELDS400[NoUpdatableFieldsError] --> H400
    IMMUT400[ImmutableFieldUpdateError] --> H400
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `UnitOfMeasureNotFoundError` | id inexistente | 404 | `UNIT_OF_MEASURE_NOT_FOUND` |
| `UnitNameAlreadyExistsError` | name duplicado na organizacao | 409 | `UNIT_NAME_ALREADY_EXISTS` |
| `InvalidUnitNameError` | name fora do tamanho | 400 | `INVALID_UNIT_NAME` |
| `InvalidUnitStatusError` | status fora de ACTIVE/INACTIVE | 400 | `INVALID_UNIT_STATUS` |
| `NoUpdatableFieldsError` | nenhum campo atualizavel informado | 400 | `NO_UPDATABLE_FIELDS` |
| `ImmutableFieldUpdateError` | tentativa de alterar code/symbol/allowsFraction | 400 | `IMMUTABLE_FIELD_UPDATE` |

---

## Technical Decisions

### Decisao 1: Atualizacao idempotente

**Contexto**: O sistema deve retornar estado atual quando nao ha mudanca.

**Decisao**: Se `name` e `status` forem iguais, retornar sem atualizar `updatedAt`.

**Justificativa**: Mantem idempotencia e evita ruido em auditoria.

---

### Decisao 2: Campos imutaveis bloqueados na aplicacao

**Contexto**: `code`, `symbol` e `allowsFraction` nao podem mudar.

**Decisao**: O controller rejeita payloads com esses campos antes do service.

**Justificativa**: Falha rapida e evita alteracoes indevidas.

---

## Implementation Notes

- Normalizar `name` com trim + lowercase para validar unicidade.
- Ao atualizar status para INACTIVE, nao alterar itens existentes.
- Retornar `status` atualizado no output.
- Manter `updatedBy` obrigatorio quando houver alteracao real.

---
