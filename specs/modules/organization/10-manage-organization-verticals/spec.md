# Capability: Manage Organization Verticals

**Created**: 2026-01-17  
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

### User Story 1 - Vincular nova vertical à organização (P1)

Como **owner da organização**,  
quero **vincular novas verticais à organização**,  
para **ampliar o tipo de operação do negócio**.

**Por que P1**: A organização precisa evoluir seu escopo de atuação sem recriar seu cadastro.

#### Acceptance Criteria

```gherkin
Scenario: Vincular vertical válida à organização
  Given que a organização existe e o usuário é owner da organização
  And que a vertical informada está registrada no catálogo
  When a vertical é vinculada à organização
  Then o vínculo deve ser criado como ativo
  And a organização deve passar a listar a nova vertical

Scenario: Reativar vínculo desativado
  Given que a organização existe e o usuário é owner da organização
  And que a vertical está vinculada como inativa
  When a vertical é vinculada à organização
  Then o vínculo deve ser reativado

Scenario: Rejeitar vínculo com organização inexistente
  Given que a organização informada não existe
  When a vertical é vinculada
  Then o vínculo deve ser rejeitado
  And o sistema deve informar que a organização não existe

Scenario: Rejeitar vínculo com vertical não registrada
  Given que a organização existe e o usuário é owner da organização
  And que a vertical informada não está registrada no catálogo
  When a vertical é vinculada à organização
  Then o vínculo deve ser rejeitado
  And o sistema deve informar que a vertical não está registrada
```

---

### User Story 2 - Desvincular vertical da organização (P2)

Como **owner da organização**,  
quero **desvincular uma vertical da organização**,  
para **ajustar o escopo do negócio sem apagar histórico**.

**Por que P2**: O negócio pode reduzir sua operação e precisa desativar vínculos de forma controlada.

#### Acceptance Criteria

```gherkin
Scenario: Desvincular vertical ativa
  Given que a organização existe e o usuário é owner da organização
  And que a vertical está vinculada como ativa
  When a vertical é desvinculada da organização
  Then o vínculo deve ser desativado
  And a organização não deve mais listar a vertical como ativa

Scenario: Rejeitar desvínculo da última vertical ativa
  Given que a organização existe e o usuário é owner da organização
  And que a organização possui apenas uma vertical ativa
  When a vertical é desvinculada da organização
  Then o sistema deve rejeitar a solicitação
  And o sistema deve informar que a organização deve manter ao menos uma vertical ativa

Scenario: Desvincular vertical não vinculada
  Given que a organização existe e o usuário é owner da organização
  And que a vertical não está vinculada à organização
  When a vertical é desvinculada da organização
  Then a solicitação deve ser rejeitada com erro de vínculo não encontrado
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir vincular uma vertical registrada a uma organização existente.
- **FR-002**: O vínculo **DEVE** ser criado como ativo.
- **FR-003**: O sistema **DEVE** permitir desativar o vínculo entre organização e vertical, sem removê-lo definitivamente.
- **FR-004**: Uma organização **PODE** possuir mais de uma vertical ativa ao mesmo tempo.
- **FR-005**: Se a vertical não estiver registrada no catálogo, o vínculo **DEVE** ser rejeitado.
- **FR-006**: Se a organização não existir, a solicitação **DEVE** ser rejeitada.
- **FR-007**: A tentativa de desvincular uma vertical sem vínculo ativo **DEVE** ser rejeitada com erro de vínculo não encontrado (404).
- **FR-008**: O sistema **DEVE** permitir reativar um vínculo desativado por meio de nova solicitação de vínculo.
- **FR-009**: A organização **DEVE** manter ao menos uma vertical ativa; se a solicitação remover a última vertical ativa, **DEVE** ser rejeitada.
- **FR-010**: A solicitação **DEVE** ser feita pelo usuário owner da organização.

---

## Entity

### OrganizationVerticalLink

| Campo | Descrição | Regras |
| --- | --- | --- |
| `organizationId` | Organização vinculada | Obrigatório |
| `verticalId` | Vertical vinculada | Obrigatório |
| `statusId` | Status do vínculo | Obrigatório, valores: `ACTIVE`, `INACTIVE` |
| `createdAt` | Data de criação do vínculo | Obrigatório |
| `updatedAt` | Data da última atualização do vínculo | Opcional |

**Relacionamentos**: Uma organização pode possuir múltiplos vínculos com verticais; cada vínculo referencia uma vertical do catálogo.

---

## Success Criteria

- **SC-001**: 100% dos vínculos criados referenciam verticais registradas.
- **SC-002**: 100% das solicitações de desvínculo preservam o histórico do vínculo.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Organization | Negócio registrado pelo usuário |
| Vertical | Categoria de atuação do negócio |
| Organization Vertical Link | Vínculo entre organização e vertical com status de ativação |

---

## Summary

A capability **Manage Organization Verticals** permite vincular, reativar e desativar verticais de uma organização já existente.

Ela garante evolução controlada do escopo do negócio sem exclusão definitiva de vínculos e preserva ao menos uma vertical ativa.

---
