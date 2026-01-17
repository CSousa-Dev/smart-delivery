# Capability: Attribute Value Validation

**Created**: 2026-01-09  
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

### User Story 1 - Validar valores de atributos por contexto (P1)

Como **responsável pelo cadastro de produtos**,  
quero **validar uma lista de atributos e valores considerando a cascata**,  
para **garantir consistência antes de persistir dados**.

**Por que P1**: Evita gravações inválidas e reduz retrabalho em múltiplas verticais.

#### Acceptance Criteria

```gherkin
Scenario: Validar valores com contexto completo
  Given que a vertical informada existe
  And que a cadeia de categorias é válida e pertence à vertical
  And que os atributos informados estão disponíveis no contexto
  When a validação é solicitada com valores compatíveis com as regras efetivas
  Then o sistema deve retornar que a lista é válida

Scenario: Validar valores sem contexto
  Given que existem atributos globais cadastrados
  When a validação é solicitada sem vertical e sem categorias
  Then o sistema deve validar usando apenas as regras globais do atributo

Scenario: Rejeitar cadeia de categorias inválida
  Given que a cadeia de categorias informada não forma uma relação pai-filho válida
  When a validação é solicitada
  Then a validação deve ser rejeitada
  And o sistema deve informar que a cadeia de categorias é inválida

Scenario: Informar erro quando atributo não está vinculado à vertical
  Given que a vertical informada existe
  And que o atributo informado não está vinculado à vertical
  When a validação é solicitada informando apenas a vertical
  Then o sistema deve retornar erro para esse atributo

Scenario: Validar atributo herdado da categoria pai
  Given que a vertical informada existe
  And que a cadeia de categorias é válida e pertence à vertical
  And que o atributo não está vinculado à categoria filha
  And que o atributo está vinculado a uma categoria pai na cadeia
  When a validação é solicitada
  Then o sistema deve validar usando as regras da categoria pai mais próxima

Scenario: Informar erro quando atributo não está em nenhuma camada do contexto
  Given que a vertical informada existe
  And que a cadeia de categorias é válida e pertence à vertical
  And que o atributo não está vinculado a nenhuma categoria da cadeia
  And que o atributo não está vinculado à vertical
  When a validação é solicitada
  Then o sistema deve retornar erro para esse atributo

Scenario: Retornar erros por valor inválido
  Given que o atributo informado existe e está disponível no contexto
  And que foram enviados múltiplos valores para esse atributo
  When um dos valores viola as regras do atributo
  Then o sistema deve retornar erro apenas para o valor inválido
  And manter o status dos demais valores
```

---

### User Story 2 - Sinalizar obrigatoriedade ausente (P2)

Como **responsável pelo cadastro de produtos**,  
quero **saber quando atributos obrigatórios não foram informados**,  
para **corrigir o preenchimento antes de continuar o fluxo**.

**Por que P2**: Evita inconsistência em dados essenciais do produto.

#### Acceptance Criteria

```gherkin
Scenario: Sinalizar atributo obrigatório ausente
  Given que o contexto possui atributos obrigatórios
  When a validação é solicitada sem informar um atributo obrigatório
  Then o sistema deve retornar erro indicando ausência do atributo

Scenario: Rejeitar lista em atributo não multivalor
  Given que o atributo informado não é multivalor
  When a validação é solicitada com lista de valores
  Then o sistema deve retornar erro indicando formato inválido

Scenario: Rejeitar item com campos de valor conflitantes
  Given que o atributo informado existe e está disponível no contexto
  When a validação é solicitada com `value` e `values` no mesmo item
  Then o sistema deve retornar erro indicando formato inválido
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** aceitar uma lista de itens de validação contendo `attributeId` e um valor informado.
- **FR-002**: `verticalId` e a cadeia ordenada de `categoryIds` **DEVEM** ser informados no nível da requisição e aplicados a todos os itens, sem repetição por item.
- **FR-003**: A validação **DEVE** permitir informar `verticalId` e `categoryIds`, ambos opcionais.
- **FR-004**: Quando `categoryIds` forem informados, `verticalId` **DEVE** ser informado e a cadeia **DEVE** pertencer à vertical, respeitando a hierarquia pai-filho; caso contrário, a validação **DEVE** ser rejeitada.
- **FR-005**: O sistema **DEVE** resolver as regras do atributo seguindo a cascata: categoria mais específica → categorias ancestrais → vertical → atributo global.
- **FR-006**: Quando `categoryIds` forem informados e o atributo não estiver vinculado a nenhuma categoria da cadeia, o sistema **DEVE** verificar vínculo na vertical; se não existir, **DEVE** retornar erro para esse atributo.
- **FR-007**: Quando `verticalId` for informado, o atributo **DEVE** estar vinculado à vertical; caso contrário, **DEVE** retornar erro para esse atributo.
- **FR-008**: Quando o atributo informado não existir, o sistema **DEVE** retornar erro para esse atributo.
- **FR-009**: Para atributos do tipo `option`, o valor informado **DEVE** ser um `allowedValueId`.
- **FR-010**: Para atributos que não são `option`, o valor informado **DEVE** ser texto e **DEVE** ser validado conforme o tipo do atributo.
- **FR-011**: Para `text`, o sistema **DEVE** validar o tamanho do texto entre `minValue` e `maxValue` efetivos.
- **FR-012**: Para `number`, o sistema **DEVE** validar que o texto representa um número inteiro válido e está entre `minValue` e `maxValue` efetivos.
- **FR-013**: Para `decimal`, o sistema **DEVE** validar que o texto representa um número decimal válido com separador `.` e está entre `minValue` e `maxValue` efetivos.
- **FR-014**: Para `date`, o sistema **DEVE** validar o formato ISO 8601 (`YYYY-MM-DD`).
- **FR-015**: Para `url`, o sistema **DEVE** validar que o valor é uma URL absoluta com `scheme` e `host`.
- **FR-016**: Para `boolean`, o sistema **DEVE** validar apenas os valores `true` ou `false`.
- **FR-017**: Para atributos do tipo `option`, o `allowedValueId` informado **DEVE** existir no conjunto de valores permitidos efetivos do atributo.
- **FR-018**: Somente atributos `isMultiValue=true` **DEVEM** aceitar listas de valores; atributos de valor único **NÃO DEVEM** aceitar listas.
- **FR-019**: Para atributos multivalor, cada valor **DEVE** ser validado individualmente e **DEVE** retornar erro por valor inválido.
- **FR-020**: Para cada item, **DEVE** ser informado exatamente um formato de valor: `value` ou `values` para atributos não `option`, `allowedValueId` ou `allowedValueIds` para atributos `option`; combinações ou ausência **DEVEM** gerar erro.
- **FR-021**: O sistema **DEVE** retornar erros por atributo/valor, sem interromper a validação dos demais itens da lista.
- **FR-022**: O sistema **DEVE** sinalizar ausência de atributos obrigatórios no contexto quando não forem informados ou estiverem vazios.
- **FR-023**: Quando o atributo for obrigatório e multivalor, uma lista vazia **DEVE** ser considerada inválida.
- **FR-024**: Quando não houver erros, o sistema **DEVE** retornar a lista como válida.
- **FR-025**: Um mesmo `attributeId` **NÃO DEVE** aparecer mais de uma vez na lista de validação; quando ocorrer, **DEVE** retornar erro de atributo duplicado.

---

## Entity

### AttributeValueValidationRequest

| Campo | Descrição | Regras |
| --- | --- | --- |
| `verticalId` | Vertical de contexto | Opcional |
| `categoryIds` | Cadeia ordenada de categorias | Opcional, exige `verticalId` |
| `items` | Lista de valores a validar | Obrigatório, não vazia |

**Regras de contexto**: `verticalId` e `categoryIds` são informados uma única vez e aplicados a todos os itens da lista.

### AttributeValueValidationItem

| Campo | Descrição | Regras |
| --- | --- | --- |
| `attributeId` | Atributo a validar | Obrigatório |
| `value` | Valor informado | Usado para tipos não `option` com valor único |
| `values` | Lista de valores | Usado para tipos não `option` com `isMultiValue=true` |
| `allowedValueId` | Valor permitido informado | Usado para tipo `option` com valor único |
| `allowedValueIds` | Lista de valores permitidos | Usado para tipo `option` com `isMultiValue=true` |

**Regras de formato**: cada item deve informar exatamente um dos campos de valor (`value`, `values`, `allowedValueId`, `allowedValueIds`), conforme o tipo do atributo e `isMultiValue`.

**Relacionamentos**: Cada item referencia um atributo que deve existir e estar disponível no contexto resolvido.

### AttributeValueValidationError

| Campo | Descrição | Regras |
| --- | --- | --- |
| `attributeId` | Atributo relacionado ao erro | Obrigatório |
| `value` | Valor que gerou o erro | Opcional, informado quando existir |
| `reason` | Motivo do erro | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% dos valores inválidos são identificados com erro por atributo/valor.
- **SC-002**: 100% das ausências de atributos obrigatórios são sinalizadas.
- **SC-003**: 100% das validações respeitam as regras efetivas resolvidas pela cascata.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Cascata | Regra de herança entre atributo global, vertical e categorias |
| Resolved Attribute | Atributo com regras efetivas após aplicar a cascata |
| Allowed Value | Valor permitido para atributos do tipo option |
| Erro de validação | Inconsistência identificada para um atributo/valor específico |

---

## Summary

A capability **Attribute Value Validation** valida listas de atributos e valores conforme as regras efetivas resolvidas por cascata.

Ela suporta diferentes verticais e categorias e retorna erros detalhados por atributo/valor, incluindo ausência de campos obrigatórios.

---
