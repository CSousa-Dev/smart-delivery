# Capability: Manage Business Unit Verticals

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

### User Story 1 - Vincular vertical à unidade de negócio (P1)

Como **owner da organização**,  
quero **vincular verticais da organização à unidade de negócio**,  
para **definir o tipo de operação daquela unidade**.

**Por que P1**: A unidade de negócio precisa operar apenas nas verticais permitidas pela organização.

#### Acceptance Criteria

```gherkin
Scenario: Vincular vertical válida à unidade de negócio
  Given que a unidade de negócio existe e pertence à organização
  And que o usuário é owner da organização
  And que a vertical está vinculada à organização como ativa
  When a vertical é vinculada à unidade de negócio
  Then o vínculo deve ser criado como ativo

Scenario: Reativar vínculo desativado
  Given que a unidade de negócio existe e pertence à organização
  And que o usuário é owner da organização
  And que a vertical está vinculada como inativa à unidade de negócio
  When a vertical é vinculada à unidade de negócio
  Then o vínculo deve ser reativado

Scenario: Rejeitar vínculo com vertical fora da organização
  Given que a unidade de negócio existe e pertence à organização
  And que o usuário é owner da organização
  And que a vertical informada não está vinculada à organização
  When a vertical é vinculada à unidade de negócio
  Then o vínculo deve ser rejeitado
  And o sistema deve informar que a vertical não pertence à organização

Scenario: Rejeitar vínculo com unidade de negócio inexistente
  Given que a unidade de negócio informada não existe
  When a vertical é vinculada
  Then o vínculo deve ser rejeitado
  And o sistema deve informar que a unidade de negócio não existe
```

---

### User Story 2 - Desvincular vertical da unidade de negócio (P2)

Como **owner da organização**,  
quero **desvincular uma vertical da unidade de negócio**,  
para **ajustar o escopo da unidade sem apagar histórico**.

**Por que P2**: A unidade pode reduzir seu escopo operacional mantendo rastreabilidade de vínculos.

#### Acceptance Criteria

```gherkin
Scenario: Desvincular vertical ativa da unidade de negócio
  Given que a unidade de negócio existe e pertence à organização
  And que a vertical está vinculada como ativa à unidade de negócio
  When a vertical é desvinculada da unidade de negócio
  Then o vínculo deve ser desativado

Scenario: Rejeitar desvínculo da última vertical ativa
  Given que a unidade de negócio existe e pertence à organização
  And que a unidade de negócio possui apenas uma vertical ativa
  When a vertical é desvinculada da unidade de negócio
  Then o sistema deve rejeitar a solicitação
  And o sistema deve informar que a unidade de negócio deve manter ao menos uma vertical ativa

Scenario: Desvincular vertical não vinculada
  Given que a unidade de negócio existe e pertence à organização
  And que a vertical não está vinculada à unidade de negócio
  When a vertical é desvinculada da unidade de negócio
  Then a solicitação deve ser rejeitada com erro de vínculo não encontrado
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir vincular verticais a uma unidade de negócio existente.
- **FR-002**: A vertical vinculada à unidade de negócio **DEVE** estar ativa na organização associada.
- **FR-003**: O vínculo **DEVE** ser criado como ativo.
- **FR-004**: O sistema **DEVE** permitir desativar o vínculo entre unidade de negócio e vertical, sem removê-lo definitivamente.
- **FR-005**: Se a vertical não pertencer à organização, o vínculo **DEVE** ser rejeitado.
- **FR-006**: Se a unidade de negócio não existir, a solicitação **DEVE** ser rejeitada.
- **FR-007**: A tentativa de desvincular uma vertical sem vínculo ativo **DEVE** ser rejeitada com erro de vínculo não encontrado (404).
- **FR-008**: O sistema **DEVE** permitir reativar um vínculo desativado por meio de nova solicitação de vínculo.
- **FR-009**: A unidade de negócio **DEVE** manter ao menos uma vertical ativa; se a solicitação remover a última vertical ativa, **DEVE** ser rejeitada.
- **FR-010**: A desvinculação de vertical **NÃO DEVE** remover o vínculo da unidade de negócio com a organização.
- **FR-011**: A solicitação **DEVE** ser feita pelo usuário owner da organização.

---

## Entity

### BusinessUnitVerticalLink

| Campo | Descrição | Regras |
| --- | --- | --- |
| `businessUnitId` | Unidade de negócio vinculada | Obrigatório |
| `organizationId` | Organização da unidade de negócio | Obrigatório |
| `verticalId` | Vertical vinculada | Obrigatório |
| `statusId` | Status do vínculo | Obrigatório, valores: `ACTIVE`, `INACTIVE` |
| `createdAt` | Data de criação do vínculo | Obrigatório |
| `updatedAt` | Data da última atualização do vínculo | Opcional |

**Relacionamentos**: Uma unidade de negócio pode possuir múltiplos vínculos com verticais; cada vínculo referencia uma vertical ativa na organização.

---

## Success Criteria

- **SC-001**: 100% dos vínculos criados respeitam as verticais ativas da organização.
- **SC-002**: 100% das solicitações de desvínculo preservam o histórico do vínculo.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Business Unit | Ponto de venda da organização |
| Organization | Negócio registrado pelo usuário |
| Vertical | Categoria de atuação do negócio |
| Business Unit Vertical Link | Vínculo entre unidade de negócio e vertical com status de ativação |

---

## Summary

A capability **Manage Business Unit Verticals** permite vincular, reativar e desativar verticais em uma unidade de negócio respeitando as verticais da organização.

Ela garante alinhamento do escopo da unidade com a organização sem exclusão definitiva de vínculos e preserva ao menos uma vertical ativa.

---
