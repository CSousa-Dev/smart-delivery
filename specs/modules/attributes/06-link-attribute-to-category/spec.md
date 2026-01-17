# Capability: Link Attribute to Category

**Created**: 2026-01-08  
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

### User Story 1 - Vincular atributo a uma categoria (P1)

Como **responsável pela configuração do catálogo**,  
quero **vincular um atributo a uma categoria**,  
para **refinar o uso do atributo dentro da vertical**.

**Por que P1**: Sem o vínculo, a categoria não consegue personalizar o uso dos atributos.

#### Acceptance Criteria

```gherkin
Scenario: Vincular atributo sem sobrescritas
  Given que a categoria informada existe
  And que o atributo informado existe
  And que o atributo está vinculado à vertical da categoria
  And que não existe vínculo entre esse atributo e essa categoria
  When o vínculo é criado sem sobrescritas
  Then o atributo deve ficar disponível na categoria com as regras herdadas

Scenario: Rejeitar vínculo duplicado
  Given que já existe vínculo entre o atributo e a categoria
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o vínculo já existe

Scenario: Rejeitar vínculo com categoria inexistente
  Given que a categoria informada não existe
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a categoria especificada não existe

Scenario: Rejeitar vínculo com atributo inexistente
  Given que o atributo informado não existe
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o atributo especificado não existe

Scenario: Rejeitar vínculo com atributo não vinculado à vertical
  Given que a categoria informada existe
  And que o atributo informado não está vinculado à vertical da categoria
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o atributo não pertence à vertical
```

---

### User Story 2 - Sobrescrever regras do atributo na categoria (P2)

Como **responsável pela configuração do catálogo**,  
quero **sobrescrever regras do atributo na categoria**,  
para **adequar o uso do atributo ao contexto daquela categoria**.

**Por que P2**: A categoria pode exigir limites e opções diferentes do padrão da vertical.

#### Acceptance Criteria

```gherkin
Scenario: Sobrescrever limites de um atributo
  Given que a categoria informada existe
  And que o atributo informado existe
  When o vínculo é criado com min e max específicos
  Then o atributo deve usar os limites definidos para a categoria

Scenario: Definir subset de valores permitidos da categoria
  Given que o atributo informado é do tipo option
  And que existem valores permitidos herdados para a categoria
  When o vínculo é criado informando apenas parte desses valores
  Then a categoria deve expor apenas os valores selecionados

Scenario: Adicionar valores permitidos específicos da categoria
  Given que o atributo informado é do tipo option
  When o vínculo é criado informando valores adicionais
  Then a categoria deve expor os valores herdados selecionados e os valores adicionais

Scenario: Rejeitar default value inválido
  Given que o atributo informado é do tipo option
  And que o vínculo informa um default value fora dos valores permitidos da categoria
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o default value é inválido

Scenario: Rejeitar valores permitidos com conflito
  Given que o vínculo informa valores adicionais com `name` ou `value` já presentes nos valores herdados da categoria pai ou da vertical
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que há conflito entre valores permitidos
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um vínculo entre `categoryId` e `attributeId`.
- **FR-002**: O vínculo **DEVE** ser único por combinação de `categoryId` e `attributeId`.
- **FR-003**: O atributo **DEVE** estar vinculado à vertical da categoria para que o vínculo seja criado.
- **FR-004**: O vínculo **PODE** ser criado sem sobrescritas, herdando as regras da categoria pai ou da vertical.
- **FR-005**: Qualquer regra não informada no vínculo **DEVE** ser herdada da categoria pai, da vertical ou do atributo global, nessa ordem.
- **FR-006**: O vínculo **PODE** sobrescrever `isRequired` e `isMultiValue` do atributo.
- **FR-007**: Para `text`, o vínculo **PODE** sobrescrever `minValue` e `maxValue`.
- **FR-008**: Para `number` e `decimal`, o vínculo **PODE** sobrescrever `minValue` e `maxValue`.
- **FR-009**: `minValue` e `maxValue` **PODEM** ser informados de forma independente.
- **FR-010**: Quando `minValue` e `maxValue` forem informados, o sistema **DEVE** garantir que `minValue` seja menor ou igual a `maxValue`.
- **FR-011**: O vínculo **PODE** definir um conjunto de valores permitidos para atributos do tipo `option`.
- **FR-012**: Se o vínculo não informar subset nem valores adicionais, a categoria **DEVE** herdar os valores da categoria pai, ou da vertical quando não houver pai.
- **FR-013**: Os valores permitidos da categoria **PODEM** ser um subconjunto dos valores herdados (exclusão explícita).
- **FR-014**: O vínculo **PODE** adicionar valores permitidos específicos da categoria.
- **FR-015**: O `name` e o `value` dos valores permitidos **DEVEM** ser únicos dentro do vínculo categoria-atributo.
- **FR-016**: O `defaultValueId` **PODE** ser informado apenas quando o atributo efetivo for do tipo `option`, obrigatório e não multivalor.
- **FR-017**: Quando `defaultValueId` for informado, ele **DEVE** pertencer aos valores permitidos disponíveis na categoria.
- **FR-018**: Na ausência de vínculo na categoria filha, a categoria **DEVE** herdar o atributo da categoria pai; na ausência de pai, herda da vertical; na ausência de regra na vertical, herda do atributo global.
- **FR-019**: Quando houver valores adicionais, o sistema **DEVE** rejeitar conflitos de `name` ou `value` com qualquer valor herdado da hierarquia acima.
- **FR-020**: O conjunto efetivo de valores permitidos na categoria **DEVE** ser a união do subset selecionado (ou do conjunto completo herdado) e dos valores adicionais, respeitando unicidade.

---

## Entity

### CategoryAttribute

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do vínculo | Obrigatório, único |
| `categoryId` | Categoria associada | Obrigatório |
| `attributeId` | Atributo associado | Obrigatório |
| `isRequired` | Obrigatoriedade na categoria | Opcional, quando ausente herda da categoria pai ou da vertical |
| `isMultiValue` | Multivalor na categoria | Opcional, quando ausente herda da categoria pai ou da vertical |
| `minValue` | Limite mínimo na categoria | Opcional, aplicável a `text`, `number`, `decimal` |
| `maxValue` | Limite máximo na categoria | Opcional, aplicável a `text`, `number`, `decimal` |
| `defaultValueId` | Valor padrão na categoria | Opcional, aplicável a `option`, requer atributo obrigatório e não multivalor |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

### CategoryAllowedValue

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do valor permitido | Obrigatório, único |
| `categoryAttributeId` | Vínculo categoria-atributo | Obrigatório |
| `name` | Nome amigável do valor permitido | Obrigatório, único por vínculo |
| `value` | Valor interno do permitido | Obrigatório, único por vínculo |
| `description` | Descrição do valor permitido | Opcional |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: Um vínculo categoria-atributo pode definir valores permitidos herdados e valores específicos da categoria.

---

## Success Criteria

- **SC-001**: 100% dos vínculos criados possuem `categoryId` e `attributeId` válidos e pertencentes à mesma vertical.
- **SC-002**: 100% dos vínculos sem sobrescritas herdam regras da categoria pai ou da vertical.
- **SC-003**: 100% dos default values informados pertencem aos valores permitidos da categoria.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Vertical | Tipo de operação que define o universo de atributos e categorias |
| Category | Recorte funcional dentro de uma vertical |
| Attribute | Característica configurável e reutilizável, independente de produto |
| Allowed Value | Valor permitido para atributos do tipo option |
| Category Attribute | Vínculo entre um atributo e uma categoria com regras específicas |

---

## Summary

A capability **Link Attribute to Category** cria o vínculo entre atributo e categoria e permite sobrescrever regras de uso do atributo nesse contexto.

Ela garante a herança em cascata entre vertical, categoria pai e categoria filha, habilitando ajustes locais sem perder o padrão global.

---
