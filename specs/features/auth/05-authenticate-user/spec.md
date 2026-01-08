# Authenticate User

**Created**: 2025-12-29

**Project**: `specs/project.md`

## User Stories

### User Story 1 — Autenticar usuário ativo com credenciais válidas (P1)

Como **usuário**,

quero **me autenticar utilizando minhas credenciais**,

para que o sistema **possa identificar minha identidade de forma segura**.

**Por que P1**:

Sem autenticação, o sistema não consegue identificar a identidade nem iniciar fluxos protegidos.

### Acceptance Criteria

```gherkin
Scenario: Autenticar usuário ativo com credenciais válidas
  Given que existe um usuário com status ACTIVE
  And que o usuário possui credenciais válidas registradas
  When o usuário fornece credenciais corretas
  Then a autenticação deve ser realizada com sucesso
  And um token de autenticação deve ser emitido

```

---

### User Story 2 — Negar autenticação para usuário inativo (P1)

Como **sistema**,

quero **impedir autenticação de usuários inativos**,

para garantir controle administrativo e segurança.

**Por que P1**:

Usuários inativos não devem conseguir iniciar processos de autenticação.

### Acceptance Criteria

```gherkin
Scenario: Tentar autenticar usuário inativo
  Given que existe um usuário com status INACTIVE
  And que o usuário possui credenciais registradas
  When o usuário tenta se autenticar
  Then a autenticação deve ser negada
  And nenhum token deve ser emitido

```

---

### User Story 3 — Negar autenticação com credenciais inválidas (P1)

Como **sistema**,

quero **negar autenticação quando as credenciais forem inválidas**,

para evitar acesso não autorizado.

**Por que P1**:

Esse é o controle fundamental de segurança do processo de autenticação.

### Acceptance Criteria

```gherkin
Scenario: Tentar autenticar com credenciais inválidas
  Given que existe um usuário com status ACTIVE
  And que o usuário possui credenciais registradas
  When o usuário fornece credenciais incorretas
  Then a autenticação deve ser negada
  And nenhum token deve ser emitido

Scenario: Tentar autenticar com usuário inexistente
  Given que não existe uma identidade correspondente ao identificador informado
  When o usuário tenta se autenticar
  Then a autenticação deve ser negada
  And nenhum token deve ser emitido

Scenario: Tentar autenticar sem credenciais para o método informado
  Given que existe um usuário com status ACTIVE
  And que o usuário não possui credenciais registradas para o método informado
  When o usuário tenta se autenticar
  Then a autenticação deve ser negada
  And nenhum token deve ser emitido

```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir autenticação apenas para usuários existentes.
- **FR-002**: O sistema **DEVE** permitir autenticação apenas para usuários com status `ACTIVE`.
- **FR-003**: O sistema **DEVE** validar as credenciais fornecidas durante a autenticação.
- **FR-004**: O sistema **NÃO DEVE** autenticar usuários com credenciais inválidas.
- **FR-005**: O sistema **DEVE** emitir um token de autenticação quando a autenticação for bem-sucedida.
- **FR-006**: O sistema **NÃO DEVE** conceder permissões, autorizações ou acessos operacionais durante a autenticação.
- **FR-007**: O token emitido **DEVE** identificar unicamente a identidade autenticada.
- **FR-008**: O sistema **PODE** aplicar políticas adicionais de segurança durante a autenticação (ex: limitação de tentativas, bloqueios temporários).
- **FR-009**: A autenticação **NÃO DEVE** resolver, inferir ou carregar contexto de autorização.
- **FR-010**: A autenticação **DEVE** receber `identifier`, `authMethod` e `secret` como dados de entrada.
- **FR-011**: O `authMethod` **DEVE** pertencer ao catálogo de métodos habilitados (`PASSWORD`, `SSO`).
- **FR-012**: O `identifier` **DEVE** ser tratado como case-insensitive e seguir as regras de validação de credenciais.
- **FR-013**: O token **DEVE** expirar conforme política de expiração definida pelo contexto Auth, seguindo o padrão de segurança vigente.
- **FR-014**: O `identifier` **DEVE** seguir o padrão de **email** ou **username**.

---

## Entity

### AuthenticationToken

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do token | Obrigatório, único |
| `userId` | Identificador da identidade autenticada | Obrigatório |
| `issuedAt` | Data de emissão do token | Obrigatório |
| `expiresAt` | Data de expiração do token | Obrigatório |

**Relacionamentos**:

- Um token **DEVE** estar associado a exatamente uma identidade.
- Uma identidade **PODE** possuir múltiplos tokens válidos simultaneamente.

---

## Success Criteria

- **SC-001**: 100% das autenticações bem-sucedidas resultam na emissão de um token válido.
- **SC-002**: Usuários inativos não conseguem autenticar em 100% dos casos.
- **SC-003**: Credenciais inválidas nunca resultam em token emitido.
- **SC-004**: Autenticação não concede acesso operacional implícito.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Autenticação | Processo de verificação da identidade |
| Token de Autenticação | Artefato emitido após autenticação bem-sucedida |
| Credencial | Informação usada para provar identidade |

---

## Summary

A capability **Authenticate User** valida as credenciais de uma identidade ativa e emite um token de autenticação.

Ela existe exclusivamente para identificação segura da identidade, mantendo separação rigorosa entre autenticação, autorização e acesso operacional.
