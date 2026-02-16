# Cadastro de Organização, Usuário e Verticais

Base path usuários: `/api/organization/users`  
Base path organizações: `/api/organization/organizations`  
Base path verticais: `/api/organization/verticals`

Este documento descreve os fluxos de cadastro e os endpoints de organização. Para **regras de negócio completas** (validações, condições, ordem de checagens), consulte **[regras-negocio-organizacao-user-frontend.md](./regras-negocio-organizacao-user-frontend.md)**.

## Endpoints de Organização

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/organization/organizations` | Criar organização |
| GET | `/api/organization/organizations` | Listar organizações (paginação) |
| GET | `/api/organization/organizations/:id` | Obter organização por ID |
| PUT | `/api/organization/organizations/:id` | Editar organização (tradeName, legalName) |

**Pré-requisito:** As verticais são definidas no módulo de **Attributes** (fonte única). O cadastro de organização **não exige verticais**. Verticais são vinculadas e desvinculadas em endpoints separados (ver seção "Vincular e desvincular verticais").

---

## Fluxos possíveis

### Fluxo A: Cadastro mínimo (só organização)

1. `POST /api/organization/organizations` com `tradeName`, `legalName` (se CNPJ), `documentType`, `documentNumber`.
2. Sem `ownerUserId` — organização criada com status `PENDING_BUSINESS_UNIT`.
3. Verticais são vinculadas depois via `POST /api/organization/organizations/:organizationId/verticals`.

### Fluxo B: Organização + owner

1. `POST /api/organization/organizations` — criar organização **sem** owner (cadastro mínimo).
2. `POST /api/organization/users` — criar usuário vinculado à organização (com `organizationId` da etapa 1).
3. (Opcional) Criar organização já com `ownerUserId` em uma única chamada.

### Fluxo C: Vincular verticais

1. `GET /api/organization/verticals` — obter códigos válidos.
2. `POST /api/organization/organizations/:organizationId/verticals` — vincular vertical(s) à organização.
3. `DELETE /api/organization/organizations/:organizationId/verticals/:verticalCode` — desvincular vertical.

**Nota:** O Create User exige `organizationId` — o usuário é sempre vinculado a uma organização existente. O owner é definido no Create Organization (quando `ownerUserId` é informado), não no Create User. Verticais **não** são informadas no Create Organization; use os endpoints de link/unlink.

---

## List Verticals

`GET /api/organization/verticals`

Retorna as verticais ativas (fonte: módulo **Attributes**). Uso típico: popular select/checkboxes no formulário de cadastro; o **`code`** de cada item é enviado ao vincular verticais via `POST /api/organization/organizations/:organizationId/verticals`.

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "code": "RESTAURANTS",
        "name": "Restaurantes",
        "description": "Vertical de restaurantes"
      },
      {
        "code": "MARKET",
        "name": "Mercado",
        "description": "Vertical de mercado"
      }
    ]
  }
}
```

Endpoint público; não exige autenticação. Os itens não incluem `id`; o identificador de referência é o **`code`**.

---

## Create User

`POST /api/organization/users`

O usuário deve ser **obrigatoriamente** vinculado a uma organização. `organizationId` é obrigatório.

**Regra de negócio:** Um usuário não pode fazer parte de mais de uma organização. Na criação não se informa se é owner — apenas vinculamos à organização. Owner é definido no Create Organization.

Request body:
```json
{
  "firstName": "Maria",
  "lastName": "Silva",
  "documentType": "CPF",
  "documentNumber": "12345678901",
  "email": "maria.silva@example.com",
  "phoneNumber": "5511999999999",
  "emailOptIn": true,
  "phoneOptIn": true,
  "organizationId": "uuid-da-organizacao"
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "uuid-do-usuario",
    "firstName": "Maria",
    "lastName": "Silva",
    "documentType": "CPF",
    "documentNumber": "12345678901",
    "email": "maria.silva@example.com",
    "phoneNumber": "5511999999999",
    "emailOptIn": true,
    "phoneOptIn": true,
    "status": "ORG_LINKED",
    "organizationId": "uuid-da-organizacao",
    "createdAt": "2026-02-16T12:00:00.000Z"
  }
}
```

Possible errors:
- `ORGANIZATION_ID_REQUIRED` (organizationId ausente ou vazio)
- `ORGANIZATION_NOT_FOUND`
- `DOCUMENT_ALREADY_EXISTS`
- `EMAIL_ALREADY_EXISTS`
- `PHONE_ALREADY_EXISTS`
- `INVALID_DOCUMENT`, `INVALID_DOCUMENT_TYPE`, `INVALID_EMAIL`, `INVALID_PHONE`

---

## Create Organization

`POST /api/organization/organizations`

Cadastro apenas com dados da organização. **Não exige verticais**; verticais são vinculadas depois em endpoints separados.

**Regras de negócio:** CNPJ exige `legalName`. Documento único entre users e organizations. Se `ownerUserId` informado: usuário deve existir e não estar vinculado.

Request body (cadastro mínimo):
```json
{
  "tradeName": "Minha Loja",
  "legalName": "Minha Loja LTDA",
  "documentType": "CNPJ",
  "documentNumber": "12345678000199"
}
```

Request body (com owner):
```json
{
  "tradeName": "Minha Loja",
  "legalName": "Minha Loja LTDA",
  "documentType": "CNPJ",
  "documentNumber": "12345678000199",
  "ownerUserId": "uuid-do-usuario"
}
```

- `legalName`: opcional para CPF; **obrigatório** para CNPJ.
- `ownerUserId`: opcional. Se informado: usuário deve existir e não estar vinculado.

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "uuid-da-organizacao",
    "tradeName": "Minha Loja",
    "legalName": "Minha Loja LTDA",
    "documentType": "CNPJ",
    "documentNumber": "12345678000199",
    "ownerUserId": "uuid-do-usuario",
    "status": "PENDING_BUSINESS_UNIT",
    "createdAt": "2026-02-16T12:00:00.000Z"
  }
}
```

`ownerUserId` pode vir como `null` quando não informado.

Possible errors:
- `LEGAL_NAME_REQUIRED` (CNPJ sem legalName)
- `OWNER_USER_NOT_FOUND`, `USER_ALREADY_LINKED`
- `DOCUMENT_ALREADY_EXISTS`
- `INVALID_DOCUMENT`, `INVALID_DOCUMENT_TYPE`

---

## List Organizations

`GET /api/organization/organizations`

Lista organizações com paginação. Query params: `page` (default 1), `pageSize` (default 20, máx 100), `sortDirection` (`asc` ou `desc`).

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "page": 1,
    "pageSize": 20,
    "totalItems": 10,
    "totalPages": 1
  }
}
```

---

## Get Organization (visualização por ID)

`GET /api/organization/organizations/{organizationId}`

Retorna a organização com dados básicos. Query param opcional `include` para incluir relacionamentos (ex.: `?include=businessUnits,users`).

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "uuid-da-organizacao",
    "tradeName": "Minha Loja",
    "legalName": "Minha Loja LTDA",
    "documentType": "CNPJ",
    "documentNumber": "12345678000199",
    "ownerUserId": "uuid-do-usuario",
    "status": "PENDING_BUSINESS_UNIT",
    "verticals": [
      { "code": "RESTAURANTS", "name": "Restaurantes", "description": "Vertical de restaurantes" },
      { "code": "MARKET", "name": "Mercado", "description": "Vertical de mercado" }
    ],
    "createdAt": "2026-02-16T12:00:00.000Z"
  }
}
```

Possible errors:
- `ORGANIZATION_NOT_FOUND`
- `INVALID_ORGANIZATION_ID`

---

## Update Organization (edição)

`PUT /api/organization/organizations/{organizationId}`

Edita organização. Apenas `tradeName` e `legalName` são editáveis. CNPJ não pode ter `legalName` vazio.

Request body (campos opcionais; enviar apenas o que deseja alterar):
```json
{
  "tradeName": "Novo Nome Fantasia",
  "legalName": "Nova Razão Social LTDA"
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "uuid-da-organizacao",
    "tradeName": "Novo Nome Fantasia",
    "legalName": "Nova Razão Social LTDA",
    "documentType": "CNPJ",
    "documentNumber": "12345678000199",
    "ownerUserId": null,
    "verticalCodes": ["RESTAURANTS", "MARKET"],
    "status": "PENDING_BUSINESS_UNIT",
    "createdAt": "2026-02-16T12:00:00.000Z",
    "updatedAt": "2026-02-16T14:00:00.000Z"
  }
}
```

Nota: `verticalCodes` no response reflete as verticais vinculadas à organização (via POST/DELETE em `/verticals`).

Possible errors:
- `ORGANIZATION_NOT_FOUND`
- `LEGAL_NAME_REQUIRED` (CNPJ com legalName vazio)

---

## Vincular e desvincular verticais

### Vincular vertical

`POST /api/organization/organizations/{organizationId}/verticals`

Operação de **gestão de plataforma**. Não exige owner na organização.

Request body:
```json
{
  "verticalCode": "RESTAURANTS"
}
```

Vincula uma vertical à organização. O `verticalCode` deve existir no catálogo (`GET /api/organization/verticals`).

### Desvincular vertical

`DELETE /api/organization/organizations/{organizationId}/verticals/{verticalCode}`

Operação de **gestão de plataforma**. Remove o vínculo da vertical com a organização. Não exige owner.

### Listar verticais da organização

`GET /api/organization/organizations/{organizationId}/verticals`

Lista as verticais vinculadas à organização (as que foram vinculadas via POST). Útil para conferir o vínculo após o cadastro.

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "code": "RESTAURANTS",
        "name": "Restaurantes",
        "description": "Vertical de restaurantes",
        "status": "ACTIVE"
      }
    ]
  }
}
```

---

## Business Unit (BU)

O primeiro cadastro de **Business Unit** é obrigatório para a organização sair do status `PENDING_BUSINESS_UNIT`. Regras atuais:

- **Quem pode criar BU:** apenas a **plataforma** (sistema). O **owner** da organização não pode criar BU pela API; se o `actorUserId` for o mesmo que o `ownerUserId` da organização, a API retorna erro `OWNER_CANNOT_CREATE_BUSINESS_UNIT`.
- **Limite de BUs:** atualmente **1 Business Unit por organização**. Ao atingir o limite, a API retorna `BUSINESS_UNIT_LIMIT_REACHED`. O modelo permite evoluir para um limite configurável no futuro.

Create Business Unit usa **`verticalCodes`** (códigos que devem estar entre as verticais ativas da organização).

---

## Resumo – Funcionalidade completa

- **Regras de negócio:** Consulte [regras-negocio-organizacao-user-frontend.md](./regras-negocio-organizacao-user-frontend.md) para validações, condições e ordem das checagens.
- **Organização:** Create (POST), List (GET), Get by ID (GET), Update (PUT). Update edita apenas `tradeName` e `legalName`.
- **List Verticals** (`GET /api/organization/verticals`): obtém verticais ativas; use o **`code`** ao vincular via POST.
- **Create User**: `organizationId` obrigatório; usuário sempre vinculado a uma organização; não define owner.
- **Create Organization**: cadastro apenas com dados da organização; **não exige verticais**; CNPJ exige `legalName`.
- **Verticais**: POST para vincular, DELETE para desvincular, GET para listar; endpoints em `/api/organization/organizations/:organizationId/verticals`.
- **Create Business Unit**: apenas a plataforma pode criar; limite de 1 BU por organização.
