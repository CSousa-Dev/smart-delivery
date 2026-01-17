# Capability: Create Category

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

### User Story 1 - Criar categoria dentro de uma vertical (P1)

Como **responsável pela configuração do catálogo**,  
quero **cadastrar uma categoria vinculada a uma vertical**,  
para **organizar produtos por recortes funcionais**.

**Por que P1**: Sem categorias não é possível orientar o cadastro de produtos dentro de uma vertical.

#### Acceptance Criteria

```gherkin
Scenario: Criar categoria raiz com dados obrigatórios
  Given que a vertical informada existe
  And que não existe categoria com o mesmo nome ou código na vertical
  When a categoria é criada sem categoria pai
  Then a categoria deve ser criada vinculada à vertical

Scenario: Rejeitar criação com vertical inexistente
  Given que a vertical informada não existe
  When a categoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que a vertical especificada não existe

Scenario: Rejeitar criação com código duplicado na mesma vertical
  Given que já existe uma categoria com o mesmo código na vertical
  When a categoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o código já está cadastrado na vertical

Scenario: Rejeitar criação com nome duplicado na mesma vertical
  Given que já existe uma categoria com o mesmo nome na vertical
  When a categoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o nome já está cadastrado na vertical

Scenario: Rejeitar criação com código em formato inválido
  Given que o código não está em UPPERCASE com separação por _
  When a categoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o formato do código é inválido
```

---

### User Story 2 - Criar subcategoria (P2)

Como **responsável pela configuração do catálogo**,  
quero **criar subcategorias**,  
para **refinar a organização dos produtos dentro da vertical**.

**Por que P2**: Subcategorias melhoram a navegação e a precisão no cadastro.

#### Acceptance Criteria

```gherkin
Scenario: Criar subcategoria com categoria pai válida
  Given que a vertical informada existe
  And que a categoria pai informada existe na mesma vertical
  And que não existe categoria com o mesmo nome ou código na vertical
  When a subcategoria é criada com categoria pai
  Then a categoria deve ser criada como filha da categoria pai

Scenario: Rejeitar criação quando a categoria pai é de outra vertical
  Given que a vertical informada existe
  And que a categoria pai informada pertence a outra vertical
  When a subcategoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que a categoria pai pertence a outra vertical

Scenario: Rejeitar criação ao exceder o limite de profundidade
  Given que a categoria pai já está no nível máximo permitido
  When a subcategoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o limite de profundidade foi excedido

Scenario: Rejeitar criação que gere ciclo na hierarquia
  Given que a categoria pai informada gera ciclo na hierarquia
  When a subcategoria é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que a hierarquia não pode conter ciclos
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar uma categoria com `name`, `code`, `description` e `verticalId`.
- **FR-002**: O `code` da categoria **DEVE** estar em UPPERCASE com separação por `_`.
- **FR-003**: O `name` e o `code` da categoria **DEVEM** ser únicos por `verticalId`.
- **FR-004**: A categoria **DEVE** pertencer a uma vertical existente.
- **FR-005**: A categoria **PODE** ser criada sem `parentCategoryId` (categoria raiz).
- **FR-006**: Quando `parentCategoryId` for informado, a categoria pai **DEVE** pertencer à mesma vertical.
- **FR-007**: O sistema **DEVE** limitar a profundidade da hierarquia de categorias a 3 níveis.
- **FR-008**: O sistema **DEVE** impedir ciclos na hierarquia de categorias.

---

## Entity

### Category

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da categoria | Obrigatório, único |
| `verticalId` | Vertical da categoria | Obrigatório |
| `parentCategoryId` | Categoria pai | Opcional, não pode gerar ciclo |
| `name` | Nome da categoria | Obrigatório, único por vertical |
| `code` | Código da categoria | Obrigatório, único por vertical, UPPERCASE com `_` |
| `description` | Descrição da categoria | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: Uma categoria pertence a uma vertical e pode possuir uma categoria pai.

---

## Success Criteria

- **SC-001**: 100% das categorias criadas possuem `name` e `code` únicos dentro da vertical.
- **SC-002**: 100% das tentativas de criação com vertical inexistente são rejeitadas.
- **SC-003**: 100% das tentativas de criação que excedem o limite de profundidade são rejeitadas.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Vertical | Tipo de operação que define o universo de atributos e categorias |
| Category | Recorte funcional dentro de uma vertical |
| Subcategory | Categoria que possui uma categoria pai |

---

## Summary

A capability **Create Category** permite cadastrar categorias vinculadas a uma vertical, com suporte a hierarquia de até três níveis.

Ela organiza o catálogo por recortes funcionais e prepara a base para cadastro estruturado de produtos.

---
