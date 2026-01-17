# Capability: Update Order

**Created**: 2026-01-16  
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

### User Story 1 - Atualizar pedido em andamento (P1)

Como **sistema interno autorizado ou operador da unidade de negócio**,  
quero **alterar produtos, cliente ou endereço de um pedido aberto**,  
para **corrigir ou ajustar o pedido antes de sua finalização**.

**Por que P1**: Ajustes são necessários para manter o pedido correto enquanto ainda não foi finalizado.

#### Acceptance Criteria

```gherkin
Scenario: Atualizar produtos e endereço de um pedido aberto
  Given que o pedido está com status PENDING
  When os produtos e o addressId do pedido são atualizados
  Then o pedido deve refletir os novos produtos e endereço
  And o status do pedido deve permanecer inalterado

Scenario: Atualizar cliente de um pedido aberto
  Given que o pedido está com status ACCEPTED
  When o clientId do pedido é atualizado
  Then o pedido deve refletir o novo cliente
  And o status do pedido deve permanecer inalterado

Scenario: Rejeitar atualização de pedido finalizado
  Given que o pedido está com status FINISHED
  When o pedido é atualizado
  Then a atualização deve ser rejeitada
  And o sistema deve informar que pedidos finalizados não podem ser alterados

Scenario: Rejeitar atualização de pedido cancelado
  Given que o pedido está com status CANCELED
  When o pedido é atualizado
  Then a atualização deve ser rejeitada
  And o sistema deve informar que pedidos cancelados não podem ser alterados
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir atualizar `products`, `clientId` e `addressId` de um pedido.
- **FR-002**: A atualização **SÓ DEVE** ser permitida se o status do pedido **NÃO** for `FINISHED` ou `CANCELED`.
- **FR-003**: A atualização de pedido **NÃO DEVE** alterar o status do pedido.
- **FR-004**: Após a atualização, o pedido **DEVE** conter ao menos um produto.
- **FR-005**: Cada produto atualizado **DEVE** conter `productId` e `quantity`.
- **FR-006**: `quantity` **DEVE** ser maior que zero.
- **FR-007**: Apenas sistemas internos autorizados ou usuários vinculados à organização e unidade de negócio **PODEM** atualizar pedidos.

---

## Entity

### Order

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do pedido | Obrigatório, único |
| `organizationId` | Organização dona do pedido | Obrigatório |
| `businessUnitId` | Unidade de negócio do pedido | Obrigatório |
| `clientId` | Cliente do pedido | Obrigatório |
| `addressId` | Endereço do pedido | Obrigatório |
| `status` | Estado do pedido | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

### OrderProduct

| Campo | Descrição | Regras |
| --- | --- | --- |
| `orderId` | Pedido relacionado | Obrigatório |
| `productId` | Produto do pedido | Obrigatório |
| `quantity` | Quantidade do produto | Obrigatório, maior que zero |
| `observation` | Observação do produto | Opcional |

**Relacionamentos**: Um pedido possui uma lista de produtos relacionados.

---

## Success Criteria

- **SC-001**: 100% das atualizações em pedidos não finalizados são aplicadas com sucesso.
- **SC-002**: 100% das tentativas de atualização em pedidos `FINISHED` ou `CANCELED` são rejeitadas.
- **SC-003**: 100% dos pedidos atualizados mantêm ao menos um produto associado.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Pedido aberto | Pedido cujo status não é `FINISHED` nem `CANCELED` |
| Produto do pedido | Produto associado ao pedido durante sua vigência |

---

## Summary

A capability **Update Order** permite ajustar produtos, cliente e endereço de pedidos abertos sem alterar o status.

Ela restringe alterações para pedidos finalizados ou cancelados e garante que o pedido continue válido após as mudanças.

---
