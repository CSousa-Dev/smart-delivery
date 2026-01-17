# Capability: Link Attribute to Vertical

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

### User Story 1 - Vincular atributo a uma vertical (P1)

Como **responsável pela configuração do catálogo**,  
quero **vincular um atributo a uma vertical**,  
para **torná-lo disponível para uso nas categorias dessa vertical**.

**Por que P1**: Sem o vínculo, a vertical não consegue expor atributos para cadastro de produtos.

#### Acceptance Criteria

```gherkin
Scenario: Vincular atributo sem sobrescritas
  Given que a vertical informada existe
  And que o atributo informado existe
  And que não existe vínculo entre esse atributo e essa vertical
  When o vínculo é criado sem sobrescritas
  Then o atributo deve ficar disponível na vertical com as regras do atributo global

Scenario: Rejeitar vínculo duplicado
  Given que já existe vínculo entre o atributo e a vertical
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o vínculo já existe

Scenario: Rejeitar vínculo com vertical inexistente
  Given que a vertical informada não existe
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a vertical especificada não existe

Scenario: Rejeitar vínculo com atributo inexistente
  Given que o atributo informado não existe
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o atributo especificado não existe
```

---

### User Story 2 - Sobrescrever regras do atributo na vertical (P2)

Como **responsável pela configuração do catálogo**,  
quero **sobrescrever regras do atributo na vertical**,  
para **adequar o uso do atributo ao contexto daquela vertical**.

**Por que P2**: A mesma característica pode ter limites e obrigatoriedades diferentes por vertical.

#### Acceptance Criteria

```gherkin
Scenario: Sobrescrever limites de um atributo
  Given que a vertical informada existe
  And que o atributo informado existe
  When o vínculo é criado com min e max específicos
  Then o atributo deve usar os limites definidos para a vertical

Scenario: Definir subset de valores permitidos da vertical
  Given que o atributo informado é do tipo option
  And que o atributo possui valores permitidos globais
  When o vínculo é criado informando apenas parte desses valores
  Then a vertical deve expor apenas os valores selecionados

Scenario: Adicionar valores permitidos específicos da vertical
  Given que o atributo informado é do tipo option
  When o vínculo é criado informando valores adicionais
  Then a vertical deve expor os valores globais selecionados e os valores adicionais

Scenario: Rejeitar default value inválido
  Given que o atributo informado é do tipo option
  And que o vínculo informa um default value fora dos valores permitidos da vertical
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o default value é inválido

Scenario: Rejeitar valores permitidos com conflito
  Given que o vínculo informa valores adicionais com `name` ou `value` já presentes nos valores herdados do atributo
  When o vínculo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que há conflito entre valores permitidos
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um vínculo entre `verticalId` e `attributeId`.
- **FR-002**: O vínculo **DEVE** ser único por combinação de `verticalId` e `attributeId`.
- **FR-003**: O vínculo **PODE** ser criado sem sobrescritas, herdando todas as regras do atributo global.
- **FR-004**: Qualquer regra não informada no vínculo **DEVE** ser herdada do atributo global.
- **FR-005**: O vínculo **PODE** sobrescrever `isRequired` e `isMultiValue` do atributo.
- **FR-006**: Para `text`, o vínculo **PODE** sobrescrever `minValue` e `maxValue`.
- **FR-007**: Para `number` e `decimal`, o vínculo **PODE** sobrescrever `minValue` e `maxValue`.
- **FR-008**: `minValue` e `maxValue` **PODEM** ser informados de forma independente.
- **FR-009**: Quando `minValue` e `maxValue` forem informados, o sistema **DEVE** garantir que `minValue` seja menor ou igual a `maxValue`.
- **FR-010**: O vínculo **PODE** definir um conjunto de valores permitidos para atributos do tipo `option`.
- **FR-011**: Se o vínculo não informar subset nem valores adicionais, a vertical **DEVE** herdar todos os valores permitidos do atributo.
- **FR-012**: Os valores permitidos da vertical **PODEM** ser um subconjunto dos valores permitidos do atributo (exclusão explícita).
- **FR-013**: O vínculo **PODE** adicionar valores permitidos específicos da vertical.
- **FR-014**: O `name` e o `value` dos valores permitidos **DEVEM** ser únicos dentro do vínculo vertical-atributo.
- **FR-015**: O `defaultValueId` **PODE** ser informado apenas quando o atributo efetivo for do tipo `option`, obrigatório e não multivalor.
- **FR-016**: Quando `defaultValueId` for informado, ele **DEVE** pertencer aos valores permitidos disponíveis na vertical.
- **FR-017**: Quando houver valores adicionais, o sistema **DEVE** rejeitar conflitos de `name` ou `value` com qualquer valor herdado do atributo.
- **FR-018**: O conjunto efetivo de valores permitidos na vertical **DEVE** ser a união do subset selecionado (ou do conjunto completo herdado) e dos valores adicionais, respeitando unicidade.

---

## Entity

### VerticalAttribute

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do vínculo | Obrigatório, único |
| `verticalId` | Vertical associada | Obrigatório |
| `attributeId` | Atributo associado | Obrigatório |
| `isRequired` | Obrigatoriedade na vertical | Opcional, quando ausente herda do atributo |
| `isMultiValue` | Multivalor na vertical | Opcional, quando ausente herda do atributo |
| `minValue` | Limite mínimo na vertical | Opcional, aplicável a `text`, `number`, `decimal` |
| `maxValue` | Limite máximo na vertical | Opcional, aplicável a `text`, `number`, `decimal` |
| `defaultValueId` | Valor padrão na vertical | Opcional, aplicável a `option`, requer atributo obrigatório e não multivalor |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

### VerticalAllowedValue

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do valor permitido | Obrigatório, único |
| `verticalAttributeId` | Vínculo vertical-atributo | Obrigatório |
| `name` | Nome amigável do valor permitido | Obrigatório, único por vínculo |
| `value` | Valor interno do permitido | Obrigatório, único por vínculo |
| `description` | Descrição do valor permitido | Opcional |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: Um vínculo vertical-atributo pode definir valores permitidos herdados do atributo e valores específicos da vertical.

---

## Success Criteria

- **SC-001**: 100% dos vínculos criados possuem `verticalId` e `attributeId` válidos.
- **SC-002**: 100% dos vínculos sem sobrescritas herdam as regras do atributo global.
- **SC-003**: 100% dos default values informados pertencem aos valores permitidos da vertical.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Vertical | Tipo de operação que define o universo de atributos e categorias |
| Attribute | Característica configurável e reutilizável, independente de produto |
| Allowed Value | Valor permitido para atributos do tipo option |
| Vertical Attribute | Vínculo entre um atributo e uma vertical com regras específicas |

---

## Summary

A capability **Link Attribute to Vertical** cria o vínculo entre atributo e vertical e permite sobrescrever regras de uso do atributo nesse contexto.

Ela habilita a seleção e a extensão de valores permitidos, além de ajustes de obrigatoriedade e limites para cada vertical.

---
