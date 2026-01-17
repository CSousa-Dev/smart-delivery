# Capability: Create Unit of Measure

**Created**: 2026-01-12  
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

### User Story 1 - Criar unidade de medida (P1)

Como **responsável pelo catálogo de estoque**,  
quero **cadastrar uma unidade de medida**,  
para **padronizar a quantificação de itens na organização**.

**Por que P1**: Sem unidades padronizadas o estoque fica inconsistente.

#### Acceptance Criteria

```gherkin
Scenario: Criar unidade de medida com dados válidos
  Given que a organização informada existe
  And que não existe unidade com o mesmo code na organização
  And que não existe unidade com o mesmo name na organização
  When a unidade é criada com organizationId, code, name, symbol e allowsFraction
  Then a unidade deve ser criada com status ACTIVE
  And o sistema deve registrar o autor da criação

Scenario: Rejeitar criação com code duplicado
  Given que já existe uma unidade com o mesmo code na organização
  When a unidade é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o code já está cadastrado

Scenario: Rejeitar criação com code duplicado por diferença de caixa
  Given que já existe uma unidade com code "KG" na organização
  When a unidade é criada com code "kg"
  Then a criação deve ser rejeitada
  And o sistema deve informar que o code já está cadastrado

Scenario: Rejeitar criação com name duplicado
  Given que já existe uma unidade com o mesmo name na organização
  When a unidade é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o name já está cadastrado

Scenario: Rejeitar criação com organização inexistente
  Given que a organização informada não existe
  When a unidade é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que a organização não existe

Scenario: Rejeitar criação com symbol inválido
  Given que o symbol informado está fora do tamanho permitido
  When a unidade é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o campo symbol é inválido

Scenario: Rejeitar criação com code inválido
  Given que o code informado possui espaços ou caracteres inválidos
  When a unidade é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o code é inválido

Scenario: Rejeitar criação com dados inválidos
  Given que o code ou o name são inválidos
  When a unidade é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar erro de validação
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar uma unidade com `organizationId`, `code`, `name`, `symbol`, `allowsFraction` e `createdBy`.
- **FR-002**: A `organizationId` **DEVE** existir no módulo de organização.
- **FR-003**: O `code` **DEVE** ser único na organização (case-insensitive).
- **FR-004**: O `name` **DEVE** ser único na organização (case-insensitive).
- **FR-005**: O `code` **DEVE** ter entre 1 e 10 caracteres e **NÃO DEVE** conter espaços.
- **FR-006**: O `code` **DEVE** aceitar apenas letras e números.
- **FR-007**: O `name` **DEVE** ter entre 2 e 60 caracteres.
- **FR-008**: O `symbol` **DEVE** ter entre 1 e 10 caracteres.
- **FR-009**: `allowsFraction` **DEVE** indicar se a unidade aceita quantidades fracionadas.
- **FR-010**: A unidade criada **DEVE** iniciar com `status = ACTIVE`.
- **FR-011**: Unidades de medida **PODEM** ser utilizadas por qualquer unidade de negócio da organização.
- **FR-012**: Para validação de unicidade, o `code` **DEVE** ser normalizado com trim e uppercase.
- **FR-013**: Para validação de unicidade, o `name` **DEVE** ser normalizado com trim e comparação case-insensitive.

---

## Entity

### UnitOfMeasure

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade | Obrigatório, único |
| `organizationId` | Organização proprietária | Obrigatório |
| `code` | Código curto da unidade | Obrigatório, único na organização |
| `name` | Nome descritivo | Obrigatório, único na organização |
| `symbol` | Símbolo exibido | Obrigatório |
| `allowsFraction` | Permite fracionamento | Obrigatório, boolean |
| `status` | Estado da unidade | Obrigatório, `ACTIVE`, `INACTIVE` |
| `createdBy` | Autor do cadastro | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data de atualização | Opcional |

**Relacionamentos**: Uma unidade de medida pertence a uma organização e pode ser usada por itens de diferentes unidades de negócio.

---

## Success Criteria

- **SC-001**: 100% das unidades criadas possuem `code` único na organização.
- **SC-002**: 100% das unidades criadas iniciam em `ACTIVE`.
- **SC-003**: 0% das criações aceitam `code` ou `name` duplicados.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Unidade de medida | Padrão para quantificar itens (ex.: kg, un, l) |
| Símbolo | Representação curta da unidade |

---

## Summary

A capability **Create Unit of Measure** cadastra unidades de medida padronizadas para toda a organização.

Ela garante unicidade de código e nome, define se a unidade permite fracionamento e habilita seu uso pelos itens de estoque.

---
