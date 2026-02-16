# Prompt: Organização (Frontend)

Para **regras de negócio completas** (validações, condições, ordem das checagens), consulte **[regras-negocio-organizacao-user-frontend.md](./regras-negocio-organizacao-user-frontend.md)**.

**Endpoints:** Create `POST /api/organization/organizations`. List `GET /api/organization/organizations`. Get `GET /api/organization/organizations/:id`. Update `PUT /api/organization/organizations/:id` (apenas `tradeName`, `legalName`).

**Create:** Obrigatórios: `tradeName`, `documentType`, `documentNumber`. CNPJ exige `legalName`. Opcional: `ownerUserId`. **Verticais não são informadas** no Create — vincule depois via `POST /api/organization/organizations/:organizationId/verticals` (body: `{ "verticalCode": "CODE" }`). Desvincule via `DELETE /api/organization/organizations/:organizationId/verticals/:verticalCode`. Documento apenas dígitos (CPF 11, CNPJ 14). Erros: `LEGAL_NAME_REQUIRED`, `OWNER_USER_NOT_FOUND`, `USER_ALREADY_LINKED`, `DOCUMENT_ALREADY_EXISTS`, `INVALID_*`.
