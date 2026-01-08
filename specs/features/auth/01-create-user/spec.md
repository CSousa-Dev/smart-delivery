# Create User

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Criar identidade de usuário (P1)

Como **administrador do sistema**,

quero **criar uma identidade de usuário única**,

para que essa identidade possa futuramente ser utilizada em processos de autenticação e autorização.

**Por que P1**:

Sem a existência de uma identidade, nenhuma outra capability do módulo Auth pode operar.

### Acceptance Criteria

```gherkin
Scenario: Criar um usuário com dados válidos
  Given que não existe um usuário com o mesmo identificador único
  When o administrador solicita a criação de um novo usuário
  Then uma identidade de usuário deve ser criada
  And o usuário deve possuir um status inicial definido
  And o usuário não deve possuir credenciais registradas
  And o usuário não deve possuir associações ou acessos operacionais

Scenario: Tentar criar um usuário com identificador já existente
  Given que já existe um usuário com o mesmo identificador único
  When o administrador solicita a criação de um novo usuário
  Then a criação deve ser rejeitada
  And o sistema deve informar que a identidade já existe

Scenario: Tentar criar um usuário com dados inválidos
  Given que o identificador ou o nome estão vazios ou inválidos
  When o administrador solicita a criação de um novo usuário
  Then a criação deve ser rejeitada
  And o sistema deve informar erro de validação

```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir a criação de um usuário como identidade única.
- **FR-002**: O identificador lógico do usuário **DEVE** ser único no sistema.
- **FR-003**: O usuário criado **DEVE** possuir um status inicial definido.
- **FR-004**: O sistema **NÃO DEVE** conceder permissões, roles ou acesso operacional durante a criação do usuário.
- **FR-005**: A criação de um usuário **NÃO DEVE** associá-lo automaticamente a tenants ou business units.
- **FR-006**: A criação de um usuário **NÃO DEVE** registrar credenciais de autenticação.
- **FR-007**: O sistema **DEVE** impedir a criação de identidades duplicadas.
- **FR-008**: O status inicial do usuário **DEVE** ser `INACTIVE`.
- **FR-009**: O identificador lógico **DEVE** ser normalizado para comparação e tratado como **case-insensitive** para unicidade.
- **FR-010**: O identificador lógico **DEVE** ter entre 3 e 120 caracteres e **NÃO DEVE** conter espaços.
- **FR-011**: O identificador lógico **DEVE** seguir o padrão de **email** ou **username**.
- **FR-012**: O nome **DEVE** ter entre 2 e 120 caracteres após normalização e **NÃO DEVE** ser vazio.

📌 *A ativação da identidade é responsabilidade de outra capability.*

---

## Entity

### User

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da identidade | Obrigatório, único |
| `identifier` | Identificador lógico (email ou username) | Obrigatório, único, 3-120 chars, sem espaços, case-insensitive |
| `name` | Nome exibido do usuário | Obrigatório, 2-120 chars, não vazio |
| `status` | Estado administrativo da identidade | Valores permitidos: `ACTIVE`, `INACTIVE` |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Observações importantes**:

- No momento da criação:
    - o usuário **não possui** credenciais
    - o usuário **não possui** associações
    - o usuário **não possui** grants ou permissões
- Qualquer vínculo futuro ocorre **exclusivamente via outras capabilities**.

---

## Success Criteria

- **SC-001**: 100% dos usuários criados possuem identificador único.
- **SC-002**: 100% dos usuários criados possuem status inicial `INACTIVE`.
- **SC-003**: Nenhum usuário criado possui acesso operacional implícito.
- **SC-004**: Tentativas de criação duplicada são rejeitadas de forma consistente.
- **SC-005**: Tentativas de criação com dados inválidos são rejeitadas de forma consistente.

---

## Glossary

| Termo | Definição |
| --- | --- |
| User | Identidade administrativa e autenticável |
| Identidade | Representação única de uma pessoa no sistema |
| Status | Estado administrativo que controla autenticação |

---

## Summary

A capability **Create User** cria uma identidade única no sistema, sem conceder qualquer tipo de acesso, autenticação ou autorização.

Ela estabelece a base sobre a qual todas as demais capabilities do módulo Auth operam, mantendo separação rigorosa entre identidade, autenticação e acesso.
