# Capability: Update/Deactivate Unit of Measure

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

### User Story 1 - Atualizar unidade de medida (P1)

Como **responsável pelo catálogo de estoque**,  
quero **atualizar o nome exibido e o status da unidade**,  
para **manter o catálogo consistente com a operação**.

**Por que P1**: O catálogo precisa refletir ajustes operacionais sem recriar unidades.

#### Acceptance Criteria

```gherkin
Scenario: Atualizar unidade de medida com dados válidos
  Given que a unidade existe na organização
  And que o novo name não está em uso na organização
  When a unidade é atualizada com name
  Then a unidade deve ser atualizada
  And o sistema deve registrar o autor da atualização

Scenario: Rejeitar atualização com unidade inexistente
  Given que a unidade informada não existe na organização
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que a unidade não existe

Scenario: Rejeitar atualização com name duplicado
  Given que já existe uma unidade com o mesmo name na organização
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o name já está cadastrado

Scenario: Rejeitar atualização com name inválido
  Given que o name informado está fora do tamanho permitido
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o name é inválido

Scenario: Rejeitar atualização com campos não permitidos
  Given que a unidade existe na organização
  When a atualização é solicitada com code, symbol ou allowsFraction
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o campo informado não pode ser alterado

Scenario: Rejeitar atualização sem campos atualizáveis
  Given que a unidade existe na organização
  When a atualização é solicitada sem name e sem status
  Then a atualização deve ser rejeitada
  And o sistema deve informar que nenhum campo atualizável foi informado

Scenario: Atualizar unidade inativa para ACTIVE
  Given que a unidade está INACTIVE
  When a atualização de status para ACTIVE é solicitada
  Then o status deve ser alterado para ACTIVE
  And o sistema deve registrar o autor da atualização

Scenario: Atualizar unidade apenas com status
  Given que a unidade está ACTIVE
  When a atualização de status para INACTIVE é solicitada
  Then o status deve ser alterado para INACTIVE
  And o sistema deve registrar o autor da atualização

Scenario: Rejeitar atualização com status inválido
  Given que o status informado não está entre ACTIVE ou INACTIVE
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o status é inválido

Scenario: Atualizar unidade com dados idênticos
  Given que a unidade existe na organização
  And que o name e o status informados são iguais aos atuais
  When a atualização é solicitada
  Then o sistema deve retornar o estado atual da unidade
  And não deve alterar updatedAt ou updatedBy
```

---

### User Story 2 - Desativar unidade de medida (P1)

Como **responsável pelo catálogo de estoque**,  
quero **desativar uma unidade de medida**,  
para **impedir novos usos sem afetar itens já cadastrados**.

**Por que P1**: Desativação evita novos cadastros indevidos sem quebrar histórico.

#### Acceptance Criteria

```gherkin
Scenario: Desativar unidade de medida ativa
  Given que a unidade está ativa
  When a desativação é solicitada
  Then o status deve ser alterado para INACTIVE
  And a unidade não deve ser removida do histórico

Scenario: Rejeitar desativação de unidade inexistente
  Given que a unidade informada não existe
  When a desativação é solicitada
  Then a desativação deve ser rejeitada
  And o sistema deve informar que a unidade não existe
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir atualizar uma unidade com `unitOfMeasureId`, `updatedBy` e pelo menos um dos campos: `name` ou `status`.
- **FR-002**: A unidade **DEVE** existir na organização para ser atualizada ou desativada.
- **FR-003**: O `code` **NÃO DEVE** ser alterado após a criação.
- **FR-004**: O `symbol` **NÃO DEVE** ser alterado após a criação.
- **FR-005**: `allowsFraction` **NÃO DEVE** ser alterado após a criação.
- **FR-006**: O `name` **DEVE** ser único na organização (case-insensitive).
- **FR-007**: Para validação de unicidade, o `name` **DEVE** ser normalizado com trim e comparação case-insensitive.
- **FR-008**: O `name` **DEVE** ter entre 2 e 60 caracteres.
- **FR-009**: O `status` **DEVE** aceitar apenas `ACTIVE` ou `INACTIVE`.
- **FR-010**: Quando `name` e `status` informados forem iguais aos atuais, a atualização **DEVE** ser idempotente e **NÃO DEVE** alterar `updatedAt` e `updatedBy`.
- **FR-011**: A desativação **DEVE** alterar o `status` para `INACTIVE` e **NÃO DEVE** remover a unidade.
- **FR-012**: Unidades `INACTIVE` **NÃO DEVEM** ser usadas em novos cadastros de itens ou na atualização da unidade de medida de itens existentes.
- **FR-013**: A desativação **NÃO DEVE** alterar itens já cadastrados nem movimentações históricas.

---

## Entity

### UnitOfMeasure

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade | Obrigatório, único |
| `organizationId` | Organização proprietária | Obrigatório |
| `code` | Código curto da unidade | Obrigatório, imutável |
| `name` | Nome descritivo | Obrigatório, único na organização |
| `symbol` | Símbolo exibido | Obrigatório |
| `allowsFraction` | Permite fracionamento | Obrigatório, boolean |
| `status` | Estado da unidade | Obrigatório, `ACTIVE`, `INACTIVE` |
| `createdBy` | Autor do cadastro | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedBy` | Autor da atualização | Opcional |
| `updatedAt` | Data de atualização | Opcional |

---

## Success Criteria

- **SC-001**: 100% das unidades inativas permanecem preservadas para histórico.
- **SC-002**: 0% dos novos itens são cadastrados com unidade inativa.
- **SC-003**: 100% das atualizações respeitam unicidade de nome.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Desativação | Bloqueio de novos usos sem remoção do registro |

---

## Summary

A capability **Update/Deactivate Unit of Measure** permite atualizar o nome e o status da unidade, além de desativá-la sem excluir registros usados no estoque.

Ela preserva histórico e impede novos usos de unidades inativas, mantendo a integridade do catálogo.

---
