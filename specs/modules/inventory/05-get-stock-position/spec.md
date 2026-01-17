# Capability: Get Stock Position

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

### User Story 1 - Consultar posição por item (P1)

Como **responsável pelo estoque**,  
quero **consultar a posição atual de um item**,  
para **saber a quantidade disponível e os lotes existentes**.

**Por que P1**: A posição atual é a base da operação diária.

#### Acceptance Criteria

```gherkin
Scenario: Consultar posição de item com saldo
  Given que o item possui saldo disponível em um ou mais lotes
  When a posição do item é consultada
  Then o sistema deve retornar a quantidade total disponível
  And deve listar os lotes com suas quantidades e validade

Scenario: Consultar posição de item sem saldo
  Given que o item não possui saldo disponível
  When a posição do item é consultada
  Then o sistema deve retornar quantidade total igual a zero
  And a lista de lotes deve estar vazia

Scenario: Consultar posição incluindo lotes zerados
  Given que o item possui lotes com saldo zero
  When a posição do item é consultada com includeZeroBalance = true
  Then o sistema deve retornar os lotes com saldo zero

Scenario: Rejeitar consulta de item inexistente
  Given que o item informado não existe na unidade de negócio
  When a posição do item é consultada
  Then o sistema deve informar que o item não foi encontrado

Scenario: Rejeitar consulta com parâmetros inválidos
  Given que itemId e lotNumber não foram informados
  When a posição é consultada
  Then o sistema deve rejeitar a consulta
  And o sistema deve informar que os parâmetros são inválidos
```

---

### User Story 2 - Consultar posição por lote (P2)

Como **responsável pelo estoque**,  
quero **consultar a posição de um lote específico**,  
para **avaliar sua quantidade e validade**.

**Por que P2**: Facilita auditorias e controle de validade.

#### Acceptance Criteria

```gherkin
Scenario: Consultar posição de lote existente
  Given que o lote existe na unidade de negócio
  When a posição do lote é consultada
  Then o sistema deve retornar a quantidade disponível do lote
  And deve informar a validade quando existir

Scenario: Rejeitar consulta de lote inexistente
  Given que o lote informado não existe na unidade de negócio
  When a posição do lote é consultada
  Then o sistema deve informar que o lote não foi encontrado
```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** receber `businessUnitId` e `itemId` para consulta por item.
- **FR-002**: A capability **DEVE** receber `businessUnitId` e `lotNumber` para consulta por lote.
- **FR-003**: A posição por item **DEVE** retornar `totalAvailable` e a lista de lotes com `lotNumber`, `quantityAvailable` e `expiresAt` quando houver.
- **FR-004**: A posição por lote **DEVE** retornar `itemId`, `lotNumber`, `quantityAvailable` e `expiresAt` quando houver, mesmo quando `quantityAvailable = 0`.
- **FR-005**: Lotes com `quantityAvailable = 0` **NÃO DEVEM** ser retornados por padrão na consulta por item.
- **FR-006**: A capability **DEVE** aceitar `includeZeroBalance` (boolean) na consulta por item; quando `true`, lotes com saldo zero **DEVEM** ser incluídos.
- **FR-007**: A consulta **NÃO DEVE** alterar qualquer saldo ou movimentação.
- **FR-008**: Se o `itemId` não existir na unidade de negócio, a consulta **DEVE** ser rejeitada com erro de item não encontrado.
- **FR-009**: Se o `lotNumber` não existir na unidade de negócio, a consulta **DEVE** ser rejeitada com erro de lote não encontrado.
- **FR-010**: Os lotes retornados na consulta por item **DEVEM** ser ordenados por `expiresAt` ascendente (nulos por último) e, em seguida, por `lotNumber` ascendente.
- **FR-011**: A consulta **DEVE** ser rejeitada quando `itemId` e `lotNumber` estiverem ausentes ou quando ambos forem informados simultaneamente.

---

## Entity

### StockPosition

| Campo | Descrição | Regras |
| --- | --- | --- |
| `itemId` | Item consultado | Obrigatório |
| `totalAvailable` | Quantidade total disponível | Obrigatório, >= 0 |
| `lots` | Lotes do item | Lista com lotes e saldos |

### StockLotPosition

| Campo | Descrição | Regras |
| --- | --- | --- |
| `lotNumber` | Número do lote | Obrigatório |
| `quantityAvailable` | Quantidade disponível | Obrigatório, >= 0 |
| `expiresAt` | Data de validade | Opcional |

---

## Success Criteria

- **SC-001**: 100% das consultas retornam saldos coerentes com os lotes registrados.
- **SC-002**: 100% das consultas não alteram o estado do estoque.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Posição de estoque | Estado atual de quantidades disponíveis |
| Lote | Unidade mínima de controle do estoque |

---

## Summary

A capability **Get Stock Position** fornece a posição atual de estoque por item ou por lote, incluindo saldos e validade quando aplicável.

Ela é estritamente consultiva e mantém o estoque como fonte única de verdade do estado físico.

---
