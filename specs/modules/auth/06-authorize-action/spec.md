# Authorize Access (verify identity)

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Verificar identidade autenticada a partir de token (P1)

Como **módulo consumidor**,

quero **verificar se um token representa uma identidade válida e ativa**,

para decidir localmente se o acesso deve ser permitido.

**Por que P1**:

Sem essa verificação, outros módulos não conseguem validar a identidade de forma consistente e desacoplada.

### Acceptance Criteria

```gherkin
Scenario: Token válido para identidade ativa
  Given que existe um token válido emitido para uma identidade ativa
  When o módulo consumidor solicita a verificação de acesso
  Then o resultado deve indicar acesso autorizado
  And o userId deve ser retornado

Scenario: Token inválido ou expirado
  Given que o token informado é inválido ou expirado
  When o módulo consumidor solicita a verificação de acesso
  Then o resultado deve indicar acesso negado

Scenario: Token revogado
  Given que o token informado foi revogado
  When o módulo consumidor solicita a verificação de acesso
  Then o resultado deve indicar acesso negado

Scenario: Identidade inativa
  Given que o token é válido
  And que a identidade associada está INACTIVE
  When o módulo consumidor solicita a verificação de acesso
  Then o resultado deve indicar acesso negado

```

---

### User Story 2 — Negar acesso quando não houver identidade válida (P1)

Como **sistema**,

quero **negar acesso quando não existir identidade válida**,

para garantir que nenhuma operação ocorra sem autenticação válida.

### Acceptance Criteria

```gherkin
Scenario: Token válido mas identidade inexistente
  Given que o token é válido
  And que não existe identidade correspondente
  When é solicitada a verificação de acesso
  Then o resultado deve indicar acesso negado

```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** receber um `token` como entrada obrigatória.
- **FR-002**: O token **DEVE** ser validado quanto à assinatura e expiração.
- **FR-003**: Tokens revogados **DEVEM** resultar em acesso negado.
- **FR-004**: A identidade associada ao token **DEVE** existir e estar `ACTIVE`.
- **FR-005**: A capability **DEVE** retornar apenas o resultado da verificação.
- **FR-006**: A capability **NÃO DEVE** interpretar regras de negócio ou regras de acesso.
- **FR-007**: A capability **NÃO DEVE** materializar, armazenar ou cachear decisões.
- **FR-008**: A ausência de identidade válida **DEVE** resultar em acesso negado.
- **FR-009**: Em caso de falha técnica na verificação do token, o acesso **DEVE** ser negado.

---

## Entity

### AccessAuthorizationResult

| Campo | Descrição | Regras |
| --- | --- | --- |
| `authorized` | Resultado da verificação | Boolean |
| `userId` | Identidade verificada | Obrigatório quando `authorized = true` |
| `checkedAt` | Data/hora da verificação | Obrigatório |

**Observações**:

- O resultado **não contém semântica de domínio**.
- O resultado **não contém regras internas de acesso**.
- O resultado **não implica decisão automática de negócio**.

---

## Success Criteria

- **SC-001**: 100% das verificações retornam resultado booleano consistente.
- **SC-002**: Nenhuma verificação autoriza acesso sem identidade ativa.
- **SC-003**: Nenhuma verificação interpreta regras de acesso ou domínio externo.
- **SC-004**: A verificação permanece stateless.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Autorização de Acesso | Verificação de token e identidade ativa |
| Access Authorization Result | Resultado da verificação de acesso |
| Token Revogado | Token explicitamente invalidado |

---

## Summary

A capability **Authorize Access** verifica um token e confirma se ele representa uma identidade existente e ativa.

Ela não avalia regras de acesso, não interpreta regras de negócio e opera de forma stateless, servindo apenas como verificação de identidade para módulos consumidores.
