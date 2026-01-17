# Capability: Unlink Product from Inventory Item

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

### User Story 1 - Desvincular produto de item (P1)

Como **responsável pela operação da unidade**,  
quero **desvincular um produto de um item de estoque**,  
para **impedir novos usos sem perder o histórico do vínculo**.

**Por que P1**: Permite ajustes operacionais sem excluir registros já utilizados.

#### Acceptance Criteria

```gherkin
Scenario: Desvincular vínculo ativo
  Given que existe um vínculo ACTIVE entre o produto e o item
  When a desativação é solicitada
  Then o vínculo deve ser marcado como INACTIVE
  And o sistema deve registrar o autor da atualização

Scenario: Rejeitar desativação de vínculo inexistente
  Given que não existe vínculo entre o produto e o item
  When a desativação é solicitada
  Then a desativação deve ser rejeitada
  And o sistema deve informar que o vínculo não existe

Scenario: Rejeitar desativação com produto inexistente
  Given que o produto informado não existe na unidade de negócio
  When a desativação é solicitada
  Then a desativação deve ser rejeitada
  And o sistema deve informar que o produto não existe

Scenario: Rejeitar desativação com item inexistente
  Given que o item informado não existe na unidade de negócio
  When a desativação é solicitada
  Then a desativação deve ser rejeitada
  And o sistema deve informar que o item não existe

Scenario: Rejeitar desativação de vínculo já inativo
  Given que o vínculo entre o produto e o item está INACTIVE
  When a desativação é solicitada
  Then a desativação deve ser rejeitada
  And o sistema deve informar que o vínculo já está inativo

Scenario: Rejeitar desativação de vínculo de outra unidade
  Given que existe um vínculo entre o produto e o item em outra unidade de negócio
  When a desativação é solicitada com uma businessUnitId diferente
  Then a desativação deve ser rejeitada
  And o sistema deve informar que o vínculo não pertence à unidade informada
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir desativar um vínculo com `productId`, `itemId`, `businessUnitId` e `updatedBy`.
- **FR-002**: O vínculo **DEVE** existir e pertencer à `businessUnitId` informada.
- **FR-003**: Apenas vínculos com `status = ACTIVE` **PODEM** ser desativados.
- **FR-004**: A desativação **DEVE** alterar o `status` para `INACTIVE` sem remover o registro.
- **FR-005**: A desativação **NÃO DEVE** alterar dados do produto ou do item.
- **FR-006**: O vínculo desativado **DEVE** permanecer disponível para reativação futura.
- **FR-007**: Se existir vínculo para o mesmo `productId` e `itemId` em outra `businessUnitId`, a desativação **DEVE** ser rejeitada com erro de unidade divergente.
- **FR-008**: O `productId` **DEVE** existir na `businessUnitId` informada.
- **FR-009**: O `itemId` **DEVE** existir na `businessUnitId` informada.

---

## Entity

### ProductItemLink

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do vínculo | Obrigatório, único |
| `businessUnitId` | Unidade de negócio do vínculo | Obrigatório |
| `productId` | Produto vinculado | Obrigatório |
| `itemId` | Item de estoque vinculado | Obrigatório |
| `status` | Estado do vínculo | Obrigatório, `ACTIVE`, `INACTIVE` |
| `createdBy` | Autor do vínculo | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedBy` | Autor da atualização | Opcional |
| `updatedAt` | Data da atualização | Opcional |

---

## Success Criteria

- **SC-001**: 100% dos vínculos desativados permanecem preservados para histórico.
- **SC-002**: 100% das desativações registram autor e data de atualização.
- **SC-003**: 0% das desativações removem o vínculo do sistema.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Desvincular | Alterar o vínculo para INACTIVE sem excluir o registro |

---

## Summary

A capability **Unlink Product from Inventory Item** desativa vínculos entre produto e item sem excluir registros, preservando o histórico.

Ela impede novos usos do vínculo e permite reativação futura quando necessário.

---
