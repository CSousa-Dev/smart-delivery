# Capability: Change Order Status

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

### User Story 1 - Alterar status do pedido (P1)

Como **sistema interno autorizado ou operador da unidade de negócio**,  
quero **alterar o status do pedido seguindo o fluxo padrão**,  
para **refletir a etapa atual do pedido no negócio**.

**Por que P1**: O status é o principal contrato do pedido com os demais módulos.

#### Acceptance Criteria

```gherkin
Scenario: Avançar status seguindo o fluxo padrão
  Given que o pedido está com status PENDING
  When o status é alterado para ACCEPTED
  Then o pedido deve ficar com status ACCEPTED

Scenario: Rejeitar salto de etapa no fluxo padrão
  Given que o pedido está com status PENDING
  When o status é alterado para DISPATCHED
  Then a alteração deve ser rejeitada
  And o sistema deve informar que o fluxo de status é inválido

Scenario: Cancelar pedido em qualquer etapa não finalizada
  Given que o pedido está com status IN_PRODUCTION
  When o status é alterado para CANCELED com cancellationReason informada
  Then o pedido deve ficar com status CANCELED
  And o motivo de cancelamento deve ser registrado

Scenario: Rejeitar mudança de status de pedido finalizado
  Given que o pedido está com status FINISHED
  When o status é alterado
  Then a alteração deve ser rejeitada
  And o sistema deve informar que pedidos finalizados não mudam de status

Scenario: Rejeitar mudança de status de pedido cancelado
  Given que o pedido está com status CANCELED
  When o status é alterado
  Then a alteração deve ser rejeitada
  And o sistema deve informar que pedidos cancelados não mudam de status
```

---

## Functional Requirements

- **FR-001**: O status do pedido **DEVE** ser um dos valores: `PENDING`, `ACCEPTED`, `IN_PRODUCTION`, `DISPATCHED`, `DELIVERED`, `FINISHED`, `CANCELED`.
- **FR-002**: O fluxo padrão **DEVE** seguir a ordem: `PENDING` -> `ACCEPTED` -> `IN_PRODUCTION` -> `DISPATCHED` -> `DELIVERED` -> `FINISHED`.
- **FR-003**: A mudança de status **SÓ DEVE** permitir avançar para o próximo status do fluxo padrão.
- **FR-004**: A mudança para `CANCELED` **PODE** ocorrer a partir de qualquer status, exceto `FINISHED` e `CANCELED`.
- **FR-005**: Uma vez em `FINISHED` ou `CANCELED`, o pedido **NÃO DEVE** permitir mudanças de status.
- **FR-006**: `cancellationReason` **PODE** ser informado como texto livre quando o status for `CANCELED`.
- **FR-007**: A alteração de status **NÃO DEVE** modificar outros dados do pedido.
- **FR-008**: Apenas sistemas internos autorizados ou usuários vinculados à organização e unidade de negócio **PODEM** alterar o status.

---

## Entity

### Order

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do pedido | Obrigatório, único |
| `status` | Estado do pedido | Obrigatório, valores permitidos no fluxo |
| `cancellationReason` | Motivo do cancelamento | Opcional, texto livre |
| `updatedAt` | Data da última atualização | Opcional |

---

## Success Criteria

- **SC-001**: 100% das mudanças de status seguem o fluxo padrão definido.
- **SC-002**: 100% das tentativas de salto de status são rejeitadas.
- **SC-003**: 100% dos pedidos cancelados registram o status `CANCELED` e, quando informado, o motivo.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Fluxo padrão | Sequência oficial de avanço de status do pedido |
| Cancelamento | Mudança de status para `CANCELED` |
| Status do pedido | Estado atual do pedido no ciclo de vida |

---

## Summary

A capability **Change Order Status** controla a progressão do pedido pelo fluxo padrão e permite cancelamento a qualquer momento antes da finalização.

Ela impede saltos de etapa e bloqueia qualquer mudança após o pedido estar `FINISHED` ou `CANCELED`.

---
