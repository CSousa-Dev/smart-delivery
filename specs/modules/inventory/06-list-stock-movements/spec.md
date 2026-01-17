# Capability: List Stock Movements

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

### User Story 1 - Consultar histórico de movimentações (P1)

Como **responsável pelo estoque**,  
quero **consultar o histórico de movimentações**,  
para **auditar entradas e saídas ao longo do tempo**.

**Por que P1**: O histórico é a base da rastreabilidade e da auditoria.

#### Acceptance Criteria

```gherkin
Scenario: Listar movimentações por item e período
  Given que existem movimentações registradas para um item
  When o histórico é consultado com itemId e período
  Then o sistema deve retornar as movimentações em ordem cronológica
  And cada movimentação deve incluir lote, quantidade, origem e autor

Scenario: Listar movimentações por origem externa
  Given que existem movimentações com externalId informado
  When o histórico é consultado com movementSource e externalId
  Then o sistema deve retornar apenas as movimentações correspondentes

Scenario: Consultar histórico sem resultados
  Given que não existem movimentações para os filtros informados
  When o histórico é consultado
  Then o sistema deve retornar uma lista vazia

Scenario: Listar movimentações com paginação
  Given que existem mais de 50 movimentações para o filtro informado
  When o histórico é consultado com page = 2 e pageSize = 50
  Then o sistema deve retornar apenas as movimentações da segunda página

Scenario: Rejeitar consulta com intervalo de datas inválido
  Given que a data inicial é posterior à data final
  When o histórico é consultado
  Then a consulta deve ser rejeitada
  And o sistema deve informar que o intervalo de datas é inválido

Scenario: Rejeitar consulta com filtros inválidos
  Given que movementType ou movementSource informado é inválido
  When o histórico é consultado
  Then a consulta deve ser rejeitada
  And o sistema deve informar que o filtro é inválido

Scenario: Rejeitar consulta com paginação inválida
  Given que page é menor que 1 ou pageSize é maior que 200
  When o histórico é consultado
  Then a consulta deve ser rejeitada
  And o sistema deve informar que a paginação é inválida
```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** receber `businessUnitId` como escopo obrigatório.
- **FR-002**: A capability **PODE** receber filtros como `itemId`, `lotNumber`, `movementType`, `movementSource`, `externalId` e intervalo de datas.
- **FR-003**: A capability **DEVE** suportar paginação com `page` (iniciando em 1) e `pageSize` (padrão 50, máximo 200).
- **FR-004**: O intervalo de datas **DEVE** ser aplicado sobre `occurredAt` com início e fim inclusivos e aceitar timestamps ISO-8601; quando ausente timezone, **DEVE** assumir UTC.
- **FR-005**: O resultado **DEVE** ser ordenado por `occurredAt` em ordem cronológica e, em caso de empate, por `id` ascendente.
- **FR-006**: Cada movimentação **DEVE** retornar `id`, `itemId`, `lotNumber`, `type`, `quantity`, `movementSource`, `externalId`, `occurredAt` e `createdBy`.
- **FR-007**: Movimentações **NÃO DEVEM** ser alteradas, removidas ou recalculadas por esta capability.

---

## Entity

### StockMovementRecord

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador da movimentação | Obrigatório |
| `itemId` | Item movimentado | Obrigatório |
| `lotNumber` | Lote movimentado | Obrigatório |
| `type` | Tipo de movimentação | Obrigatório, `ENTRY` ou `EXIT` |
| `quantity` | Quantidade movimentada | Obrigatório, > 0 |
| `movementSource` | Origem da movimentação | Obrigatório |
| `externalId` | Identificador externo da origem | Opcional |
| `occurredAt` | Data/hora do evento | Obrigatório |
| `createdBy` | Autor do registro | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das movimentações retornadas são imutáveis e auditáveis.
- **SC-002**: 100% das consultas retornam resultados coerentes com os filtros informados.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Movimentação | Evento imutável de entrada ou saída de estoque |
| Origem da movimentação | Contexto externo que gerou o evento |

---

## Summary

A capability **List Stock Movements** permite consultar o histórico imutável de entradas e saídas de estoque com filtros por item, lote e origem.

Ela sustenta auditoria e rastreabilidade ao longo do tempo, sem alterar o estado do estoque.

---
