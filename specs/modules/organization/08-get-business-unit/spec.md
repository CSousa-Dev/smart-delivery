# Capability: Get Business Unit

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

### User Story 1 - Consultar unidade de negócio por id (P1)

Como **responsável pelo módulo de organização**,  
quero **consultar uma unidade de negócio pelo seu identificador**,  
para **visualizar seus dados e vínculo com a organização**.

**Por que P1**: A consulta individual é necessária para manutenção e validação do ponto de venda.

#### Acceptance Criteria

```gherkin
Scenario: Consultar unidade de negócio existente
  Given que a unidade de negócio informada existe
  When a consulta é realizada pelo id da unidade de negócio
  Then o sistema deve retornar os dados da unidade de negócio

Scenario: Consultar unidade de negócio com status pendente
  Given que a unidade de negócio informada existe e está com status PENDING_PRODUCTS
  When a consulta é realizada pelo id da unidade de negócio
  Then o sistema deve retornar os dados da unidade de negócio
  And o statusId deve refletir o estado PENDING_PRODUCTS

Scenario: Rejeitar consulta com businessUnitId inválido
  Given que o businessUnitId informado é inválido
  When a consulta é realizada
  Then a consulta deve ser rejeitada
  And o sistema deve informar `INVALID_BUSINESS_UNIT_ID`

Scenario: Rejeitar consulta de unidade de negócio inexistente
  Given que a unidade de negócio informada não existe
  When a consulta é realizada
  Then a consulta deve ser rejeitada
  And o sistema deve informar `BUSINESS_UNIT_NOT_FOUND`
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir consultar uma unidade de negócio por `businessUnitId`.
- **FR-002**: O `businessUnitId` **DEVE** ser informado e válido; quando inválido, o sistema **DEVE** rejeitar a consulta com erro `INVALID_BUSINESS_UNIT_ID`.
- **FR-003**: Se a unidade de negócio existir, o sistema **DEVE** retornar seus dados completos.
- **FR-004**: Se a unidade de negócio não existir, a consulta **DEVE** ser rejeitada com erro `BUSINESS_UNIT_NOT_FOUND`.
- **FR-005**: A consulta **DEVE** retornar dados da unidade de negócio independentemente do status; o `statusId` **DEVE** refletir o estado atual.
- **FR-006**: A consulta **DEVE** ser rejeitada quando o solicitante não tiver permissão, com erro `FORBIDDEN`.

---

## Error Handling

A resposta de erro **DEVE** seguir o padrão:

- `success = false`
- `error.code` e `error.message` obrigatórios

| Código | Quando ocorre | Status |
| --- | --- | --- |
| `INVALID_BUSINESS_UNIT_ID` | `businessUnitId` inválido | 400 |
| `BUSINESS_UNIT_NOT_FOUND` | Unidade de negócio não encontrada | 404 |
| `FORBIDDEN` | Solicitante sem permissão para consultar | 403 |

---

## Entity

### BusinessUnitDetails

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade de negócio | Obrigatório |
| `organizationId` | Organização vinculada | Obrigatório |
| `publicName` | Nome público exibido aos compradores | Obrigatório |
| `phoneNumber` | Telefone de contato | Obrigatório, somente dígitos, máximo 15 caracteres |
| `phoneHasWhatsapp` | Indica se o telefone possui WhatsApp | Obrigatório |
| `email` | Email do ponto de venda | Opcional, formato válido |
| `instagram` | Instagram do negócio | Opcional |
| `website` | Site ou link público do negócio | Opcional |
| `statusId` | Identificador do status | Obrigatório |
| `address` | Endereço completo | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

### BusinessUnitAddress

| Campo | Descrição | Regras |
| --- | --- | --- |
| `street` | Rua/Logradouro | Obrigatório |
| `number` | Número | Obrigatório |
| `complement` | Complemento | Opcional |
| `neighborhood` | Bairro | Obrigatório |
| `city` | Cidade | Obrigatório |
| `state` | Estado | Obrigatório, UF válida do Brasil |
| `postalCode` | CEP | Obrigatório, 8 dígitos numéricos |
| `country` | País | Obrigatório, valor esperado: `BR` |
| `referencePoint` | Ponto de referência | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das consultas de unidades de negócio existentes retornam seus dados completos.
- **SC-002**: 100% das consultas de unidades de negócio inexistentes são rejeitadas.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Business Unit | Ponto de venda da organização |
| Organization | Negócio registrado pelo usuário |

---

## Summary

A capability **Get Business Unit** permite consultar uma unidade de negócio por id e retornar seus dados completos.

Ela dá suporte a operações de manutenção e validação de pontos de venda no módulo de organização.

---
