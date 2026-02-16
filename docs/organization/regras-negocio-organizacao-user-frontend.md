# Regras de Negócio – Organização e Usuário (Frontend)

Este documento descreve as **regras de negócio** que o frontend deve respeitar ao consumir os endpoints de criação de organização e usuário. Não se trata apenas dos campos, mas da **lógica**, **validações**, **condições** e **comportamento esperado**.

Base path: `/api/organization`

---

## Create User – Regras de Negócio

**Endpoint:** `POST /api/organization/users`

### Regra 1: Usuário obrigatoriamente vinculado a organização

- `organizationId` é **obrigatório**.
- O usuário **sempre** é criado vinculado a uma organização.
- Não existe fluxo de "usuário solto" — todo usuário pertence a exatamente uma organização.

**Validação:** Se `organizationId` estiver ausente, vazio ou apenas espaços → erro `ORGANIZATION_ID_REQUIRED` (400).

### Regra 2: Um usuário, uma organização

- Um usuário **não pode** fazer parte de mais de uma organização.
- O vínculo é 1:1 (um usuário ↔ uma organização).
- Na criação, não se informa se o usuário é owner ou não — apenas vinculamos à organização.
- **Owner** é definido no Create Organization, não no Create User.

### Regra 3: Organização deve existir

- Antes de criar o usuário, o backend valida se a organização existe.
- Se `organizationId` não corresponder a nenhuma organização → erro `ORGANIZATION_NOT_FOUND` (404).

### Regra 4: Documento único (users + organizations)

- O `documentNumber` não pode existir em **nenhum usuário** nem em **nenhuma organização**.
- CPF e CNPJ compartilham o mesmo espaço de unicidade.
- Se o documento já estiver cadastrado → erro `DOCUMENT_ALREADY_EXISTS` (409).

### Regra 5: Formato do documento

- Apenas **dígitos** (sem pontuação).
- **CPF:** exatamente 11 dígitos.
- **CNPJ:** exatamente 14 dígitos.
- `documentType` deve ser exatamente `"CPF"` ou `"CNPJ"`.
- Formato inválido → `INVALID_DOCUMENT` ou `INVALID_DOCUMENT_TYPE` (400).

### Regra 6: Email e telefone únicos

- `email` e `phoneNumber` devem ser únicos no sistema.
- Duplicados → `EMAIL_ALREADY_EXISTS` ou `PHONE_ALREADY_EXISTS` (409).
- Formato inválido → `INVALID_EMAIL` ou `INVALID_PHONE` (400).

### Ordem das validações (backend)

1. `organizationId` obrigatório
2. Organização existe
3. Documento único (users + organizations)
4. Email único
5. Telefone único
6. Criação do usuário e do vínculo (com `isOwner: false`)

### Campos obrigatórios

| Campo | Tipo | Regra |
|-------|------|-------|
| `firstName` | string | Obrigatório |
| `lastName` | string | Obrigatório |
| `documentType` | string | `"CPF"` ou `"CNPJ"` |
| `documentNumber` | string | Apenas dígitos; CPF 11, CNPJ 14 |
| `email` | string | Formato válido; único |
| `phoneNumber` | string | Apenas dígitos; até 15; único |
| `emailOptIn` | boolean | Obrigatório |
| `phoneOptIn` | boolean | Obrigatório |
| `organizationId` | string (UUID) | Obrigatório; organização deve existir |

### Response de sucesso (201)

- `status` sempre `"ORG_LINKED"`.
- `organizationId` sempre preenchido (o informado no request).

---

## Create Organization – Regras de Negócio

**Endpoint:** `POST /api/organization/organizations`

### Regra 1: Cadastro apenas com dados da organização

- É possível cadastrar **apenas** a organização (sem owner).
- `ownerUserId` é **opcional**.
- **Verticais não são informadas** no Create Organization — use os endpoints de link/unlink para vincular e desvincular verticais depois.

### Regra 2: CNPJ exige razão social

- Se `documentType` = `"CNPJ"` → `legalName` é **obrigatório**.
- Se `documentType` = `"CPF"` → `legalName` é opcional.
- CNPJ sem `legalName` → erro `LEGAL_NAME_REQUIRED` (400).

### Regra 3: Documento único (users + organizations)

- O `documentNumber` não pode existir em **nenhum usuário** nem em **nenhuma organização**.
- Duplicado → erro `DOCUMENT_ALREADY_EXISTS` (409).

### Regra 4: Formato do documento

- Apenas **dígitos**.
- **CPF:** 11 dígitos. **CNPJ:** 14 dígitos.
- `documentType` exatamente `"CPF"` ou `"CNPJ"`.
- Inválido → `INVALID_DOCUMENT` ou `INVALID_DOCUMENT_TYPE` (400).

### Regra 5: Owner (quando informado)

- Se `ownerUserId` for informado:
  - O usuário **deve existir** → senão `OWNER_USER_NOT_FOUND` (404).
  - O usuário **não pode** estar vinculado a outra organização → senão `USER_ALREADY_LINKED` (409).
- Se `ownerUserId` for omitido ou null → organização é criada sem owner.

### Regra 6: Verticais

- Verticais **não** são informadas no Create Organization.
- Use `POST /api/organization/organizations/:organizationId/verticals` para vincular e `DELETE /api/organization/organizations/:organizationId/verticals/:verticalCode` para desvincular.

### Regra 7: Efeitos ao criar com owner

- Organização criada com status `PENDING_BUSINESS_UNIT`.
- Usuário owner é vinculado com `isOwner: true`.
- Status do usuário owner passa a `ACTIVE`.

### Ordem das validações (backend)

1. Formato do documento (documentType + documentNumber)
2. Se owner informado: owner existe e não está vinculado
3. Documento único (users + organizations)
4. Se CNPJ: legalName obrigatório (na criação da entidade)
5. Criação da organização e, se aplicável, do vínculo owner

### Campos

| Campo | Obrigatório | Regra |
|-------|-------------|-------|
| `tradeName` | Sim | Nome fantasia |
| `legalName` | Condicional | Obrigatório se CNPJ |
| `documentType` | Sim | `"CPF"` ou `"CNPJ"` |
| `documentNumber` | Sim | Apenas dígitos; único |
| `ownerUserId` | Não | Se informado: usuário existe e não vinculado |

### Response de sucesso (201)

- `status` sempre `"PENDING_BUSINESS_UNIT"`.
- `ownerUserId` pode ser `null`.

---

## List Organizations – Regras de Negócio

**Endpoint:** `GET /api/organization/organizations`

- Lista organizações com paginação.
- Query params: `page` (default 1), `pageSize` (default 20, máx 100), `sortDirection` (`asc` ou `desc`, default `desc`).
- Response inclui `items`, `page`, `pageSize`, `totalItems`, `totalPages`.

---

## Get Organization – Regras de Negócio

**Endpoint:** `GET /api/organization/organizations/:id`

- Retorna organização por ID.
- Query param opcional `include`: `businessUnits`, `users` (ex.: `?include=businessUnits,users`).
- Organização inexistente → `ORGANIZATION_NOT_FOUND` (404).
- ID inválido (não UUID) → `INVALID_ORGANIZATION_ID` (400).

---

## Update Organization – Regras de Negócio

**Endpoint:** `PUT /api/organization/organizations/:id`

### Regra 1: Campos editáveis

- Apenas `tradeName` e `legalName` podem ser editados.
- `documentType`, `documentNumber`, `ownerUserId` e verticais **não** são alteráveis por este endpoint.

### Regra 2: CNPJ exige razão social

- Se a organização for CNPJ → `legalName` não pode ser removido (não pode ficar vazio/null).
- Tentativa de limpar `legalName` em organização CNPJ → `LEGAL_NAME_REQUIRED` (400).

### Regra 3: Organização deve existir

- Organização inexistente → `ORGANIZATION_NOT_FOUND` (404).

### Campos

| Campo | Obrigatório | Regra |
|-------|-------------|-------|
| `tradeName` | Não | Se informado: atualiza nome fantasia |
| `legalName` | Não | Se informado: atualiza razão social; CNPJ não pode ficar sem |

### Response de sucesso (200)

- Retorna organização atualizada (mesmo formato do Create/Get).

### Erros

- `ORGANIZATION_NOT_FOUND` (404)
- `LEGAL_NAME_REQUIRED` (400) — CNPJ com legalName vazio

---

## Endpoints auxiliares: Verticais

**Listar verticais (catálogo):** `GET /api/organization/verticals`

- Retorna verticais ativas (fonte: módulo Attributes).
- Use o campo **`code`** ao vincular via POST.
- Público; não exige autenticação.

**Vincular vertical à organização:** `POST /api/organization/organizations/:organizationId/verticals`

- Body: `{ "verticalCode": "RESTAURANTS" }`.
- Operação de **gestão de plataforma**; não exige owner na organização.

**Desvincular vertical:** `DELETE /api/organization/organizations/:organizationId/verticals/:verticalCode`

- Operação de **gestão de plataforma**; não exige owner na organização.

**Listar verticais da organização:** `GET /api/organization/organizations/:organizationId/verticals`

---

## Resumo – O que o frontend deve garantir

### Create User

- Sempre enviar `organizationId` válido (organização já existente).
- Validar documento (apenas dígitos, tamanho correto).
- Não existe conceito de owner no Create User — apenas vínculo à organização.

### Create Organization

- Se CNPJ → exigir `legalName` no formulário.
- Se enviar `ownerUserId` → garantir que o usuário existe e não está vinculado.
- Permitir cadastro mínimo: só `tradeName`, `documentType`, `documentNumber` (+ `legalName` se CNPJ).
- Verticais: vincular/desvincular via `POST` e `DELETE` em `/api/organization/organizations/:organizationId/verticals`.

### List / Get / Update Organization

- **List:** `GET /api/organization/organizations` — paginação via `page`, `pageSize`, `sortDirection`.
- **Get:** `GET /api/organization/organizations/:id` — opcional `?include=businessUnits,users`.
- **Update:** `PUT /api/organization/organizations/:id` — apenas `tradeName` e `legalName`; CNPJ não pode ter `legalName` vazio.
