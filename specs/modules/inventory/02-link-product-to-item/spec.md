# Capability: Link Product to Inventory Item

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

### User Story 1 - Vincular produto a item de estoque (P1)

Como **responsável pela operação da unidade**,  
quero **vincular um produto a um item de estoque**,  
para **garantir que movimentações físicas reflitam vendas e produções do produto**.

**Por que P1**: Sem vínculo não há rastreabilidade entre produto e estoque.

#### Acceptance Criteria

```gherkin
Scenario: Vincular produto e item válidos na mesma unidade
  Given que o produto existe na unidade de negócio
  And que o item de estoque existe na mesma unidade de negócio
  When o vínculo é criado com productId e itemId
  Then o vínculo deve ser registrado
  And o sistema deve registrar o autor da criação

Scenario: Rejeitar vínculo com produto inexistente
  Given que o produto informado não existe
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o produto não existe

Scenario: Rejeitar vínculo com item inexistente
  Given que o item informado não existe
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o item não existe

Scenario: Rejeitar vínculo entre unidades diferentes
  Given que o produto pertence a uma unidade de negócio
  And que o item pertence a outra unidade de negócio
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que produto e item devem estar na mesma unidade

Scenario: Rejeitar vínculo quando o produto já está vinculado
  Given que o produto já possui vínculo ativo com outro item
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o produto já está vinculado

Scenario: Rejeitar vínculo quando o item já está vinculado
  Given que o item já possui vínculo ativo com outro produto
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o item já está vinculado

Scenario: Vincular produto e item já vinculados (idempotente)
  Given que já existe um vínculo ACTIVE entre o produto e o item
  When o vínculo é criado novamente
  Then o vínculo deve permanecer ACTIVE
  And o sistema não deve criar um novo registro

Scenario: Reativar vínculo inativo existente
  Given que já existe um vínculo INACTIVE entre o produto e o item
  When o vínculo é criado novamente
  Then o vínculo deve ser reativado com status ACTIVE
  And o sistema deve registrar o autor da atualização
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um vínculo com `productId`, `itemId`, `businessUnitId` e `createdBy`.
- **FR-002**: O `productId` **DEVE** existir no módulo de produtos.
- **FR-003**: O `itemId` **DEVE** existir no módulo de estoque.
- **FR-004**: O produto e o item **DEVEM** pertencer à mesma `businessUnitId`.
- **FR-005**: Um produto **NÃO DEVE** possuir mais de um vínculo ativo com itens de estoque.
- **FR-006**: Um item de estoque **NÃO DEVE** possuir mais de um vínculo ativo com produtos.
- **FR-007**: A relação entre produto e item **DEVE** ser 1:1 dentro da unidade de negócio.
- **FR-008**: O sistema **DEVE** impedir duplicidade de vínculo para o mesmo `productId` e `itemId`.
- **FR-009**: O vínculo **DEVE** possuir `status` com valores `ACTIVE` e `INACTIVE`.
- **FR-010**: Ao criar um vínculo, o status **DEVE** iniciar como `ACTIVE`.
- **FR-011**: Se já existir vínculo `INACTIVE` para o mesmo `productId` e `itemId`, a criação **DEVE** reativá-lo.
- **FR-012**: Na reativação, o sistema **DEVE** atualizar `updatedAt` e `updatedBy` e **NÃO DEVE** alterar `createdAt` e `createdBy`.
- **FR-013**: Se já existir vínculo `ACTIVE` para o mesmo `productId` e `itemId`, a criação **DEVE** ser idempotente e **NÃO DEVE** alterar `updatedAt` e `updatedBy`.

---

## Entity

### ProductItemLink

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do vínculo | Obrigatório, único |
| `businessUnitId` | Unidade de negócio do vínculo | Obrigatório |
| `productId` | Produto vinculado | Obrigatório |
| `itemId` | Item de estoque vinculado | Obrigatório, par `productId` + `itemId` único por unidade de negócio |
| `status` | Estado do vínculo | Obrigatório, `ACTIVE`, `INACTIVE` |
| `createdBy` | Autor do vínculo | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedBy` | Autor da atualização | Opcional |
| `updatedAt` | Data da atualização | Opcional |

**Relacionamentos**: Um vínculo conecta um produto do módulo de produtos a um item do módulo de estoque, dentro da mesma unidade de negócio.

---

## Success Criteria

- **SC-001**: 100% dos vínculos criados referenciam produto e item válidos.
- **SC-002**: 0% dos produtos possuem mais de um vínculo ativo simultâneo.
- **SC-003**: 100% dos vínculos registram autor e unidade de negócio.
- **SC-004**: 100% das reativações atualizam `updatedAt` e `updatedBy` sem alterar `createdAt` e `createdBy`.
- **SC-005**: 100% das tentativas de criar vínculo já ACTIVE são idempotentes e não geram novo registro.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Vínculo produto-item | Associação entre produto comercial e item físico de estoque |

---

## Summary

A capability **Link Product to Inventory Item** associa um produto do catálogo a um item físico do estoque dentro da mesma unidade de negócio e pode reativar um vínculo previamente desativado.

Ela garante que apenas um vínculo ativo exista por produto e item, preservando histórico e rastreabilidade de movimentações físicas.

---
