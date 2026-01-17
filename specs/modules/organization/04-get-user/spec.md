# Capability: Get User

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

### User Story 1 - Consultar usuário por id (P1)

Como **responsável pelo módulo de organização**,  
quero **consultar um usuário pelo seu identificador**,  
para **visualizar seus dados e o vínculo organizacional atual**.

**Por que P1**: A consulta individual é necessária para fluxos de atendimento e validação de cadastro.

#### Acceptance Criteria

```gherkin
Scenario: Consultar usuário existente com vínculo organizacional
  Given que o usuário informado existe e possui organização vinculada
  When a consulta é realizada pelo id do usuário
  Then o sistema deve retornar os dados do usuário
  And deve retornar o organizationId associado

Scenario: Consultar usuário existente sem vínculo organizacional
  Given que o usuário informado existe e não possui organização vinculada
  When a consulta é realizada pelo id do usuário
  Then o sistema deve retornar os dados do usuário
  And o organizationId deve ser nulo

Scenario: Consultar usuário inativo
  Given que o usuário informado existe e está com status INACTIVE
  When a consulta é realizada pelo id do usuário
  Then o sistema deve retornar os dados do usuário
  And o statusId deve refletir o estado INACTIVE

Scenario: Rejeitar consulta com userId inválido
  Given que o userId informado é inválido
  When a consulta é realizada pelo id do usuário
  Then a consulta deve ser rejeitada
  And o sistema deve informar `INVALID_USER_ID`

Scenario: Rejeitar consulta de usuário inexistente
  Given que o usuário informado não existe
  When a consulta é realizada pelo id do usuário
  Then a consulta deve ser rejeitada
  And o sistema deve informar `USER_NOT_FOUND`
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir consultar um usuário por `userId`.
- **FR-002**: O `userId` **DEVE** ser informado e válido; quando inválido, o sistema **DEVE** rejeitar a consulta com erro `INVALID_USER_ID`.
- **FR-003**: Se o usuário existir, o sistema **DEVE** retornar seus dados completos.
- **FR-004**: O sistema **DEVE** retornar o `organizationId` do usuário quando houver vínculo.
- **FR-005**: Se o usuário não possuir vínculo organizacional, o `organizationId` **DEVE** ser `null`.
- **FR-006**: Se o usuário não existir, a consulta **DEVE** ser rejeitada com erro `USER_NOT_FOUND`.
- **FR-007**: A consulta **DEVE** retornar dados do usuário independentemente do status; o `statusId` **DEVE** refletir o estado atual.
- **FR-008**: A consulta **DEVE** ser rejeitada quando o solicitante não tiver permissão, com erro `FORBIDDEN`.

---

## Error Handling

A resposta de erro **DEVE** seguir o padrão:

- `success = false`
- `error.code` e `error.message` obrigatórios

| Código | Quando ocorre | Status |
| --- | --- | --- |
| `INVALID_USER_ID` | `userId` inválido | 400 |
| `USER_NOT_FOUND` | Usuário não encontrado | 404 |
| `FORBIDDEN` | Solicitante sem permissão para consultar | 403 |

---

## Entity

### UserDetails

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do usuário | Obrigatório |
| `firstName` | Nome do usuário | Obrigatório |
| `lastName` | Sobrenome do usuário | Obrigatório |
| `documentType` | Tipo do documento | Obrigatório, valores: `CPF`, `CNPJ` |
| `documentNumber` | Documento do usuário | Obrigatório, somente dígitos, 11 (CPF) ou 14 (CNPJ) |
| `email` | Email do usuário | Obrigatório, formato válido |
| `phoneNumber` | Celular do usuário | Obrigatório, somente dígitos, máximo 15 caracteres |
| `emailOptIn` | Preferência de comunicação por email | Obrigatório |
| `phoneOptIn` | Preferência de comunicação por celular | Obrigatório |
| `statusId` | Identificador do status | Obrigatório |
| `organizationId` | Organização vinculada | Opcional, `null` quando não existir vínculo |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

---

## Success Criteria

- **SC-001**: 100% das consultas de usuários existentes retornam `organizationId` coerente com o vínculo.
- **SC-002**: 100% das consultas de usuários inexistentes são rejeitadas.

---

## Glossary

| Termo | Definição |
| --- | --- |
| User | Pessoa física que inicia o onboarding para vender |
| Organization | Negócio registrado pelo usuário |

---

## Summary

A capability **Get User** permite consultar um usuário por id e retornar seus dados com o vínculo organizacional atual.

Ela suporta fluxos de atendimento e validação de cadastro, com retorno explícito de ausência de organização.

---
