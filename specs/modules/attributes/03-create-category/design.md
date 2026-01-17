# Design: Create Category

**Created**: 2026-01-08  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Overview

A capability Create Category cria categorias vinculadas a uma vertical, com suporte a hierarquia de ate 3 niveis.
O Application Service valida a existencia da vertical, unicidade de name/code por vertical e regras da hierarquia (mesma vertical, profundidade e ausencia de ciclos).
A categoria e persistida com referencia opcional ao parentCategoryId para compor a arvore de navegacao.

---

## Component Map

### Domain Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Entity | `Category` | Representa uma categoria dentro de uma vertical |
| Value Object | `CategoryId` | Identificador unico da categoria |
| Value Object | `CategoryName` | Nome validado e normalizado |
| Value Object | `CategoryCode` | Codigo UPPERCASE com `_` |
| Value Object | `CategoryDescription` | Descricao validada |
| Value Object | `VerticalId` | Identificador da vertical |
| Domain Service | `CategoryHierarchyService` | Valida profundidade e ciclos |
| Repository Interface | `CategoryRepository` | Persistencia e consultas de categoria |
| Repository Interface | `VerticalRepository` | Consulta existencia de vertical |

### Application Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| App Service | `CreateCategoryService` | Orquestra a criacao da categoria |
| Input DTO | `CreateCategoryInput` | Dados de entrada para criacao |
| Output DTO | `CreateCategoryOutput` | Dados retornados apos criacao |

### Infrastructure Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Repository Impl | `PrismaCategoryRepository` | Implementa `CategoryRepository` |
| Repository Impl | `PrismaVerticalRepository` | Implementa `VerticalRepository` |
| Mapper | `CategoryMapper` | Converte Domain <-> Prisma |

### Presentation Layer

| Tipo | Nome | Responsabilidade |
|------|------|------------------|
| Controller | `CategoryController` | Exposicao HTTP do caso de uso |

---

## Dependency Graph

```mermaid
graph TD
    subgraph Presentation
        CTRL[CategoryController]
    end

    subgraph Application
        SVC[CreateCategoryService]
        DTO_IN[CreateCategoryInput]
        DTO_OUT[CreateCategoryOutput]
    end

    subgraph Domain
        CAT[Category]
        VO_ID[CategoryId]
        VO_NAME[CategoryName]
        VO_CODE[CategoryCode]
        VO_DESC[CategoryDescription]
        VO_VERT[VerticalId]
        HIER[CategoryHierarchyService]
        CAT_REPO[CategoryRepository]
        VERT_REPO[VerticalRepository]
    end

    subgraph Infrastructure
        CAT_REPO_IMPL[PrismaCategoryRepository]
        VERT_REPO_IMPL[PrismaVerticalRepository]
        CAT_MAPPER[CategoryMapper]
        PRISMA[Prisma Client]
    end

    CTRL --> SVC
    CTRL --> DTO_IN
    SVC --> DTO_OUT
    SVC --> CAT
    SVC --> CAT_REPO
    SVC --> VERT_REPO
    SVC --> HIER
    CAT --> VO_ID
    CAT --> VO_NAME
    CAT --> VO_CODE
    CAT --> VO_DESC
    CAT --> VO_VERT
    CAT_REPO_IMPL -.->|implements| CAT_REPO
    VERT_REPO_IMPL -.->|implements| VERT_REPO
    CAT_REPO_IMPL --> CAT_MAPPER
    CAT_REPO_IMPL --> PRISMA
    VERT_REPO_IMPL --> PRISMA
```

---

## Data Flow

### Fluxo: Criar Category

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AppService
    participant CategoryRepo
    participant VerticalRepo
    participant HierarchySvc
    participant Category
    participant Database

    Client->>Controller: POST /attributes/categories
    Controller->>AppService: CreateCategoryInput

    AppService->>VerticalRepo: existsById(verticalId)
    VerticalRepo->>Database: SELECT
    Database-->>VerticalRepo: resultado

    AppService->>CategoryRepo: existsByNameAndVerticalId(name, verticalId)
    CategoryRepo->>Database: SELECT
    Database-->>CategoryRepo: resultado

    AppService->>CategoryRepo: existsByCodeAndVerticalId(code, verticalId)
    CategoryRepo->>Database: SELECT
    Database-->>CategoryRepo: resultado

    opt parentCategoryId informado
        AppService->>CategoryRepo: findById(parentCategoryId)
        CategoryRepo->>Database: SELECT
        Database-->>CategoryRepo: parentCategory
        AppService->>HierarchySvc: validateParent(parentCategory, verticalId)
        AppService->>CategoryRepo: getAncestry(parentCategoryId)
        CategoryRepo->>Database: SELECT recursive
        Database-->>CategoryRepo: ancestors
        HierarchySvc->>HierarchySvc: valida profundidade e ausencia de ciclo
    end

    AppService->>Category: Category.create(...)
    Category-->>AppService: Category valida

    AppService->>CategoryRepo: save(Category)
    CategoryRepo->>Database: INSERT
    Database-->>CategoryRepo: OK

    AppService-->>Controller: CreateCategoryOutput
    Controller-->>Client: 201 Created
```

**Transformacoes de dados:**

| Etapa | De | Para |
|-------|----|----- |
| Controller -> AppService | JSON body | CreateCategoryInput |
| AppService -> Domain | DTO | Category |
| Repository -> DB | Category | Prisma Model |

---

## Entity Structure

### Category

```mermaid
classDiagram
    class Category {
        -CategoryId id
        -VerticalId verticalId
        -CategoryId parentCategoryId
        -string name
        -string code
        -string description
        -number depth
        -Date createdAt
        -Date updatedAt
        +create() Category
        +getId() CategoryId
    }

    class CategoryId {
        -string value
    }

    Category *-- CategoryId
```

**Propriedades:**

| Propriedade | Tipo | Mutavel? | Regras |
|-------------|------|----------|--------|
| `id` | CategoryId | Nao | Gerado internamente |
| `verticalId` | VerticalId | Nao | Obrigatorio |
| `parentCategoryId` | CategoryId | Nao | Opcional, mesma vertical |
| `name` | string | Nao | Obrigatorio, unico por vertical |
| `code` | string | Nao | Obrigatorio, unico por vertical, UPPERCASE com `_` |
| `description` | string | Nao | Obrigatorio |
| `depth` | number | Nao | Calculado com base na hierarquia |
| `createdAt` | Date | Nao | Automatico |
| `updatedAt` | Date | Sim | Atualizado em mudancas futuras |

**Comportamentos:**

| Metodo | Regras |
|--------|--------|
| `create` | Valida code e aplica depth calculado |

---

## Repository Operations

| Operacao | Descricao | Usada por |
|----------|-----------|-----------|
| `VerticalRepository.existsById(id)` | Verifica existencia de vertical | CreateCategoryService |
| `CategoryRepository.existsByNameAndVerticalId(name, verticalId)` | Verifica duplicidade de nome | CreateCategoryService |
| `CategoryRepository.existsByCodeAndVerticalId(code, verticalId)` | Verifica duplicidade de codigo | CreateCategoryService |
| `CategoryRepository.findById(id)` | Busca categoria pai | CreateCategoryService |
| `CategoryRepository.getAncestry(id)` | Retorna cadeia de ancestrais | CreateCategoryService |
| `CategoryRepository.save(category)` | Persiste categoria | CreateCategoryService |

---

## Database Model

```mermaid
erDiagram
    VERTICALS {
        varchar(36) id PK
        varchar(100) name
    }

    CATEGORIES {
        varchar(36) id PK
        varchar(36) vertical_id FK
        varchar(36) parent_category_id FK
        varchar(100) name
        varchar(60) code
        varchar(255) description
        int depth
        timestamp created_at
        timestamp updated_at
    }

    VERTICALS ||--o{ CATEGORIES : has
    CATEGORIES ||--o{ CATEGORIES : parent_of
```

### Tabela: `categories`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `id` | VARCHAR(36) | PK |
| `vertical_id` | VARCHAR(36) | NOT NULL, FK(verticals.id) |
| `parent_category_id` | VARCHAR(36) | NULL, FK(categories.id) |
| `name` | VARCHAR(100) | NOT NULL |
| `code` | VARCHAR(60) | NOT NULL |
| `description` | VARCHAR(255) | NOT NULL |
| `depth` | INT | NOT NULL |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT now() |
| `updated_at` | TIMESTAMP | NULL |

---

## API Endpoints

| Metodo | Path | Operacao | Sucesso | Erros |
|--------|------|----------|---------|-------|
| POST | `/attributes/categories` | Criar categoria | 201 | 400, 404, 409 |

---

## Error Handling

```mermaid
flowchart LR
    V404[VerticalNotFoundError] --> H404[404 Not Found]
    P404[ParentCategoryNotFoundError] --> H404
    CODE409[CategoryCodeAlreadyExistsError] --> H409[409 Conflict]
    NAME409[CategoryNameAlreadyExistsError] --> H409
    CODE400[InvalidCategoryCodeError] --> H400[400 Bad Request]
    HIER400[InvalidCategoryHierarchyError] --> H400
    DEPTH400[CategoryDepthExceededError] --> H400
    VERT400[ParentCategoryDifferentVerticalError] --> H400
```

| Erro de Dominio | Quando Ocorre | HTTP Status | Codigo |
|-----------------|---------------|-------------|--------|
| `VerticalNotFoundError` | verticalId inexistente | 404 | `VERTICAL_NOT_FOUND` |
| `ParentCategoryNotFoundError` | parentCategoryId inexistente | 404 | `PARENT_CATEGORY_NOT_FOUND` |
| `CategoryCodeAlreadyExistsError` | Code ja cadastrado na vertical | 409 | `CATEGORY_CODE_ALREADY_EXISTS` |
| `CategoryNameAlreadyExistsError` | Name ja cadastrado na vertical | 409 | `CATEGORY_NAME_ALREADY_EXISTS` |
| `InvalidCategoryCodeError` | Formato de code invalido | 400 | `INVALID_CATEGORY_CODE` |
| `ParentCategoryDifferentVerticalError` | Categoria pai de outra vertical | 400 | `PARENT_CATEGORY_WRONG_VERTICAL` |
| `CategoryDepthExceededError` | Limite de profundidade excedido | 400 | `CATEGORY_DEPTH_EXCEEDED` |
| `InvalidCategoryHierarchyError` | Ciclo detectado na hierarquia | 400 | `CATEGORY_HIERARCHY_CYCLE` |

---

## Technical Decisions

### Decisao 1: Persistir depth para validacao rapida

**Contexto**: A hierarquia permite ate 3 niveis e exige validacao de profundidade.

**Decisao**: Persistir `depth` na tabela `categories` e calcular no momento da criacao.

**Justificativa**: Simplifica consultas e evita calculo recursivo frequente.

---

### Decisao 2: Validar hierarquia via ancestry

**Contexto**: O sistema deve impedir ciclos e validar pai na mesma vertical.

**Decisao**: O `CategoryHierarchyService` carrega a cadeia de ancestrais e valida vertical/ausencia de ciclos.

**Justificativa**: Centraliza regras de hierarquia e reduz logica no controller.

---

## Implementation Notes

- Validar `code` com regex de UPPERCASE e `_`.
- Garantir indices unicos em `categories.vertical_id + name` e `categories.vertical_id + code`.
- `depth` = 1 para categoria raiz; filhos incrementam baseado no pai.
- Rejeitar `parentCategoryId` quando a categoria pai pertence a outra vertical.

---
