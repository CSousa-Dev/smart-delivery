# Capability: Create Attribute

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

### User Story 1 - Criar atributo global para reutilização (P1)

Como **responsável pela configuração do catálogo**,  
quero **cadastrar um atributo global com nome, código e tipo**,  
para **reutilizá-lo em múltiplas verticais e categorias**.

**Por que P1**: Sem atributos globais não há base para estruturar o cadastro de produtos.

#### Acceptance Criteria

```gherkin
Scenario: Criar atributo com dados básicos
  Given que não existe atributo com o mesmo nome ou código
  When o atributo é criado com nome, código, descrição e tipo
  Then o atributo deve ser criado e ficar disponível para futuras vinculações

Scenario: Rejeitar criação com código duplicado
  Given que já existe um atributo com o mesmo código
  When o atributo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o código já está cadastrado

Scenario: Rejeitar criação com nome duplicado
  Given que já existe um atributo com o mesmo nome
  When o atributo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o nome já está cadastrado

Scenario: Rejeitar criação com código em formato inválido
  Given que o código não está em UPPERCASE com separação por _
  When o atributo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o formato do código é inválido

Scenario: Criar atributo do tipo option sem valores permitidos
  Given que não existe atributo com o mesmo nome ou código
  When o atributo é criado com tipo option
  Then o atributo deve ser criado mesmo sem valores permitidos
```

---

### User Story 2 - Definir regras básicas do atributo (P2)

Como **responsável pela configuração do catálogo**,  
quero **definir se o atributo é obrigatório, multivalor e seus limites**,  
para **orientar o cadastro de produtos nas próximas etapas**.

**Por que P2**: As regras básicas evitam ambiguidade e melhoram a consistência do cadastro.

#### Acceptance Criteria

```gherkin
Scenario: Criar atributo de texto com limite mínimo e máximo
  Given que não existe atributo com o mesmo nome ou código
  When o atributo de texto é criado com min e max
  Then o atributo deve ser criado com os limites de tamanho definidos

Scenario: Criar atributo numérico com faixa mínima e máxima
  Given que não existe atributo com o mesmo nome ou código
  When o atributo numérico é criado com min e max
  Then o atributo deve ser criado com os limites numéricos definidos

Scenario: Criar atributo com apenas limite mínimo
  Given que não existe atributo com o mesmo nome ou código
  When o atributo é criado informando apenas min
  Then o atributo deve ser criado com o limite mínimo definido

Scenario: Rejeitar limites inválidos
  Given que o valor mínimo informado é maior que o valor máximo
  When o atributo é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que os limites são inválidos

Scenario: Rejeitar default value para atributo não obrigatório
  Given que o atributo é criado como não obrigatório
  When o atributo é criado informando default value
  Then a criação deve ser rejeitada
  And o sistema deve informar que default value exige atributo obrigatório
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um atributo com `name`, `code`, `type`, `isMultiValue` e `isRequired`.
- **FR-002**: A `description` **DEVE** ser informada na criação do atributo.
- **FR-003**: O `code` do atributo **DEVE** estar em UPPERCASE com separação por `_`.
- **FR-004**: O `name` e o `code` do atributo **DEVEM** ser únicos globalmente.
- **FR-005**: O `type` **DEVE** ser um valor válido entre: `text`, `number`, `decimal`, `date`, `boolean`, `option`, `url`.
- **FR-006**: O atributo **DEVE** ser criado de forma global, independente de vertical ou categoria.
- **FR-007**: Para `text`, o sistema **PODE** aceitar `minValue` e `maxValue`, representando o tamanho mínimo e máximo do texto; quando ausentes, **DEVEM** usar defaults `minValue=1` e `maxValue=255`.
- **FR-008**: Para `number` e `decimal`, o sistema **PODE** aceitar `minValue` e `maxValue`, representando a faixa numérica permitida; quando ausentes, **DEVEM** usar defaults `minValue=-1000000` e `maxValue=1000000`.
- **FR-009**: Para `option`, `minValue` e `maxValue` **PODEM** representar o tamanho mínimo e máximo do `value` dos valores permitidos; quando ausentes, **DEVEM** usar defaults `minValue=1` e `maxValue=100`.
- **FR-010**: `minValue` e `maxValue` **PODEM** ser informados de forma independente.
- **FR-011**: Quando `minValue` e `maxValue` forem informados, o sistema **DEVE** garantir que `minValue` seja menor ou igual a `maxValue`.
- **FR-012**: Atributos do tipo `option` **PODEM** ser criados sem valores permitidos associados.
- **FR-013**: O `defaultValueId` **PODE** ser informado apenas quando o atributo for do tipo `option`, obrigatório e não multivalor.
- **FR-014**: Quando `defaultValueId` for informado, ele **DEVE** referenciar um valor permitido do próprio atributo.
- **FR-015**: Para atributos do tipo `url`, o sistema **DEVE** validar valores como URL absoluta (com `scheme` e `host`).
- **FR-016**: Para atributos do tipo `date`, o sistema **DEVE** validar valores no formato ISO 8601 (`YYYY-MM-DD`).

---

## Entity

### Attribute

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do atributo | Obrigatório, único |
| `name` | Nome do atributo | Obrigatório, único |
| `code` | Código do atributo | Obrigatório, único, UPPERCASE com `_` |
| `description` | Descrição do atributo | Obrigatório |
| `type` | Tipo do atributo | Obrigatório, valores: `text`, `number`, `decimal`, `date`, `boolean`, `option`, `url` |
| `isMultiValue` | Indica se aceita múltiplos valores | Obrigatório |
| `isRequired` | Indica se o preenchimento é obrigatório | Obrigatório |
| `minValue` | Limite mínimo do atributo | Opcional, aplicável a `text`, `number`, `decimal`, `option`; quando ausente, usa defaults por tipo |
| `maxValue` | Limite máximo do atributo | Opcional, aplicável a `text`, `number`, `decimal`, `option`; quando ausente, usa defaults por tipo |
| `defaultValueId` | Valor padrão do atributo | Opcional, aplicável a `option`, requer atributo obrigatório e não multivalor |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: O atributo é global e pode ser vinculado a verticais e categorias em capabilities específicas.

---

## Success Criteria

- **SC-001**: 100% dos atributos criados possuem `name` e `code` únicos.
- **SC-002**: 100% das tentativas de criação com formato de código inválido são rejeitadas.
- **SC-003**: 100% dos atributos criados ficam disponíveis para vinculação em verticais e categorias.
- **SC-004**: 100% das validações de valores para tipos `url` e `date` seguem os formatos definidos.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Attribute | Característica configurável e reutilizável, independente de produto |
| Allowed Value | Valor permitido para atributos do tipo option |
| Multi-value | Capacidade de um atributo aceitar mais de um valor |
| Required | Indicação de que o atributo deve ser preenchido |
| Vertical | Tipo de operação que define o universo de atributos e categorias |
| Category | Recorte funcional dentro de uma vertical |

---

## Summary

A capability **Create Attribute** permite cadastrar atributos globais com nome, código, tipo e regras básicas de preenchimento.

Ela estabelece a base configuracional para vinculação futura a verticais e categorias, habilitando o cadastro estruturado de produtos.

---
