# Capability: List Related Verticals

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

### User Story 1 - Listar verticais da organização (P1)

Como **responsável pelo módulo de organização**,  
quero **listar as verticais vinculadas a uma organização**,  
para **entender o escopo de atuação daquele negócio**.

**Por que P1**: A visibilidade das verticais da organização é essencial para decisões e validações.

#### Acceptance Criteria

```gherkin
Scenario: Listar verticais vinculadas à organização
  Given que a organização informada existe
  And que a organização possui verticais vinculadas
  When a listagem é solicitada pela organização
  Then o sistema deve retornar a lista de verticais
  And cada vertical deve conter seus dados básicos
  And deve incluir o status do vínculo de cada vertical
  And deve retornar verticais ativas e inativas

Scenario: Listagem vazia de verticais da organização
  Given que a organização informada existe
  And que a organização não possui verticais vinculadas
  When a listagem é solicitada pela organização
  Then o sistema deve retornar uma lista vazia

Scenario: Rejeitar listagem para organização inexistente
  Given que a organização informada não existe
  When a listagem é solicitada pela organização
  Then a listagem deve ser rejeitada
  And o sistema deve informar que a organização não existe
```

---

### User Story 2 - Listar verticais da unidade de negócio (P2)

Como **responsável pelo módulo de organização**,  
quero **listar as verticais vinculadas a uma unidade de negócio**,  
para **entender o escopo operacional daquela unidade**.

**Por que P2**: A unidade pode operar em um subconjunto das verticais da organização.

#### Acceptance Criteria

```gherkin
Scenario: Listar verticais vinculadas à unidade de negócio
  Given que a unidade de negócio informada existe
  And que a unidade de negócio possui verticais vinculadas
  When a listagem é solicitada pela unidade de negócio
  Then o sistema deve retornar a lista de verticais
  And cada vertical deve conter seus dados básicos
  And deve incluir o status do vínculo de cada vertical
  And deve retornar verticais ativas e inativas

Scenario: Listagem vazia de verticais da unidade de negócio
  Given que a unidade de negócio informada existe
  And que a unidade de negócio não possui verticais vinculadas
  When a listagem é solicitada pela unidade de negócio
  Then o sistema deve retornar uma lista vazia

Scenario: Rejeitar listagem para unidade de negócio inexistente
  Given que a unidade de negócio informada não existe
  When a listagem é solicitada pela unidade de negócio
  Then a listagem deve ser rejeitada
  And o sistema deve informar que a unidade de negócio não existe
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir listar as verticais vinculadas a uma organização pelo `organizationId`.
- **FR-002**: O sistema **DEVE** permitir listar as verticais vinculadas a uma unidade de negócio pelo `businessUnitId`.
- **FR-003**: Cada vertical retornada **DEVE** incluir `id`, `name`, `code`, `description` e `statusId` do vínculo.
- **FR-004**: A listagem **DEVE** retornar vínculos ativos e inativos.
- **FR-005**: Quando não houver verticais vinculadas, o sistema **DEVE** retornar uma lista vazia.
- **FR-006**: Se a organização ou a unidade de negócio não existir, a listagem **DEVE** ser rejeitada.

---

## Entity

### OrganizationVerticalListResult

| Campo | Descrição | Regras |
| --- | --- | --- |
| `organizationId` | Organização consultada | Obrigatório |
| `items` | Lista de verticais | Obrigatório, itens do tipo `VerticalSummary` |

### BusinessUnitVerticalListResult

| Campo | Descrição | Regras |
| --- | --- | --- |
| `businessUnitId` | Unidade de negócio consultada | Obrigatório |
| `organizationId` | Organização da unidade de negócio | Obrigatório |
| `items` | Lista de verticais | Obrigatório, itens do tipo `VerticalSummary` |

### VerticalSummary

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da vertical | Obrigatório |
| `name` | Nome da vertical | Obrigatório |
| `code` | Código da vertical | Obrigatório |
| `description` | Descrição da vertical | Obrigatório |
| `statusId` | Status do vínculo | Obrigatório, valores: `ACTIVE`, `INACTIVE` |

---

## Success Criteria

- **SC-001**: 100% das listagens retornam verticais consistentes com os vínculos existentes.
- **SC-002**: 100% das listagens vazias retornam lista vazia sem erro.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Organization | Negócio registrado pelo usuário |
| Business Unit | Ponto de venda da organização |
| Vertical | Categoria de atuação do negócio |

---

## Summary

A capability **List Related Verticals** permite listar verticais vinculadas a uma organização ou a uma unidade de negócio, incluindo vínculos ativos e inativos.

Ela dá visibilidade do escopo de atuação em cada nível do módulo de organização.

---
