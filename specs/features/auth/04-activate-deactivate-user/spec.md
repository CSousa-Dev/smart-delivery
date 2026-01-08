# Activate / Deactivate User

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Ativar um usuário existente (P1)

Como **administrador do sistema**,

quero **ativar um usuário existente**,

para permitir que ele **possa tentar se autenticar** no sistema.

**Por que P1**:

Sem ativação explícita, o sistema não consegue controlar quais identidades estão autorizadas a tentar autenticação.

### Acceptance Criteria

```gherkin
Scenario: Ativar um usuário inativo
  Given que existe um usuário com status INACTIVE
  When o administrador solicita a ativação do usuário
  Then o status do usuário deve ser alterado para ACTIVE
  And o usuário passa a estar apto a tentar autenticação

Scenario: Tentar ativar um usuário já ativo
  Given que existe um usuário com status ACTIVE
  When o administrador solicita a ativação do usuário
  Then nenhuma alteração deve ser realizada
  And o sistema deve manter o status atual
  And o sistema deve informar que nenhuma alteração foi necessária

Scenario: Tentar ativar um usuário inexistente
  Given que não existe um usuário com o identificador informado
  When o administrador solicita a ativação do usuário
  Then a operação deve ser rejeitada
  And o sistema deve informar que a identidade não existe

```

---

### User Story 2 — Desativar um usuário existente (P1)

Como **administrador do sistema**,

quero **desativar um usuário existente**,

para impedir imediatamente que ele tente se autenticar no sistema.

**Por que P1**:

A desativação é um mecanismo crítico de segurança e controle administrativo.

### Acceptance Criteria

```gherkin
Scenario: Desativar um usuário ativo
  Given que existe um usuário com status ACTIVE
  When o administrador solicita a desativação do usuário
  Then o status do usuário deve ser alterado para INACTIVE
  And qualquer tentativa futura de autenticação deve ser negada

Scenario: Tentar desativar um usuário já inativo
  Given que existe um usuário com status INACTIVE
  When o administrador solicita a desativação do usuário
  Then nenhuma alteração deve ser realizada
  And o status do usuário deve ser mantido
  And o sistema deve informar que nenhuma alteração foi necessária

Scenario: Tentar desativar um usuário inexistente
  Given que não existe um usuário com o identificador informado
  When o administrador solicita a desativação do usuário
  Then a operação deve ser rejeitada
  And o sistema deve informar que a identidade não existe

```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir ativar apenas usuários previamente criados.
- **FR-002**: O sistema **DEVE** permitir desativar apenas usuários previamente criados.
- **FR-003**: Um usuário com status `INACTIVE` **NÃO DEVE** conseguir se autenticar.
- **FR-004**: Um usuário com status `ACTIVE` **PODE** tentar se autenticar, desde que possua credenciais válidas.
- **FR-005**: A ativação ou desativação de um usuário **NÃO DEVE** criar, alterar ou remover credenciais.
- **FR-006**: A ativação ou desativação **NÃO DEVE** conceder, revogar ou alterar permissões, roles ou acessos operacionais.
- **FR-007**: O sistema **DEVE** preservar todos os vínculos e históricos do usuário ao desativá-lo.
- **FR-008**: O status do usuário **NÃO DEVE** ser interpretado como concessão de acesso operacional.
- **FR-009**: A ativação e a desativação **DEVEM** ser operações idempotentes.
- **FR-010**: A operação **DEVE** ser rejeitada quando o usuário não existir.

---

## Entity

### User

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da identidade | Obrigatório, único |
| `status` | Estado administrativo da identidade | Valores permitidos: `ACTIVE`, `INACTIVE` |
| `updatedAt` | Data da última alteração de status | Obrigatório |

**Relacionamentos**:

- Um usuário **PODE** possuir credenciais, independentemente do status.
- Um usuário **PODE** manter associações com tenants e business units mesmo quando inativo.

---

## Success Criteria

- **SC-001**: Usuários desativados não conseguem autenticar em 100% dos casos.
- **SC-002**: Ativações e desativações não afetam credenciais ou autorizações.
- **SC-003**: Identidade, associações e histórico do usuário são preservados após desativação.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Usuário Ativo | Identidade autorizada a tentar autenticação |
| Usuário Inativo | Identidade impedida de tentar autenticação |
| Ativação | Ato administrativo de habilitar uma identidade |

---

## Summary

A capability **Activate / Deactivate User** controla o estado administrativo de uma identidade, determinando se ela pode ou não tentar se autenticar no sistema.

Ela garante controle e segurança sem afetar identidade, credenciais, autorizações ou associações existentes.
