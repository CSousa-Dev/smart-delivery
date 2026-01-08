# Invalidate Authorization

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Invalidar resultados de autorização para uma identidade (P1)

Como **sistema ou módulo administrador**,

quero **invalidar resultados de autorização previamente avaliados para uma identidade**,

para garantir que mudanças externas de permissões sejam refletidas em verificações futuras.

**Por que P1**:

Quando permissões mudam fora do Auth, resultados previamente avaliados podem se tornar inválidos e precisam ser descartados.

### Acceptance Criteria

```gherkin
Scenario: Invalidar autorizações de uma identidade
  Given que existe uma identidade previamente autenticada
  And que existem resultados de autorização previamente avaliados
  When é solicitada a invalidação de autorização para essa identidade
  Then os resultados de autorização previamente avaliados devem ser invalidados
  And verificações futuras devem forçar nova avaliação de autorização

Scenario: Tentar invalidar identidade sem informar identityId
  Given que é solicitada uma invalidação por identidade
  And que o identityId não foi informado
  When a solicitação é processada
  Then a invalidação deve ser rejeitada
  And o sistema deve informar erro de validação

```

---

### User Story 2 — Invalidar autorizações globalmente (P2)

Como **sistema**,

quero **invalidar resultados de autorização de múltiplas identidades**,

para lidar com mudanças amplas de permissões ou políticas.

**Por que P2**:

Alterações globais de permissões podem exigir invalidação ampla para garantir consistência.

### Acceptance Criteria

```gherkin
Scenario: Invalidar autorizações globalmente
  Given que existem resultados de autorização previamente avaliados
  When é solicitada a invalidação global de autorizações
  Then todos os resultados de autorização previamente avaliados devem ser invalidados
  And verificações futuras devem forçar nova avaliação de autorização

```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** permitir a invalidação de resultados de autorização previamente avaliados.
- **FR-002**: A invalidação **DEVE** poder ser direcionada a uma identidade específica.
- **FR-003**: A invalidação **PODE** ser aplicada de forma global.
- **FR-004**: A invalidação **NÃO DEVE** conceder, revogar ou alterar permissões.
- **FR-005**: A invalidação **NÃO DEVE** interpretar semântica de domínio.
- **FR-006**: A invalidação **DEVE** apenas forçar que verificações futuras realizem nova avaliação de autorização.
- **FR-007**: A invalidação **NÃO DEVE** depender do formato ou da origem das permissões.
- **FR-008**: A invalidação **NÃO DEVE** exigir recomputação imediata de autorizações.
- **FR-009**: A solicitação **DEVE** informar `scope` como `IDENTITY` ou `GLOBAL`.
- **FR-010**: Quando `scope = IDENTITY`, `identityId` **DEVE** ser informado.
- **FR-011**: Quando `scope = GLOBAL`, `identityId` **NÃO DEVE** ser informado.
- **FR-012**: O campo `reason` **PODE** ser informado para auditoria.
- **FR-013**: O `identityId` **DEVE** seguir o mesmo formato do `User.id`.

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

- Esta entity representa **um evento de invalidação**, não permissões.
- Nenhuma decisão de autorização é tomada no momento da invalidação.

---

## Success Criteria

- **SC-001**: Resultados de autorização invalidados não são reutilizados.
- **SC-002**: Verificações após invalidação sempre forçam nova decisão.
- **SC-003**: Nenhuma invalidação altera permissões ou identidades.
- **SC-004**: Invalidação não introduz estado de autorização no Auth.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Invalidação de Autorização | Ato de descartar resultados prévios de autorização |
| Resultado de Autorização | Decisão retornada por uma verificação `can` |
| Escopo | Alcance da invalidação (identidade ou global) |

---

## Summary

A capability **Invalidate Authorization** permite invalidar resultados de autorização previamente avaliados, garantindo que mudanças externas de permissões sejam refletidas em verificações futuras.

Ela não altera permissões, não interpreta semântica de domínio e não executa decisões de acesso, atuando exclusivamente como mecanismo de consistência e sincronização.
