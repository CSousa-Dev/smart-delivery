# Capability: Create Vertical

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

### User Story 1 - Criar vertical com identificação clara (P1)

Como **responsável pela configuração do catálogo**,  
quero **cadastrar uma vertical com nome, código e descrição**,  
para **definir o universo de configuração de atributos e categorias**.

**Por que P1**: Sem vertical não é possível organizar o catálogo por tipo de negócio.

#### Acceptance Criteria

```gherkin
Scenario: Criar vertical com dados obrigatórios
  Given que não existe vertical com o mesmo nome ou código
  When a vertical é criada com nome, código e descrição
  Then a vertical deve ser criada

Scenario: Rejeitar criação com código duplicado
  Given que já existe uma vertical com o mesmo código
  When a vertical é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o código já está cadastrado

Scenario: Rejeitar criação com nome duplicado
  Given que já existe uma vertical com o mesmo nome
  When a vertical é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o nome já está cadastrado

Scenario: Rejeitar criação com código em formato inválido
  Given que o código não está em UPPERCASE com separação por _
  When a vertical é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o formato do código é inválido

Scenario: Rejeitar criação com nome ou descrição vazios
  Given que o nome ou a descrição estão vazios após trim
  When a vertical é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que os campos estão inválidos

Scenario: Rejeitar criação com nome ou descrição fora do tamanho permitido
  Given que o nome ou a descrição não respeitam os limites de tamanho
  When a vertical é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o tamanho dos campos é inválido
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar uma vertical com `name`, `code` e `description`.
- **FR-002**: O `code` da vertical **DEVE** estar em UPPERCASE com separação por `_`.
- **FR-003**: O `name` e o `code` da vertical **DEVEM** ser únicos globalmente.
- **FR-004**: A vertical **DEVE** poder ser criada sem categorias ou atributos vinculados.
- **FR-005**: O sistema **DEVE** normalizar `name` e `description` com trim e rejeitar valores vazios.
- **FR-006**: O `name` **DEVE** ter entre 3 e 100 caracteres; `description` **DEVE** ter entre 3 e 255 caracteres.

---

## Entity

### Vertical

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da vertical | Obrigatório, único |
| `name` | Nome da vertical | Obrigatório, único, 3-100 caracteres, trim |
| `code` | Código da vertical | Obrigatório, único, UPPERCASE com `_` |
| `description` | Descrição da vertical | Obrigatório, 3-255 caracteres, trim |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: A vertical pode conter categorias e atributos vinculados, definidos em capabilities específicas.

---

## Success Criteria

- **SC-001**: 100% das verticais criadas possuem `name` e `code` únicos.
- **SC-002**: 100% das tentativas de criação com formato de código inválido são rejeitadas.
- **SC-003**: 100% das verticais criadas ficam disponíveis para configuração posterior de categorias e atributos.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Vertical | Tipo de operação que define o universo de atributos e categorias |
| Attribute | Característica configurável e reutilizável, independente de produto |
| Category | Recorte funcional dentro de uma vertical |

---

## Summary

A capability **Create Vertical** permite cadastrar verticais com nome, código e descrição, formando a base de organização do catálogo.

Ela viabiliza a configuração futura de categorias e atributos por tipo de negócio.

---
