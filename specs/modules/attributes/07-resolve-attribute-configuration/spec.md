# Capability: Resolve Attribute Configuration

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

### User Story 1 - Listar atributos com resolução de cascata (P1)

Como **responsável pelo catálogo**,  
quero **listar atributos já resolvidos para um contexto**,  
para **exibir apenas o que é válido no cadastro de produtos**.

**Por que P1**: A listagem resolvida evita inconsistência no formulário de cadastro.

#### Acceptance Criteria

```gherkin
Scenario: Listar atributos globais sem contexto
  Given que existem atributos cadastrados
  When a listagem é solicitada sem vertical e sem categorias
  Then o sistema deve retornar os atributos globais sem resolução de cascata

Scenario: Listar atributos resolvidos para uma vertical
  Given que a vertical informada existe
  And que existem atributos vinculados à vertical
  When a listagem é solicitada informando a vertical
  Then o sistema deve retornar os atributos resolvidos com base na vertical

Scenario: Listar atributos resolvidos para uma cadeia de categorias
  Given que a vertical informada existe
  And que a cadeia de categorias informada pertence à vertical
  And que existem atributos vinculados à vertical
  When a listagem é solicitada informando a vertical e a cadeia de categorias
  Then o sistema deve retornar os atributos resolvidos com base na cascata

Scenario: Rejeitar listagem com cadeia de categorias inválida
  Given que a cadeia de categorias informada não forma uma relação pai-filho válida
  When a listagem é solicitada
  Then a consulta deve ser rejeitada
  And o sistema deve informar que a cadeia de categorias é inválida

Scenario: Listar atributos quando não há resultados
  Given que não existem atributos vinculados ao contexto solicitado
  When a listagem é solicitada
  Then a consulta deve ser rejeitada
  And o sistema deve informar que não há atributos para o contexto informado
```

---

### User Story 2 - Consultar um atributo com resolução de cascata (P2)

Como **responsável pelo catálogo**,  
quero **consultar um atributo específico já resolvido**,  
para **visualizar suas regras efetivas no contexto de uso**.

**Por que P2**: Permite inspeção precisa das regras aplicadas por vertical e categoria.

#### Acceptance Criteria

```gherkin
Scenario: Consultar atributo global por id
  Given que o atributo informado existe
  When a consulta é feita apenas com o id do atributo
  Then o sistema deve retornar o atributo global sem resolução de cascata

Scenario: Consultar atributo resolvido para uma vertical
  Given que o atributo informado existe
  And que o atributo está vinculado à vertical informada
  When a consulta é feita com o id do atributo e a vertical
  Then o sistema deve retornar o atributo resolvido para a vertical

Scenario: Rejeitar consulta quando o atributo não pertence à vertical
  Given que o atributo informado existe
  And que o atributo não está vinculado à vertical informada
  When a consulta é feita com o id do atributo e a vertical
  Then a consulta deve ser rejeitada
  And o sistema deve informar que o atributo não está disponível nesse contexto

Scenario: Consultar atributo resolvido para categoria filha
  Given que o atributo informado existe
  And que o atributo está vinculado à vertical informada
  And que a cadeia de categorias informada pertence à vertical
  When a consulta é feita com o id do atributo, a vertical e a cadeia de categorias
  Then o sistema deve retornar o atributo resolvido com base na cascata

Scenario: Consultar atributo do tipo option com valores permitidos
  Given que o atributo informado existe e é do tipo option
  When a consulta é feita com o id do atributo
  Then o sistema deve retornar os valores permitidos efetivos do atributo

Scenario: Rejeitar consulta com atributo inexistente
  Given que o atributo informado não existe
  When a consulta é feita
  Then a consulta deve ser rejeitada
  And o sistema deve informar que o atributo não foi encontrado
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir listar atributos globais sem informar vertical ou categorias.
- **FR-002**: O sistema **DEVE** permitir listar atributos resolvidos informando `verticalId`.
- **FR-003**: O sistema **DEVE** permitir listar atributos resolvidos informando `verticalId` e uma cadeia ordenada de categorias.
- **FR-004**: O sistema **DEVE** permitir consultar um atributo por `attributeId` sem informar vertical ou categorias.
- **FR-005**: O sistema **DEVE** permitir consultar um atributo por `attributeId` informando `verticalId`.
- **FR-006**: O sistema **DEVE** permitir consultar um atributo por `attributeId` informando `verticalId` e uma cadeia ordenada de categorias.
- **FR-007**: Quando `verticalId` for informado, o atributo **DEVE** estar vinculado à vertical; caso contrário, a consulta **DEVE** ser rejeitada.
- **FR-008**: A cadeia de categorias **DEVE** pertencer à vertical informada e respeitar a hierarquia pai-filho; caso contrário, a consulta **DEVE** ser rejeitada.
- **FR-009**: A resolução **DEVE** aplicar a seguinte ordem de precedência: categoria mais específica → categorias ancestrais → vertical → atributo global.
- **FR-010**: Para cada campo de regra (`isRequired`, `isMultiValue`, `minValue`, `maxValue`), o valor efetivo **DEVE** ser o primeiro definido na ordem de precedência.
- **FR-011**: Para valores permitidos de atributos do tipo `option`, o conjunto efetivo **DEVE** ser a união do conjunto herdado (ou subset explícito) com os valores adicionais do nível mais específico; valores já existentes em níveis superiores **DEVEM** prevalecer e não podem ser redefinidos.
- **FR-012**: Quando `minValue` e `maxValue` existirem no resultado, o sistema **DEVE** garantir que `minValue` seja menor ou igual a `maxValue`.
- **FR-013**: Quando nenhum nível definir `minValue` e `maxValue`, o sistema **DEVE** aplicar os defaults por tipo definidos na criação do atributo.
- **FR-014**: O `defaultValueId` **SÓ DEVE** ser retornado quando o atributo efetivo for do tipo `option`, obrigatório e não multivalor.
- **FR-015**: Em listagens com contexto de vertical ou categoria, o sistema **DEVE** retornar apenas atributos vinculados à vertical informada.
- **FR-016**: Na consulta de um atributo individual do tipo `option`, o sistema **DEVE** retornar os valores permitidos efetivos.
- **FR-017**: Quando não houver atributos no contexto solicitado, o sistema **DEVE** retornar not found.
- **FR-018**: Quando `attributeId` não existir, a consulta **DEVE** ser rejeitada.
- **FR-019**: A listagem **DEVE** ser ordenada por `code` em ordem ascendente.
- **FR-020**: A listagem **PODE** suportar paginação via `limit` e `offset`.

---

## Entity

### ResolvedAttribute

| Campo | Descrição | Regras |
| --- | --- | --- |
| `attributeId` | Identificador do atributo | Obrigatório |
| `name` | Nome do atributo | Obrigatório |
| `code` | Código do atributo | Obrigatório |
| `description` | Descrição do atributo | Obrigatório |
| `type` | Tipo do atributo | Obrigatório |
| `isMultiValue` | Indica se aceita múltiplos valores | Obrigatório |
| `isRequired` | Indica se o preenchimento é obrigatório | Obrigatório |
| `minValue` | Limite mínimo efetivo | Opcional |
| `maxValue` | Limite máximo efetivo | Opcional |
| `defaultValueId` | Valor padrão efetivo | Opcional |
| `allowedValues` | Valores permitidos efetivos | Opcional, apenas para `option` |

---

## Success Criteria

- **SC-001**: 100% das consultas com contexto inválido são rejeitadas.
- **SC-002**: 100% dos atributos retornados com contexto possuem regras efetivas resolvidas pela cascata.
- **SC-003**: 100% dos atributos retornados em contexto de vertical pertencem à vertical informada.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Cascata | Regra de herança entre atributo global, vertical, categoria pai e categoria filha |
| Resolved Attribute | Visão do atributo com regras efetivas após aplicar a cascata |
| Cadeia de categorias | Lista ordenada de categorias da raiz até a categoria mais específica |

---

## Summary

A capability **Resolve Attribute Configuration** permite listar e consultar atributos com regras efetivas resolvidas por cascata.

Ela garante que o catálogo exponha apenas atributos válidos para uma vertical ou cadeia de categorias, com limites e valores permitidos corretos.

---
