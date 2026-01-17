# Invalidate Authorization (token revocation)

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Invalidar tokens de uma identidade (P1)

Como **sistema ou módulo interno**,

quero **invalidar tokens emitidos para uma identidade**,

para que acessos previamente autorizados sejam encerrados imediatamente.

**Por que P1**:

Quando credenciais são rotacionadas ou ocorre incidente de segurança, é necessário revogar tokens em uso.

### Acceptance Criteria

```gherkin
Scenario: Invalidar tokens de uma identidade
  Given que existem tokens emitidos para uma identidade
  When é solicitada a invalidação para essa identidade
  Then os tokens emitidos devem ser considerados revogados
  And verificações futuras devem negar acesso

Scenario: Tentar invalidar identidade sem informar identityId
  Given que é solicitada uma invalidação por identidade
  And que o identityId não foi informado
  When a solicitação é processada
  Then a invalidação deve ser rejeitada
  And o sistema deve informar erro de validação

```

---

### User Story 2 — Invalidar tokens globalmente (P2)

Como **sistema**,

quero **invalidar tokens de múltiplas identidades**,

para lidar com mudanças amplas de segurança.

**Por que P2**:

Rotação de chaves ou incidentes sistêmicos exigem revogação ampla.

### Acceptance Criteria

```gherkin
Scenario: Invalidar tokens globalmente
  Given que existem tokens previamente emitidos
  When é solicitada a invalidação global
  Then todos os tokens emitidos devem ser considerados revogados
  And verificações futuras devem negar acesso

```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** permitir a invalidação de tokens previamente emitidos.
- **FR-002**: A invalidação **DEVE** poder ser direcionada a uma identidade específica.
- **FR-003**: A invalidação **PODE** ser aplicada de forma global.
- **FR-004**: A invalidação **NÃO DEVE** conceder, revogar ou alterar acessos operacionais.
- **FR-005**: A invalidação **NÃO DEVE** interpretar semântica de domínio.
- **FR-006**: A invalidação **DEVE** apenas tornar tokens inválidos para verificações futuras.
- **FR-007**: A invalidação **NÃO DEVE** exigir recomputação imediata de qualquer estado externo.
- **FR-008**: A solicitação **DEVE** informar `scope` como `IDENTITY` ou `GLOBAL`.
- **FR-009**: Quando `scope = IDENTITY`, `identityId` **DEVE** ser informado.
- **FR-010**: Quando `scope = GLOBAL`, `identityId` **NÃO DEVE** ser informado.
- **FR-011**: O campo `reason` **PODE** ser informado para auditoria.
- **FR-012**: O `identityId` **DEVE** seguir o mesmo formato do `User.id`.

---

## Entity

### AuthorizationInvalidation

| Campo | Descrição | Regras |
| --- | --- | --- |
| `scope` | Escopo da invalidação | Valores: `IDENTITY`, `GLOBAL` |
| `identityId` | Identidade afetada | Obrigatório se scope = `IDENTITY`, formato de `User.id` |
| `invalidatedAt` | Data/hora da invalidação | Obrigatório |
| `reason` | Motivo da invalidação | Opcional |

**Observações**:

- Esta entity representa **um evento de revogação**, não regras de acesso.
- Nenhuma decisão de autorização é tomada no momento da invalidação.

---

## Success Criteria

- **SC-001**: Tokens revogados não são aceitos em verificações futuras.
- **SC-002**: Verificações após invalidação sempre negam acesso quando aplicável.
- **SC-003**: Nenhuma invalidação altera identidades ou acessos operacionais.
- **SC-004**: A invalidação não introduz estado de autorização no módulo.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Revogação de Token | Ato de invalidar tokens previamente emitidos |
| Escopo | Alcance da invalidação (identidade ou global) |

---

## Summary

A capability **Invalidate Authorization** permite revogar tokens emitidos, garantindo que verificações futuras neguem acesso quando apropriado.

Ela não altera acessos operacionais, não interpreta semântica de domínio e atua apenas como mecanismo técnico de revogação.
