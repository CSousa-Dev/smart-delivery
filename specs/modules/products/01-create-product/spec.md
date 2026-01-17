# Capability: Create Product

**Created**: 2026-01-11  
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

### User Story 1 - Criar produto com identidade comercial (P1)

Como **responsável pelo catálogo da unidade de negócio**,  
quero **cadastrar um produto com sua identidade comercial**,  
para **tornar o item vendável reconhecível no ecossistema**.

**Por que P1**: Sem produto criado não é possível associar preços, estoque ou disponibilidade.

#### Acceptance Criteria

```gherkin
Scenario: Criar produto com categoria e dados obrigatórios válidos
  Given que a categoria informada existe no módulo de atributos
  And que a categoria pertence a uma vertical habilitada na unidade de negócio
  And que não existe produto com o mesmo code na organização
  And que não existe produto com o mesmo title na unidade de negócio
  And que as imagens possuem exatamente uma principal e no máximo 4 no total
  When o produto é criado com categoryId, code, title, shortDescription, description e imagens
  Then o produto deve ser criado vinculado à organização e à unidade de negócio
  And o sistema deve registrar o autor da criação

Scenario: Rejeitar criação com categoria inexistente
  Given que a categoria informada não existe no módulo de atributos
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a categoria não existe

Scenario: Rejeitar criação com categoria fora da vertical da unidade
  Given que a categoria informada existe
  And que a categoria pertence a uma vertical não habilitada na unidade de negócio
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a categoria não pertence à vertical da unidade

Scenario: Rejeitar criação com code duplicado na organização
  Given que já existe um produto com o mesmo code na organização
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o code já está cadastrado na organização

Scenario: Rejeitar criação com title duplicado na unidade de negócio
  Given que já existe um produto com o mesmo title na unidade de negócio
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o title já está cadastrado na unidade

Scenario: Rejeitar criação com imagens inválidas
  Given que as imagens não possuem exatamente uma principal ou excedem 4 no total
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a configuração de imagens é inválida

Scenario: Rejeitar criação com unidade de negócio fora da organização
  Given que a unidade de negócio informada não pertence à organização informada
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a unidade de negócio é inválida para a organização
```

---

### User Story 2 - Informar atributos no cadastro (P2)

Como **responsável pelo catálogo**,  
quero **informar atributos do produto no momento da criação**,  
para **garantir que a identidade já nasça semanticamente consistente**.

**Por que P2**: Reduz retrabalho e inconsistência semântica no cadastro inicial.

#### Acceptance Criteria

```gherkin
Scenario: Criar produto com atributos válidos
  Given que a categoria informada possui atributos configurados no módulo de atributos
  And que todos os valores informados são válidos para a categoria
  When o produto é criado com atributos
  Then o produto deve ser criado com os atributos registrados

Scenario: Rejeitar criação com atributos inválidos
  Given que a categoria informada possui atributos configurados
  And que algum valor informado é inválido para a categoria
  When o produto é criado com atributos
  Then a criação deve ser rejeitada
  And o sistema deve informar que existem atributos inválidos

Scenario: Rejeitar criação sem atributos obrigatórios
  Given que a categoria informada possui atributos obrigatórios configurados
  And que nenhum valor é informado para esses atributos obrigatórios
  When o produto é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que existem atributos obrigatórios pendentes
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um produto com `organizationId`, `businessUnitId`, `categoryId`, `code`, `title`, `shortDescription`, `description`, `images` e `createdBy`.
- **FR-002**: A `businessUnitId` **DEVE** pertencer à `organizationId` informada.
- **FR-003**: O `categoryId` **DEVE** existir no módulo de atributos.
- **FR-004**: O `categoryId` **DEVE** pertencer a uma vertical habilitada na `businessUnitId`.
- **FR-005**: O `categoryId` **PODE** representar categoria ou subcategoria; o módulo **NÃO DEVE** depender de hierarquia.
- **FR-006**: A vertical do produto **DEVE** ser inferida pela categoria e **NÃO DEVE** ser informada diretamente na criação.
- **FR-007**: O `code` do produto **DEVE** ser único dentro da organização (case-insensitive).
- **FR-008**: O `title` do produto **DEVE** ser único dentro da unidade de negócio (case-insensitive).
- **FR-009**: O `title` **DEVE** ter entre 3 e 120 caracteres.
- **FR-010**: O `shortDescription` **DEVE** ter entre 10 e 160 caracteres.
- **FR-011**: O `description` **DEVE** ter entre 10 e 2000 caracteres.
- **FR-012**: O `code` **DEVE** ter entre 3 e 40 caracteres, **NÃO DEVE** conter espaços e **DEVE** aceitar apenas letras, números, `_` e `-`.
- **FR-013**: O produto **DEVE** possuir exatamente uma imagem principal e no máximo 4 imagens no total.
- **FR-014**: Cada imagem **DEVE** possuir `url` e `order`; `altText` **PODE** ser informado; `isPrimary` **DEVE** indicar a imagem principal.
- **FR-015**: O `order` das imagens **DEVE** ser único e variar entre 1 e 4.
- **FR-016**: Valores de atributos informados **DEVEM** ser validados contra a configuração da categoria no módulo de atributos.
- **FR-017**: Se a categoria exigir atributos obrigatórios, o produto **DEVE** informá-los na criação; caso contrário, a criação **DEVE** ser rejeitada.

---

## Entity

### Product

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do produto | Obrigatório, único |
| `organizationId` | Organização proprietária | Obrigatório |
| `businessUnitId` | Unidade de negócio proprietária | Obrigatório |
| `categoryId` | Categoria selecionada | Obrigatório, deve existir no módulo de atributos |
| `code` | Código do produto | Obrigatório, único por organização, 3-40 chars, sem espaços |
| `title` | Título comercial do produto | Obrigatório, único por unidade, 3-120 chars |
| `shortDescription` | Subtítulo do produto | Obrigatório, 10-160 chars |
| `description` | Descrição detalhada | Obrigatório, 10-2000 chars |
| `images` | Conjunto de imagens do produto | Obrigatório, 1 principal, máximo 4 |
| `attributes` | Valores de atributos da categoria | Obrigatório quando exigido pela categoria, deve ser válido, inclui marca quando aplicável |
| `createdBy` | Identificador do autor | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: Um produto pertence a uma organização, a uma unidade de negócio e a uma categoria. Um produto possui múltiplas imagens e pode possuir valores de atributos.

### ProductImage

| Campo | Descrição | Regras |
| --- | --- | --- |
| `url` | Endereço da imagem | Obrigatório |
| `order` | Ordem de exibição | Obrigatório, 1-4, único |
| `altText` | Texto alternativo | Opcional |
| `isPrimary` | Indicador de imagem principal | Obrigatório, exatamente uma imagem deve ser principal |

### ProductAttributeValue

| Campo | Descrição | Regras |
| --- | --- | --- |
| `attributeId` | Identificador do atributo | Obrigatório |
| `value` | Valor informado | Obrigatório, validado no módulo de atributos |

---

## Success Criteria

- **SC-001**: 100% dos produtos criados possuem categoria válida na vertical da unidade.
- **SC-002**: 100% das tentativas com `code` duplicado são rejeitadas.
- **SC-003**: 100% das tentativas com `title` duplicado na unidade são rejeitadas.
- **SC-004**: 100% das tentativas com imagens inválidas são rejeitadas.
- **SC-005**: 100% das tentativas com atributos inválidos são rejeitadas.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Produto | Identidade vendável criada para uso no catálogo |
| Categoria | Recorte funcional definido no módulo de atributos |
| Unidade de negócio | Contexto operacional da organização |
| Atributo | Propriedade semântica definida pela categoria |
| Imagem principal | Imagem usada como representação primária do produto |

---

## Summary

A capability **Create Product** cria a identidade comercial de um produto dentro de uma organização e unidade de negócio, vinculando-o a uma categoria válida do módulo de atributos.

Ela garante unicidade de code e title no escopo correto, valida imagens e atributos na criação e estabelece a base para demais capabilities do ciclo de vida do catálogo.

---
