# Guia Frontend – Módulo Organização

Este documento é o **ponto de entrada** para o frontend consumir os endpoints de organização, usuário e verticais. Base path: `/api/organization`.

---

## Visão geral

| Recurso | Endpoints | Observação |
|---------|-----------|------------|
| **Organização** | POST, GET, List, PUT | Cadastro sem verticais; verticais via link/unlink |
| **Usuário** | POST, GET, List | `organizationId` obrigatório |
| **Verticais** | GET (catálogo), POST/DELETE/GET (por organização) | Gestão de plataforma |

---

## Fluxo de cadastro

### 1. Criar organização

`POST /api/organization/organizations`

**Body (mínimo):**
```json
{
  "tradeName": "Minha Loja",
  "legalName": "Minha Loja LTDA",
  "documentType": "CNPJ",
  "documentNumber": "12345678000199"
}
```

- **Obrigatórios:** `tradeName`, `documentType`, `documentNumber`
- **CNPJ exige** `legalName`
- **Opcional:** `ownerUserId` (UUID de usuário já criado)
- **Verticais:** não são informadas aqui; vincule depois

**Response 201:** `id`, `tradeName`, `legalName`, `documentType`, `documentNumber`, `ownerUserId`, `status`, `createdAt`

**Erros:** `LEGAL_NAME_REQUIRED`, `OWNER_USER_NOT_FOUND`, `USER_ALREADY_LINKED`, `DOCUMENT_ALREADY_EXISTS`, `INVALID_DOCUMENT`, `INVALID_DOCUMENT_TYPE`

---

### 2. Criar usuário

`POST /api/organization/users`

**Body:**
```json
{
  "firstName": "Maria",
  "lastName": "Silva",
  "documentType": "CPF",
  "documentNumber": "12345678901",
  "email": "maria@example.com",
  "phoneNumber": "5511999999999",
  "emailOptIn": true,
  "phoneOptIn": true,
  "organizationId": "uuid-da-organizacao"
}
```

- **`organizationId` obrigatório** — usuário sempre vinculado a uma organização
- Um usuário não pode estar em mais de uma organização
- Owner é definido no Create Organization (quando `ownerUserId` é informado), não aqui

**Erros:** `ORGANIZATION_ID_REQUIRED`, `ORGANIZATION_NOT_FOUND`, `DOCUMENT_ALREADY_EXISTS`, `EMAIL_ALREADY_EXISTS`, `PHONE_ALREADY_EXISTS`, `INVALID_*`

---

### 3. Vincular verticais (gestão de plataforma)

Verticais são vinculadas e desvinculadas em endpoints separados. **Não exige owner** na organização.

**Vincular:** `POST /api/organization/organizations/:organizationId/verticals`
```json
{ "verticalCode": "RESTAURANTS" }
```

**Desvincular:** `DELETE /api/organization/organizations/:organizationId/verticals/:verticalCode`

**Listar verticais da organização:** `GET /api/organization/organizations/:organizationId/verticals`

**Catálogo de verticais (para popular selects):** `GET /api/organization/verticals` — retorna `items` com `code`, `name`, `description`. Use o `code` ao vincular.

---

## Outros endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/organization/organizations` | Listar organizações (paginação: `page`, `pageSize`, `sortDirection`) |
| GET | `/api/organization/organizations/:id` | Obter organização por ID (`?include=businessUnits,users`) |
| PUT | `/api/organization/organizations/:id` | Editar `tradeName` e `legalName` |

---

## Documentação detalhada

- **[regras-negocio-organizacao-user-frontend.md](./regras-negocio-organizacao-user-frontend.md)** — Regras de negócio, validações, ordem das checagens
- **[cadastro-organizacao-owner-vertical.md](./cadastro-organizacao-owner-vertical.md)** — Fluxos completos, exemplos de request/response
- **[prompt-criacao-organizacao-frontend.md](./prompt-criacao-organizacao-frontend.md)** — Resumo rápido: organização
- **[prompt-criacao-usuario-frontend.md](./prompt-criacao-usuario-frontend.md)** — Resumo rápido: usuário
