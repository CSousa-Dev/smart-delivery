# Cadastro de Organização e Owner – MVP

## O que já está implementado

### Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| **POST** | `/api/organization/users` | Criar usuário (`organizationId` obrigatório) |
| **GET**  | `/api/organization/users` | Listar usuários |
| **GET**  | `/api/organization/users/:id` | Obter usuário por ID (com middleware de acesso) |
| **POST** | `/api/organization/organizations` | Criar organização (owner e verticais opcionais) |
| **GET**  | `/api/organization/organizations` | Listar organizações (paginação) |
| **GET**  | `/api/organization/organizations/:id` | Obter organização por ID |
| **PUT**  | `/api/organization/organizations/:id` | Editar organização (tradeName, legalName) |

### Fluxo atual para “cadastrar organização + owner”

1. **Criar a organização** (cadastro mínimo)  
   `POST /api/organization/organizations`  
   Body: `tradeName`, `legalName` (obrigatório se CNPJ), `documentType`, `documentNumber`. Opcional: `ownerUserId`. **Verticais não são informadas** no Create; vincule depois via `POST /api/organization/organizations/:id/verticals` (body: `{ "verticalCode": "CODE" }`).

2. **Criar o usuário vinculado**  
   `POST /api/organization/users`  
   Body: `firstName`, `lastName`, `documentType`, `documentNumber`, `email`, `phoneNumber`, `emailOptIn`, `phoneOptIn`, **`organizationId`** (id da organização).  
   O usuário é sempre vinculado a uma organização.

3. **Editar organização** (se necessário)  
   `PUT /api/organization/organizations/:id` — apenas `tradeName` e `legalName`.

Verticais: `GET /api/organization/verticals`. Documentação em `docs/organization/`.

---

## Lacunas para o MVP

1. **Listagem e vínculo de verticais**  
   O `CreateOrganization` **não** aceita verticais. Verticais são vinculadas em endpoints separados (gestão de plataforma): `POST /api/organization/organizations/:id/verticals` (body: `{ "verticalCode": "CODE" }`) e `DELETE /api/organization/organizations/:id/verticals/:verticalCode`. O endpoint `GET /api/organization/verticals` (público) retorna as verticais ativas do módulo Attributes; use o campo `code` ao vincular.

2. **Autenticação / identidade do owner**  
   O módulo de **auth** apenas **valida** token (ex.: JWT) e retorna `userId`. A collection Postman de auth referencia `POST /api/identity/users` (“Create Identity User”), que **não está ligada ao app** (comentário na collection: “not wired in app yet”). Ou seja:
   - O **User** do módulo organization (tabela `users`) é o “perfil” (nome, documento, email, telefone, vínculo com organização).
   - Quem faz o login (e emite o token) é outro sistema (Identity). Para o owner “acessar a plataforma”, é necessário que o `userId` do token seja o mesmo `User.id` do módulo organization (ou que exista um mapeamento).

3. **Collection Postman**  
   A collection `organization.postman_collection.json` tem só **Create User**. Falta exemplo de **Create Organization** (e, se fizer sentido, de listagem de verticais).

---

## Caminhos possíveis a partir daqui

### Opção A – Liberar só o cadastro (sem login no MVP)

- **Frontend (ou integrador)**:
  1. `POST /api/organization/organizations` com dados da organização (cadastro mínimo).
  2. `POST /api/organization/users` com dados do usuário + `organizationId`.
  3. (Opcional) `GET /api/organization/verticals` e `PUT /api/organization/organizations/:id` ou link de verticais.
- **Backend**: verticais vêm do módulo Attributes; Organization não possui tabela própria de verticais.

### Opção B – Endpoint para listar verticais (implementado)

- **Backend** (módulo organization):
  - `GET /api/organization/verticals` (público) retorna verticais ativas do módulo Attributes (via port/adapter).
  - O frontend usa o **`code`** de cada item ao vincular via `POST /api/organization/organizations/:id/verticals`.

### Opção C – Verticais vindos do módulo de atributos (implementado)

- O módulo de **attributes** é a **fonte única** de verticais. O módulo organization expõe `GET /api/organization/verticals` delegando ao catálogo (Attributes); o frontend vincula verticais via `POST /api/organization/organizations/:id/verticals`.

### Opção D – Unificar “cadastro organização + owner” em uma única chamada (UX)

- **Backend**: novo endpoint (ex.: `POST /api/organization/signup` ou `POST /api/organization/organizations/with-owner`) que receba em um único body:
  - dados do **owner** (nome, documento, email, telefone, etc.);
  - dados da **organização** (tradeName, legalName, documentType, documentNumber, verticalIds).
- Internamente: criar usuário e em seguida criar organização com `ownerUserId` (em transação). Isso simplifica o fluxo no frontend e evita expor “criar usuário solto” se não for desejado.

### Opção E – Login do owner (pós-MVP ou MVP estendido)

- Integrar o **Identity** (ou o provedor de login que for usar) com o módulo organization:
  - Ao criar o usuário owner (ou ao “registrar” no Identity), garantir que o identificador do Identity (ex.: `sub` do JWT) seja o mesmo que o `User.id` no módulo organization, **ou** manter um mapeamento (ex.: tabela `user_identity_links`: `organization_user_id` ↔ `identity_provider_id`).
- Nas rotas protegidas, usar o `userId` resolvido (do token + mapeamento) para acessar organização e business units (o middleware de access control já usa `userId`).

---

## Recomendações práticas para “liberar” o cadastro no MVP

1. **Imediato**
   - Documentar o fluxo em duas chamadas (Create User → Create Organization) no README ou em `docs/`.
   - Adicionar à Postman collection **Create Organization** (e variáveis/script para usar o `id` retornado em Create User como `ownerUserId`). Verticais via endpoints de link/unlink.
   - Verticais vêm do módulo Attributes; Organization não possui tabela `verticals`. **Business Unit:** apenas a plataforma pode criar BU (não o owner); limite de 1 BU por organização.

2. **Curto prazo**
   - Implementar **Opção B** (`GET /api/organization/verticals`) para o formulário de cadastro poder listar verticais sem depender de outro sistema ou IDs fixos.
   - (Opcional) Implementar **Opção D** (um único endpoint “cadastro com owner”) se quiser simplificar o contrato para o frontend.

3. **Quando for necessário login**
   - Alinhar Identity com o `User.id` do módulo organization (ou mapeamento) e usar o auth atual (verificação de token + `userId`) nas rotas já protegidas.

Se quiser, posso detalhar a implementação de uma das opções (por exemplo B ou D) passo a passo no código deste repositório.
