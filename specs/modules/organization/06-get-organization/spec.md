# Capability: Get Organization

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

### User Story 1 - Consultar organização por id (P1)

Como **responsável pelo módulo de organização**,  
quero **consultar uma organização pelo seu identificador**,  
para **visualizar seus dados e, quando solicitado, seus vínculos**.

**Por que P1**: A consulta individual é a base para operações de gestão e verificação do negócio.

#### Acceptance Criteria

```gherkin
Scenario: Consultar organização sem vínculos adicionais
  Given que a organização informada existe
  When a consulta é realizada sem parâmetro `include`
  Then o sistema deve retornar apenas os dados da organização

Scenario: Consultar organização com unidades de negócio
  Given que a organização informada existe
  When a consulta é realizada com `include = businessUnits`
  Then o sistema deve retornar a organização e suas unidades de negócio

Scenario: Consultar organização com unidades de negócio e usuários
  Given que a organização informada existe
  When a consulta é realizada com `include = businessUnits,users`
  Then o sistema deve retornar a organização, suas unidades de negócio e seus usuários

Scenario: Consultar organização com usuários apenas
  Given que a organização informada existe
  When a consulta é realizada com `include = users`
  Then o sistema deve retornar a organização e seus usuários

Scenario: Consultar organização com vínculos inexistentes
  Given que a organização informada existe e não possui unidades de negócio nem usuários
  When a consulta é realizada com `include = businessUnits,users`
  Then o sistema deve retornar a organização
  And deve retornar listas vazias para unidades de negócio e usuários

Scenario: Consultar organização com include inválido
  Given que a organização informada existe
  When a consulta é realizada com `include = businessUnits,foo,users,users`
  Then o sistema deve retornar a organização, suas unidades de negócio e seus usuários
  And o valor `foo` deve ser ignorado

Scenario: Rejeitar consulta com organizationId inválido
  Given que o organizationId informado é inválido
  When a consulta é realizada
  Then a consulta deve ser rejeitada
  And o sistema deve informar `INVALID_ORGANIZATION_ID`

Scenario: Rejeitar consulta de organização inexistente
  Given que a organização informada não existe
  When a consulta é realizada
  Then a consulta deve ser rejeitada
  And o sistema deve informar `ORGANIZATION_NOT_FOUND`
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir consultar uma organização por `organizationId`.
- **FR-002**: O `organizationId` **DEVE** ser informado e válido; quando inválido, o sistema **DEVE** rejeitar a consulta com erro `INVALID_ORGANIZATION_ID`.
- **FR-003**: Quando não houver parâmetro `include`, o sistema **DEVE** retornar apenas os dados da organização.
- **FR-004**: O sistema **DEVE** permitir solicitar vínculos via parâmetro `include` com valores `businessUnits` e `users`; valores desconhecidos **DEVEM** ser ignorados e valores repetidos **DEVEM** ser considerados apenas uma vez.
- **FR-005**: Quando solicitado, o sistema **DEVE** retornar as unidades de negócio vinculadas à organização.
- **FR-006**: Quando solicitado, o sistema **DEVE** retornar os usuários vinculados à organização.
- **FR-007**: Se vínculos solicitados não existirem, o sistema **DEVE** retornar listas vazias.
- **FR-008**: O retorno de unidades de negócio e usuários **DEVE** ocorrer apenas quando explicitamente solicitado.
- **FR-009**: Se a organização não existir, a consulta **DEVE** ser rejeitada com erro `ORGANIZATION_NOT_FOUND`.
- **FR-010**: Os dados da organização **DEVEM** incluir a lista de `verticalIds` vinculados.

---

## Entity

### OrganizationDetails

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da organização | Obrigatório |
| `tradeName` | Nome fantasia da organização | Obrigatório |
| `legalName` | Razão social/nome formal | Obrigatório quando `documentType` = `CNPJ` |
| `documentType` | Tipo do documento | Obrigatório, valores: `CPF`, `CNPJ` |
| `documentNumber` | Documento da organização | Obrigatório, somente dígitos, 11 (CPF) ou 14 (CNPJ) |
| `verticalIds` | Verticais vinculadas | Obrigatório, lista com 1+ ids registrados |
| `ownerUserId` | Usuário owner da organização | Obrigatório |
| `statusId` | Identificador do status | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

### BusinessUnitSummary

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade de negócio | Obrigatório |
| `organizationId` | Organização vinculada | Obrigatório |
| `publicName` | Nome público exibido aos compradores | Obrigatório |
| `phoneNumber` | Telefone de contato | Obrigatório, somente dígitos, máximo 15 caracteres |
| `phoneHasWhatsapp` | Indica se o telefone possui WhatsApp | Obrigatório |
| `statusId` | Identificador do status | Obrigatório |

### OrganizationUserSummary

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do usuário | Obrigatório |
| `firstName` | Nome do usuário | Obrigatório |
| `lastName` | Sobrenome do usuário | Obrigatório |
| `email` | Email do usuário | Obrigatório, formato válido |
| `phoneNumber` | Celular do usuário | Obrigatório, somente dígitos, máximo 15 caracteres |
| `statusId` | Identificador do status | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das consultas válidas retornam os dados da organização.
- **SC-002**: 100% das consultas com vínculos solicitados retornam apenas os vínculos explicitamente pedidos.
- **SC-003**: 100% das consultas de organizações inexistentes são rejeitadas.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Organization | Negócio registrado pelo usuário |
| Business Unit | Ponto de venda da organização |
| User | Pessoa física vinculada à organização |

---

## Summary

A capability **Get Organization** permite consultar uma organização por id e, quando solicitado, incluir suas unidades de negócio e usuários vinculados.

Ela dá suporte a operações de gestão e validação do negócio no módulo de organização.

---
