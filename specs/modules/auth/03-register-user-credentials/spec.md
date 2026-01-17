# Register User Credentials

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Registrar credenciais para um usuário existente (P1)

Como **módulo interno**,

quero **registrar credenciais de autenticação para um usuário existente**,

para que essa identidade possa futuramente tentar se autenticar no sistema.

**Por que P1**:

Sem credenciais associadas, uma identidade existente não consegue realizar autenticação, mesmo estando ativa.

### Acceptance Criteria

```gherkin
Scenario: Registrar credenciais para um usuário existente
  Given que existe um usuário válido no sistema
  And que o usuário ainda não possui credenciais registradas para o método informado
  When é solicitado o registro de credenciais para esse usuário
  Then as credenciais devem ser registradas com sucesso
  And as credenciais devem ficar associadas ao usuário
  And o status do usuário não deve ser alterado
  And nenhuma autenticação ou sessão deve ser criada automaticamente

Scenario: Tentar registrar credenciais para um usuário inexistente
  Given que não existe um usuário com o identificador informado
  When é solicitado o registro de credenciais
  Then o registro deve ser rejeitado
  And o sistema deve informar que a identidade não existe

Scenario: Registrar credenciais para usuário INACTIVE
  Given que existe um usuário com status INACTIVE
  When é solicitado o registro de credenciais
  Then o registro deve ser realizado
  And o status do usuário deve permanecer INACTIVE

Scenario: Tentar registrar credenciais já existentes para o mesmo método
  Given que existe um usuário válido no sistema
  And que já existe credencial registrada para o método informado
  When é solicitado o registro de credenciais para esse usuário
  Then o registro deve ser rejeitado
  And o sistema deve informar que já existe credencial para o método

Scenario: Tentar registrar credenciais com segredo fraco
  Given que existe um usuário válido no sistema
  When é solicitado o registro de credenciais com segredo inválido
  Then o registro deve ser rejeitado
  And o sistema deve informar erro de validação

```

---

### User Story 2 — Atualizar credenciais existentes (P2)

Como **módulo interno**,

quero **atualizar credenciais de autenticação existentes**,

para permitir troca de segredo, recuperação de acesso ou mudança controlada de método de login.

**Por que P2**:

Credenciais precisam ser rotacionáveis ao longo do tempo sem recriar identidades.

### Acceptance Criteria

```gherkin
Scenario: Atualizar credenciais existentes
  Given que existe um usuário válido no sistema
  And que o usuário possui credenciais previamente registradas para um método específico
  When é solicitada a atualização das credenciais desse método
  Then as credenciais anteriores do mesmo método devem ser substituídas
  And apenas as novas credenciais devem ser consideradas válidas
  And nenhuma autenticação ou sessão deve ser criada automaticamente
  And o identificador de login deve ser preservado
  And o status do usuário não deve ser alterado

Scenario: Tentar atualizar credenciais inexistentes
  Given que existe um usuário válido no sistema
  And que o usuário não possui credenciais registradas para o método informado
  When é solicitada a atualização das credenciais desse método
  Then a atualização deve ser rejeitada
  And o sistema deve informar que não há credenciais para o método

```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir o registro de credenciais apenas para usuários previamente criados.
- **FR-002**: O sistema **DEVE** associar cada credencial a exatamente um usuário.
- **FR-003**: O sistema **NÃO DEVE** autenticar o usuário automaticamente após o registro ou atualização de credenciais.
- **FR-004**: O sistema **DEVE** permitir a atualização de credenciais existentes.
- **FR-005**: O sistema **DEVE** garantir que exista no máximo uma credencial por usuário para cada método de autenticação.
- **FR-006**: O sistema **PODE** suportar múltiplos métodos de autenticação por usuário (ex: senha, link, SSO).
- **FR-007**: O registro ou atualização de credenciais **NÃO DEVE** criar sessão, token ou estado autenticado.
- **FR-008**: O registro e a atualização **DEVEM** ser permitidos para usuários `INACTIVE` e `ACTIVE`.
- **FR-009**: O `loginIdentifier` **DEVE** ser único no sistema para cada `authMethod` (case-insensitive).
- **FR-010**: O `loginIdentifier` **DEVE** ter entre 3 e 120 caracteres e **NÃO DEVE** conter espaços.
- **FR-011**: O `authMethod` **DEVE** pertencer ao catálogo de métodos habilitados (`PASSWORD`, `SSO`).
- **FR-012**: O registro **DEVE** ser rejeitado quando já existir credencial para o mesmo método.
- **FR-013**: A atualização **DEVE** ser rejeitada quando não existir credencial para o método informado.
- **FR-014**: O `loginIdentifier` **DEVE** ser o mesmo identificador lógico do usuário.
- **FR-015**: A atualização de credenciais **DEVE** substituir apenas o `secret`, mantendo `loginIdentifier` e `authMethod`.
- **FR-016**: O `secret` **DEVE** ter no mínimo 8 caracteres e conter ao menos 1 letra minuscula, 1 letra maiuscula, 1 numero e 1 caractere especial.
- **FR-017**: O registro ou atualização de credenciais **NÃO DEVE** alterar o status do usuário.

---

## Entity

### UserCredential

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da credencial | Obrigatório, único |
| `userId` | Referência à identidade do usuário | Obrigatório |
| `authMethod` | Método de autenticação | Obrigatório, valores controlados |
| `loginIdentifier` | Identificador de login (email ou username do usuario) | Obrigatório, único por método, case-insensitive, sem espaços |
| `secret` | Segredo de autenticação | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**:

- Um usuário **PODE** possuir múltiplas credenciais, desde que cada uma seja de um método distinto.
- Cada credencial **DEVE** pertencer a exatamente um usuário.
- Para cada par (`userId`, `authMethod`), **DEVE existir no máximo uma credencial ativa**.
- Para cada par (`loginIdentifier`, `authMethod`), **DEVE existir no máximo uma credencial ativa**.

---

## Success Criteria

- **SC-001**: 100% das credenciais registradas estão associadas a usuários válidos.
- **SC-002**: Credenciais duplicadas para o mesmo método não são aceitas.
- **SC-003**: Atualizações de credenciais substituem completamente as credenciais anteriores do mesmo método.
- **SC-004**: Nenhum registro ou atualização de credencial gera autenticação implícita.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Credencial | Conjunto de dados usado para autenticar uma identidade |
| Método de Autenticação | Forma pela qual a identidade prova quem é |
| Identificador de Login | Dado utilizado no processo de autenticação |

---

## Summary

A capability **Register User Credentials** permite registrar e atualizar os meios pelos quais uma identidade pode se autenticar no sistema.

Ela separa claramente identidade de autenticação, garantindo segurança, controle explícito e evolução futura do modelo de acesso sem efeitos colaterais.
Credenciais válidas são **pré-requisito para ativação** da identidade.
