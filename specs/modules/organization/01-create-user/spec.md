# Capability: Create User

**Created**: 2026-01-08  
**Project**: `specs/project.md`

---

<!--
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║  SPEC DE NEGÓCIO - Define O QUÊ a capability faz                          ║
  ║                                                                           ║
  ║  Este documento é agnóstico de tecnologia. Decisões técnicas              ║
  ║  ficam no design.md da capability.                                        ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
-->

## User Stories

### User Story 1 - Create user for seller onboarding (P1)

Como **pessoa interessada em vender pela plataforma**,  
quero **criar meu usuário com dados pessoais e de contato**,  
para **iniciar o onboarding e, quando aplicável, me vincular a uma organização**.

**Por que P1**: Sem a criação do usuário não é possível iniciar o fluxo de onboarding.

#### Acceptance Criteria

```gherkin
Scenario: Criar usuário sem organização vinculada
  Given que não existe usuário com o mesmo documento, email ou celular
  When o usuário é criado sem informar organizationId
  Then o usuário deve ser criado com status PENDING_ORG_LINK
  And o usuário não deve possuir vínculo com organização

Scenario: Criar usuário já vinculado a uma organização existente
  Given que a organização informada existe
  And que não existe usuário com o mesmo documento, email ou celular
  When o usuário é criado informando organizationId
  Then o usuário deve ser criado com status ORG_LINKED
  And o usuário deve ficar vinculado à organização sem papel definido

Scenario: Rejeitar criação com organizationId inexistente
  Given que a organização informada não existe
  When o usuário é criado informando organizationId
  Then a criação deve ser rejeitada
  And o sistema deve informar que a organização especificada não existe

Scenario: Rejeitar criação com documento já cadastrado
  Given que já existe um usuário ou organização com o mesmo documento
  When o usuário é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o documento já está cadastrado

Scenario: Rejeitar criação com email já cadastrado
  Given que já existe um usuário com o mesmo email
  When o usuário é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o email já está cadastrado

Scenario: Rejeitar criação com celular já cadastrado
  Given que já existe um usuário com o mesmo celular
  When o usuário é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o celular já está cadastrado

Scenario: Rejeitar criação com documento inválido
  Given que o tipo de documento é CPF ou CNPJ
  When o documento informado não possui a quantidade de dígitos exigida
  Then a criação deve ser rejeitada
  And o sistema deve informar que o documento é inválido
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um usuário com: nome, sobrenome, tipo de documento, documento, email, celular e preferências de comunicação.
- **FR-002**: O `organizationId` **PODE** ser informado durante a criação do usuário.
- **FR-003**: Se `organizationId` for informado e a organização existir, o sistema **DEVE** criar o vínculo usuário-organização sem papel definido.
- **FR-004**: Se `organizationId` for informado e a organização não existir, o sistema **DEVE** rejeitar a criação e informar que a organização especificada não existe.
- **FR-005**: Se `organizationId` não for informado, o usuário **DEVE** iniciar com status `PENDING_ORG_LINK`.
- **FR-006**: Se `organizationId` for informado, o usuário **DEVE** iniciar com status `ORG_LINKED`.
- **FR-007**: Um usuário **DEVE** estar vinculado a apenas uma organização.
- **FR-008**: O documento do usuário **DEVE** conter apenas dígitos.
- **FR-009**: O tipo de documento do usuário **DEVE** ser um valor válido entre `CPF` e `CNPJ`.
- **FR-010**: O documento do usuário **DEVE** ter 11 dígitos para `CPF` e 14 dígitos para `CNPJ`.
- **FR-011**: O documento do usuário **DEVE** ser único no contexto de Organization, não podendo existir em usuários ou organizações.
- **FR-012**: O email do usuário **DEVE** ser único entre usuários.
- **FR-013**: O email do usuário **DEVE** possuir formato válido.
- **FR-014**: O celular do usuário **DEVE** ser único entre usuários.
- **FR-015**: O celular do usuário **DEVE** conter apenas dígitos e ter no máximo 15 caracteres.
- **FR-016**: As preferências de comunicação por email e celular **DEVEM** ser informadas no momento da criação.
- **FR-017**: O status do usuário **NÃO DEVE** ser informado pelo usuário e **DEVE** ser definido pela aplicação.
- **FR-018**: O sistema **NÃO DEVE** atribuir papel/role ao usuário no momento do vínculo com a organização.

---

## Entity

### User

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do usuário | Obrigatório, único |
| `firstName` | Nome do usuário | Obrigatório |
| `lastName` | Sobrenome do usuário | Obrigatório |
| `documentType` | Tipo do documento | Obrigatório, valores: `CPF`, `CNPJ` |
| `documentNumber` | Documento do usuário | Obrigatório, somente dígitos, 11 (CPF) ou 14 (CNPJ), único entre usuários e organizações |
| `email` | Email do usuário | Obrigatório, formato válido, único |
| `phoneNumber` | Celular do usuário | Obrigatório, somente dígitos, máximo 15 caracteres, único |
| `emailOptIn` | Preferência de comunicação por email | Obrigatório |
| `phoneOptIn` | Preferência de comunicação por celular | Obrigatório |
| `statusId` | Identificador do status | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Status permitidos**:

- `PENDING_ORG_LINK`: Usuário criado sem vínculo com organização
- `ORG_LINKED`: Usuário vinculado a organização sem papel definido
- `ACTIVE`: Usuário apto a operar como owner de uma organização


### UserOrganizationLink

| Campo | Descrição | Regras |
| --- | --- | --- |
| `userId` | Usuário vinculado | Obrigatório |
| `organizationId` | Organização vinculada | Obrigatório |
| `isOwner` | Indica se o usuário é owner | Obrigatório, default `false` |

**Relacionamentos**: Um usuário pode estar vinculado a apenas uma organização.

---

## Success Criteria

- **SC-001**: 100% dos usuários criados possuem status inicial coerente com a presença de `organizationId`.
- **SC-002**: 100% das tentativas de criação com documento, email ou celular duplicados são rejeitadas.
- **SC-003**: 100% dos usuários criados possuem preferências de comunicação registradas.

---

## Glossary

| Termo | Definição |
| --- | --- |
| User | Pessoa física que inicia o onboarding para vender |
| Organization | Negócio registrado pelo usuário |
| Business Unit | Unidade de negócio/ponto de venda da organização |
| Organization Link | Vínculo entre usuário e organização |

---

## Summary

A capability **Create User** cria a identidade do usuário com dados pessoais e de contato, permitindo vínculo opcional a uma organização existente.

Ela inicia o onboarding do seller e define o status do usuário conforme a presença de vínculo organizacional.

---
