# Capability: Register Stock Entry

**Created**: 2026-01-12  
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

### User Story 1 - Registrar entrada de estoque por lote (P1)

Como **responsável pelo estoque**,  
quero **registrar uma entrada vinculada a um lote**,  
para **refletir fielmente a entrada física de itens**.

**Por que P1**: Sem entradas registradas o estoque não representa a realidade.

#### Acceptance Criteria

```gherkin
Scenario: Registrar entrada criando novo lote
  Given que o item existe na unidade de negócio
  And que o número de lote informado não existe na unidade
  And que a quantidade informada é positiva
  When a entrada é registrada com itemId, lotNumber, quantity, movementSource e occurredAt
  Then o lote deve ser criado com a quantidade informada
  And a movimentação de entrada deve ser registrada

Scenario: Registrar entrada incrementando lote existente
  Given que o lote informado já existe na unidade de negócio
  And que o lote pertence ao item informado
  When a entrada é registrada para esse lote
  Then a quantidade disponível do lote deve ser incrementada
  And a movimentação de entrada deve ser registrada

Scenario: Rejeitar entrada com item inexistente
  Given que o item informado não existe na unidade de negócio
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que o item não existe

Scenario: Rejeitar entrada com validade divergente do lote existente
  Given que o lote informado já existe na unidade de negócio
  And que o expiresAt informado é diferente do registrado no lote
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que a validade não confere com o lote

Scenario: Rejeitar entrada com lote existente de outro item
  Given que o lote informado já existe
  And que o lote pertence a outro item
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar conflito de lote e item
```

---

### User Story 2 - Garantir consistência de validações (P1)

Como **sistema**,  
quero **validar quantidade, validade e origem da entrada**,  
para **manter o estoque coerente e auditável**.

**Por que P1**: Movimentações incorretas geram divergência física e financeira.

#### Acceptance Criteria

```gherkin
Scenario: Rejeitar entrada com quantidade inválida
  Given que a quantidade informada é zero ou negativa
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar erro de validação

Scenario: Rejeitar entrada fracionada quando a unidade de medida não permite
  Given que a unidade de medida do item não permite fracionamento
  And que a quantidade informada possui casas decimais
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que fracionamento não é permitido

Scenario: Rejeitar entrada sem validade quando o item exige
  Given que o item exige validade por lote
  And que a data de validade não foi informada
  When a entrada é registrada para um novo lote
  Then a entrada deve ser rejeitada
  And o sistema deve informar que a validade é obrigatória

Scenario: Rejeitar entrada sem externalId quando a origem exige
  Given que a origem da movimentação não é INVENTORY_ADJUSTMENT
  And que o externalId não foi informado
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que o externalId é obrigatório

Scenario: Rejeitar entrada com origem inválida
  Given que a origem da movimentação informada é inválida
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que a origem é inválida
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir registrar entrada com `businessUnitId`, `itemId`, `lotNumber`, `quantity`, `movementSource`, `occurredAt` e `createdBy`.
- **FR-002**: O `itemId` **DEVE** existir e pertencer à `businessUnitId` informada.
- **FR-003**: O `lotNumber` **DEVE** ser informado e, para criação de novo lote, **DEVE** ser único dentro da `businessUnitId`.
- **FR-004**: Se o lote já existir, ele **DEVE** pertencer ao mesmo `itemId` informado.
- **FR-005**: Se o lote já existir e `expiresAt` for informado, ele **DEVE** ser igual ao `expiresAt` registrado no lote.
- **FR-006**: Quando o lote não existir, `expiresAt` **DEVE** ser informado se o item exigir validade; caso contrário, **PODE** ser omitido.
- **FR-007**: A `quantity` **DEVE** ser maior que zero.
- **FR-008**: Se a unidade de medida do item não permitir fracionamento, a `quantity` **NÃO DEVE** possuir casas decimais.
- **FR-009**: `movementSource` **DEVE** ser um dos valores: `PURCHASE_ORDER`, `PRODUCTION_ORDER`, `INVENTORY_ADJUSTMENT`.
- **FR-010**: `externalId` **DEVE** ser informado quando `movementSource` for diferente de `INVENTORY_ADJUSTMENT`.
- **FR-011**: Cada entrada **DEVE** gerar uma movimentação imutável do tipo `ENTRY`.
- **FR-012**: A entrada **DEVE** incrementar a quantidade disponível do lote.
- **FR-013**: A movimentação **DEVE** referenciar um `lotNumber` que pertença ao `itemId` informado.

---

## Entity

### StockLot

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador do lote | Obrigatório, único |
| `businessUnitId` | Unidade de negócio do lote | Obrigatório |
| `itemId` | Item controlado | Obrigatório |
| `lotNumber` | Número externo do lote | Obrigatório, único por unidade de negócio |
| `expiresAt` | Data de validade | Opcional, obrigatória se item exigir |
| `quantityAvailable` | Quantidade disponível | Obrigatório, >= 0 |

### StockMovement

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador da movimentação | Obrigatório, único |
| `businessUnitId` | Unidade de negócio | Obrigatório |
| `itemId` | Item movimentado | Obrigatório |
| `lotNumber` | Lote movimentado | Obrigatório, deve pertencer ao `itemId` informado |
| `type` | Tipo de movimentação | Obrigatório, `ENTRY` |
| `quantity` | Quantidade movimentada | Obrigatório, > 0 |
| `movementSource` | Origem da movimentação | Obrigatório |
| `externalId` | Identificador externo da origem | Obrigatório exceto `INVENTORY_ADJUSTMENT` |
| `occurredAt` | Data/hora do evento | Obrigatório |
| `createdBy` | Autor do registro | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das entradas registradas geram movimentação imutável.
- **SC-002**: 100% das entradas com item que exige validade informam `expiresAt`.
- **SC-003**: 0% das entradas permitem quantidade fracionada quando o item não permite.
- **SC-004**: 100% das entradas com `movementSource` diferente de `INVENTORY_ADJUSTMENT` informam `externalId`.
- **SC-005**: 0% das entradas registram movimentação com lote que não pertence ao `itemId`.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Entrada de estoque | Registro de incorporação física de itens |
| Lote | Unidade mínima de controle e rastreabilidade |
| Origem da movimentação | Contexto externo que gerou a entrada |

---

## Summary

A capability **Register Stock Entry** registra entradas físicas no estoque por lote, criando ou incrementando lotes e gerando movimentações imutáveis.

Ela valida consistência de quantidade, validade e origem, garantindo rastreabilidade por unidade de negócio.

---
