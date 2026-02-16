# Prompt: Criação de Usuário (Frontend)

Para **regras de negócio completas** (validações, condições, ordem das checagens), consulte **[regras-negocio-organizacao-user-frontend.md](./regras-negocio-organizacao-user-frontend.md)**.

Resumo: `POST /api/organization/users`. `organizationId` obrigatório. Usuário sempre vinculado a uma organização; um usuário não pode estar em mais de uma. Na criação não se informa owner — apenas vinculamos. Campos: `firstName`, `lastName`, `documentType`, `documentNumber`, `email`, `phoneNumber`, `emailOptIn`, `phoneOptIn`, `organizationId`. Documento apenas dígitos (CPF 11, CNPJ 14). Erros: `ORGANIZATION_ID_REQUIRED`, `ORGANIZATION_NOT_FOUND`, `DOCUMENT_ALREADY_EXISTS`, `EMAIL_ALREADY_EXISTS`, `PHONE_ALREADY_EXISTS`, `INVALID_*`.
