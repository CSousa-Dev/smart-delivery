# Capability: Register Stock Exit

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

### User Story 1 - Registrar saída de estoque (P1)

Como **responsável pelo estoque**,  
quero **registrar saídas por finalidade operacional**,  
para **refletir corretamente consumo, venda ou perda de itens**.

**Por que P1**: Saídas não registradas geram estoque fictício e distorções financeiras.

#### Acceptance Criteria

```gherkin
Scenario: Registrar saída com lotes informados
  Given que o item existe na unidade de negócio
  And que os lotes informados possuem saldo disponível
  When a saída é registrada com lotAllocations
  Then os saldos dos lotes devem ser reduzidos
  And a movimentação de saída deve ser registrada

Scenario: Rejeitar saída com item inexistente
  Given que o item informado não existe na unidade de negócio
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o item não existe

Scenario: Registrar saída com seleção automática de lotes
  Given que o item possui saldo disponível em múltiplos lotes
  And que nenhum lote foi informado
  When a saída é registrada
  Then o sistema deve selecionar lotes pela validade mais próxima
  And quando não houver validade deve selecionar por FIFO
  And a movimentação deve registrar quais lotes foram usados

Scenario: Selecionar lote com mesma validade (desempate FEFO)
  Given que o item possui dois lotes com a mesma validade e saldo disponível
  And que nenhum lote foi informado
  When a saída é registrada
  Then o sistema deve selecionar primeiro o lote com lotNumber menor

Scenario: Selecionar lote com mesma data de primeira entrada (desempate FIFO)
  Given que o item não exige validade
  And que existem dois lotes com a mesma data da primeira entrada e saldo disponível
  And que nenhum lote foi informado
  When a saída é registrada
  Then o sistema deve selecionar primeiro o lote com lotNumber menor

Scenario: Rejeitar seleção automática com apenas lotes vencidos
  Given que o item possui apenas lotes vencidos com saldo disponível
  And que nenhum lote foi informado
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que não há lotes válidos para saída

Scenario: Rejeitar saída com saldo insuficiente
  Given que o saldo disponível é menor que a quantidade solicitada
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o saldo é insuficiente

Scenario: Rejeitar saída com lote sem saldo suficiente
  Given que um lote informado possui saldo menor do que a quantidade alocada
  When a saída é registrada com lotAllocations
  Then a saída deve ser rejeitada
  And o sistema deve informar que o lote não possui saldo suficiente

Scenario: Rejeitar saída com lote vencido
  Given que o lote informado está vencido na data da movimentação
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o lote está vencido

Scenario: Rejeitar saída com lote de outro item
  Given que o lote informado pertence a outro item
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o lote não pertence ao item
```

---

### User Story 2 - Garantir consistência e auditoria (P1)

Como **sistema**,  
quero **validar quantidade, fracionamento e origem da saída**,  
para **preservar a integridade do estoque**.

**Por que P1**: Saídas inconsistentes comprometem o controle físico e contábil.

#### Acceptance Criteria

```gherkin
Scenario: Rejeitar saída com quantidade inválida
  Given que a quantidade informada é zero ou negativa
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar erro de validação

Scenario: Rejeitar saída fracionada quando a unidade de medida não permite
  Given que a unidade de medida do item não permite fracionamento
  And que a quantidade informada possui casas decimais
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que fracionamento não é permitido

Scenario: Rejeitar saída sem externalId quando a origem exige
  Given que a origem da movimentação não é INVENTORY_ADJUSTMENT
  And que o externalId não foi informado
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o externalId é obrigatório

Scenario: Rejeitar saída com soma de alocações inválida
  Given que a soma das quantidades em lotAllocations é diferente da quantity
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que a soma das alocações é inválida
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir registrar saída com `businessUnitId`, `itemId`, `quantity`, `movementSource`, `occurredAt` e `createdBy`.
- **FR-002**: O `itemId` **DEVE** existir e pertencer à `businessUnitId` informada.
- **FR-003**: `movementSource` **DEVE** ser um dos valores: `SALES_ORDER`, `PRODUCTION_ORDER`, `WASTE`, `INVENTORY_ADJUSTMENT`.
- **FR-004**: `externalId` **DEVE** ser informado quando `movementSource` for diferente de `INVENTORY_ADJUSTMENT`.
- **FR-005**: A `quantity` **DEVE** ser maior que zero.
- **FR-006**: Se a unidade de medida do item não permitir fracionamento, a `quantity` **NÃO DEVE** possuir casas decimais.
- **FR-007**: O sistema **NÃO DEVE** permitir saldo negativo em nenhum lote.
- **FR-008**: Quando `lotAllocations` for informado, a soma das quantidades **DEVE** ser igual à `quantity`.
- **FR-009**: Cada lote informado em `lotAllocations` **DEVE** existir na unidade de negócio, pertencer ao `itemId` informado e possuir saldo suficiente.
- **FR-010**: Quando `lotAllocations` não for informado, o sistema **DEVE** selecionar lotes por validade mais próxima (FEFO); quando o item não exige validade, **DEVE** usar FIFO.
- **FR-011**: Cada saída **DEVE** gerar uma movimentação imutável do tipo `EXIT` com os lotes efetivamente utilizados.
- **FR-012**: A saída **DEVE** reduzir o saldo disponível dos lotes utilizados.
- **FR-013**: Lotes vencidos **NÃO DEVEM** ser consumidos em saídas.
- **FR-014**: A seleção automática **NÃO DEVE** considerar lotes vencidos; se apenas lotes vencidos estiverem disponíveis, a saída **DEVE** ser rejeitada.
- **FR-015**: Um lote **DEVE** ser considerado vencido quando `expiresAt` for anterior a `occurredAt`.
- **FR-016**: Em seleção automática, empates **DEVEM** ser resolvidos por `lotNumber` ascendente; em FEFO o empate ocorre quando `expiresAt` for igual, e em FIFO quando a data da primeira entrada do lote for igual.

---

## Entity

### StockMovement

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador da movimentação | Obrigatório, único |
| `businessUnitId` | Unidade de negócio | Obrigatório |
| `itemId` | Item movimentado | Obrigatório |
| `type` | Tipo de movimentação | Obrigatório, `EXIT` |
| `quantity` | Quantidade movimentada | Obrigatório, > 0 |
| `movementSource` | Origem da movimentação | Obrigatório |
| `externalId` | Identificador externo da origem | Obrigatório exceto `INVENTORY_ADJUSTMENT` |
| `occurredAt` | Data/hora do evento | Obrigatório |
| `createdBy` | Autor do registro | Obrigatório |

### LotAllocation

| Campo | Descrição | Regras |
| --- | --- | --- |
| `lotNumber` | Número do lote usado | Obrigatório, deve pertencer ao `itemId` informado |
| `quantity` | Quantidade retirada do lote | Obrigatório, > 0 |

---

## Success Criteria

- **SC-001**: 0% das saídas permitem saldo negativo.
- **SC-002**: 100% das saídas registradas geram movimentação imutável.
- **SC-003**: 100% das saídas registram origem e autor.
- **SC-004**: 0% das saídas com `lotAllocations` aceitam lotes com saldo insuficiente.
- **SC-005**: 100% das seleções automáticas seguem FEFO/FIFO e rejeitam saídas quando só há lotes vencidos.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Saída de estoque | Registro de redução física de itens |
| Origem da movimentação | Contexto externo que gerou a saída |
| Alocação de lote | Distribuição da saída entre lotes |

---

## Summary

A capability **Register Stock Exit** registra saídas físicas do estoque, reduzindo saldos de lotes e criando movimentações imutáveis com origem rastreável.

Ela impede saldo negativo e valida fracionamento, mantendo coerência entre estoque físico e digital.

---
