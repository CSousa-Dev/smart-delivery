# Capability: Create Allowed Value

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

### User Story 1 - Criar valor permitido para atributo do tipo option (P1)

Como **responsável pela configuração do catálogo**,  
quero **cadastrar valores permitidos para um atributo do tipo option**,  
para **padronizar a seleção de valores no cadastro de produtos**.

**Por que P1**: Sem valores permitidos, atributos do tipo option não podem ser usados de forma consistente.

#### Acceptance Criteria

```gherkin
Scenario: Criar valor permitido com dados obrigatórios
  Given que o atributo informado existe e é do tipo option
  And que não existe valor permitido com o mesmo value ou name no atributo
  When o valor permitido é criado com name e value
  Then o valor permitido deve ser criado vinculado ao atributo

Scenario: Rejeitar criação para atributo inexistente
  Given que o atributo informado não existe
  When o valor permitido é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o atributo especificado não existe

Scenario: Rejeitar criação para atributo de tipo diferente de option
  Given que o atributo informado existe e não é do tipo option
  When o valor permitido é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o atributo não é do tipo option

Scenario: Rejeitar criação com value duplicado no mesmo atributo
  Given que já existe um valor permitido com o mesmo value no atributo
  When o valor permitido é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o value já está cadastrado no atributo

Scenario: Rejeitar criação com name duplicado no mesmo atributo
  Given que já existe um valor permitido com o mesmo name no atributo
  When o valor permitido é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o name já está cadastrado no atributo

Scenario: Rejeitar criação com value em formato inválido
  Given que o value não está em Pascal Case ou não respeita o tamanho permitido
  When o valor permitido é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o formato do value é inválido
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um valor permitido com `attributeId`, `name`, `value` e `description`.
- **FR-002**: A `description` do valor permitido **PODE** ser informada.
- **FR-003**: O valor permitido **DEVE** pertencer a um atributo existente do tipo `option`.
- **FR-004**: O `name` do valor permitido **DEVE** ser único por atributo.
- **FR-005**: O `value` do valor permitido **DEVE** ser único por atributo.
- **FR-006**: O sistema **DEVE** normalizar `name` e `value` com trim e rejeitar valores vazios.
- **FR-007**: O `value` **DEVE** estar em Pascal Case (ex: `Batata Frita`), contendo apenas letras, números e espaços simples entre palavras.
- **FR-008**: O tamanho do `value` **DEVE** respeitar `minValue` e `maxValue` do atributo (ou seus defaults).
- **FR-009**: A unicidade de `name` e `value` **DEVE** ser validada de forma case-insensitive.

---

## Entity

### AllowedValue

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do valor permitido | Obrigatório, único |
| `attributeId` | Atributo associado | Obrigatório, atributo do tipo `option` |
| `name` | Nome amigável do valor permitido | Obrigatório, único por atributo, trim, case-insensitive |
| `value` | Valor interno do permitido | Obrigatório, único por atributo, Pascal Case, trim, case-insensitive, respeita `minValue`/`maxValue` |
| `description` | Descrição do valor permitido | Opcional |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: Um valor permitido pertence a um atributo do tipo `option`.

---

## Success Criteria

- **SC-001**: 100% dos valores permitidos criados pertencem a atributos do tipo `option`.
- **SC-002**: 100% das tentativas de criação com `name` ou `value` duplicados no mesmo atributo são rejeitadas.
- **SC-003**: 100% dos valores permitidos criados ficam disponíveis para seleção em atributos do tipo option.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Allowed Value | Valor permitido para atributos do tipo option |
| Attribute | Característica configurável e reutilizável, independente de produto |
| Option | Tipo de atributo que exige valores pré-definidos |

---

## Summary

A capability **Create Allowed Value** permite cadastrar valores permitidos para atributos do tipo option, com nome e valor únicos por atributo.

Ela padroniza a seleção de opções e garante consistência no cadastro de produtos.

---
