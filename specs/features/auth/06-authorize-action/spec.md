# Authorize Action (can)

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Verificar autorização estrutural para uma ação (P1)

Como **módulo consumidor**,

quero **verificar se uma identidade autenticada está autorizada a executar uma ação em determinado nível**,

para que eu possa decidir localmente se a operação deve prosseguir.

**Por que P1**:

Sem essa verificação, módulos consumidores não conseguem aplicar controle de acesso de forma consistente e desacoplada.

### Acceptance Criteria

```gherkin
Scenario: Ação autorizada para identidade autenticada
  Given que existe uma identidade autenticada válida
  And que o módulo consumidor solicita verificação de autorização
  When a action e o level são informados
  And a verificação é delegada ao provedor de permissões
  And o provedor indica que a ação é permitida
  Then o resultado da autorização deve indicar permissão concedida

Scenario: Falha do provedor de permissões
  Given que existe uma identidade autenticada válida
  And que o módulo consumidor solicita verificação de autorização
  When a verificação é delegada ao provedor de permissões
  And o provedor não responde ou falha
  Then o resultado da autorização deve indicar permissão negada

```

---

### User Story 2 — Negar ação não autorizada (P1)

Como **sistema**,

quero **negar a autorização quando o provedor indicar que a ação não é permitida**,

para evitar execução fora das regras definidas.

### Acceptance Criteria

```gherkin
Scenario: Ação não autorizada
  Given que existe uma identidade autenticada válida
  And que o módulo consumidor solicita verificação de autorização
  When a action e o level são informados
  And o provedor de permissões indica que a ação não é permitida
  Then o resultado da autorização deve indicar permissão negada

Scenario: Action ou level inválidos
  Given que existe uma identidade autenticada válida
  When a action ou o level informados são inválidos
  Then a verificação deve ser rejeitada
  And o sistema deve informar erro de validação

```

---

### User Story 3 — Negar autorização sem identidade autenticada (P1)

Como **sistema**,

quero **negar autorização quando não existir identidade autenticada válida**,

para garantir que nenhuma decisão ocorra sem autenticação prévia.

### Acceptance Criteria

```gherkin
Scenario: Tentativa de autorização sem identidade autenticada
  Given que não existe identidade autenticada válida
  When é solicitada a verificação de autorização
  Then o resultado da autorização deve indicar permissão negada

```

---

## Functional Requirements

- **FR-001**: A verificação de autorização **DEVE** exigir uma identidade previamente autenticada.
- **FR-002**: A capability **DEVE** receber como entrada uma `action` e um `level`.
- **FR-003**: A capability **DEVE** delegar a decisão de autorização a um provedor de permissões.
- **FR-004**: A capability **DEVE** retornar apenas o resultado da verificação.
- **FR-005**: A capability **NÃO DEVE** expor permissões internas, grants ou regras.
- **FR-006**: A capability **NÃO DEVE** interpretar semântica de domínio.
- **FR-007**: A capability **NÃO DEVE** decidir comportamento de negócio.
- **FR-008**: A capability **NÃO DEVE** materializar, armazenar ou cachear estado de autorização.
- **FR-009**: A capability **NÃO DEVE** conceder, revogar ou inferir permissões.
- **FR-010**: A ausência de identidade autenticada **DEVE** resultar em autorização negada.
- **FR-011**: `action` **DEVE** seguir o padrão `namespace.verbo` em lowercase e separado por ponto (ex.: `create.user`).
- **FR-012**: `level` **DEVE** ser um dos valores: `view`, `create`, `update`, `delete`, `admin`.
- **FR-013**: `action` **DEVE** ter entre 3 e 80 caracteres e **NÃO DEVE** conter espaços.
- **FR-014**: Em caso de falha do provedor de permissões, a autorização **DEVE** ser negada.

---

## Entity

### AuthorizationResult

| Campo | Descrição | Regras |
| --- | --- | --- |
| `allowed` | Resultado da verificação | Boolean |
| `action` | Ação verificada | Obrigatório, formato `namespace.verbo`, sem espaços |
| `level` | Nível verificado | Obrigatório, valores: `view`, `create`, `update`, `delete`, `admin` |
| `checkedAt` | Data/hora da verificação | Obrigatório |

**Observações**:

- O resultado **não contém semântica de domínio**.
- O resultado **não contém permissões internas**.
- O resultado **não implica decisão automática de negócio**.

---

## Success Criteria

- **SC-001**: 100% das verificações retornam apenas resultado booleano consistente.
- **SC-002**: Nenhuma verificação ocorre sem identidade autenticada.
- **SC-003**: Nenhuma semântica de domínio é interpretada pelo Auth.
- **SC-004**: O Auth não mantém estado de autorização entre requisições.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Action | Representação estrutural da ação solicitada |
| Level | Nível estrutural associado à ação |
| Authorization Result | Resultado da verificação de autorização |
| Permissions Provider | Componente externo responsável por decidir permissões |

---

## Summary

A capability **Authorize Action (can)** orquestra a verificação de autorização estrutural para uma identidade autenticada, delegando a decisão a um provedor de permissões externo.

Ela não interpreta semântica, não expõe regras internas e não decide comportamento de negócio, atuando exclusivamente como contrato estrutural de autorização.
