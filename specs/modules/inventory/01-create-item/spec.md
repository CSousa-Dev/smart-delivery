# Capability: Create Inventory Item

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

### User Story 1 - Criar item de estoque (P1)

Como **responsável pelo controle de estoque da unidade de negócio**,  
quero **cadastrar um item com sua tipificação e unidade de medida**,  
para **registrar e rastrear corretamente sua existência física**.

**Por que P1**: Sem item cadastrado não é possível registrar lotes ou movimentações.

#### Acceptance Criteria

```gherkin
Scenario: Criar item de estoque com dados válidos
  Given que a unidade de negócio informada pertence à organização
  And que o tipo do item é válido
  And que a unidade de medida é válida e está ativa
  When o item é criado com organizationId, businessUnitId, name, type, unitOfMeasureId e requiresExpiration
  Then o item deve ser criado vinculado à unidade de negócio
  And o sistema deve registrar o autor da criação

Scenario: Rejeitar criação com unidade de negócio inexistente
  Given que a unidade de negócio informada não existe
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a unidade de negócio não existe

Scenario: Rejeitar criação com unidade de negócio inválida
  Given que a unidade de negócio informada não pertence à organização
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a unidade de negócio é inválida para a organização

Scenario: Rejeitar criação com tipo inválido
  Given que o tipo informado não está entre os tipos permitidos
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o tipo é inválido

Scenario: Rejeitar criação com name inválido
  Given que o name informado está fora do tamanho permitido
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o campo name é inválido

Scenario: Rejeitar criação com campos obrigatórios ausentes
  Given que name, type ou unitOfMeasureId não foram informados
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que existem campos obrigatórios ausentes

Scenario: Rejeitar criação com name duplicado na unidade
  Given que já existe um item com o mesmo name na unidade de negócio
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que o name já está cadastrado na unidade

Scenario: Rejeitar criação com name duplicado por diferença de caixa
  Given que já existe um item com name "Acucar" na unidade de negócio
  When o item é criado com name "acucar"
  Then a criação deve ser rejeitada
  And o sistema deve informar que o name já está cadastrado na unidade

Scenario: Rejeitar criação com unidade de medida inválida
  Given que a unidade de medida informada não existe no catálogo
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a unidade de medida é inválida

Scenario: Rejeitar criação com unidade de medida inativa
  Given que a unidade de medida informada está inativa
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a unidade de medida está inativa

Scenario: Rejeitar criação com unidade de medida de outra organização
  Given que a unidade de medida informada existe
  And que a unidade de medida pertence a outra organização
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que a unidade de medida não pertence à organização

Scenario: Rejeitar criação sem requiresExpiration
  Given que requiresExpiration não foi informado
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que requiresExpiration é obrigatório

Scenario: Rejeitar criação com requiresExpiration inválido
  Given que requiresExpiration informado não é boolean
  When o item é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que requiresExpiration é inválido
```

---

### User Story 2 - Definir regra de validade por item (P2)

Como **responsável pelo estoque**,  
quero **definir se o item exige validade**,  
para **garantir movimentações coerentes com a natureza física do item**.

**Por que P2**: Regras claras evitam inconsistências nas entradas e saídas.

#### Acceptance Criteria

```gherkin
Scenario: Criar item com validade opcional
  Given que o item não exige controle de validade
  When o item é criado com requiresExpiration = false
  Then o item deve ser criado com a regra de validade desabilitada

```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um item com `organizationId`, `businessUnitId`, `name`, `type`, `unitOfMeasureId`, `requiresExpiration` e `createdBy`.
- **FR-002**: A `businessUnitId` **DEVE** existir e pertencer à `organizationId` informada.
- **FR-003**: O `type` **DEVE** ser um dos valores: `INSUMO`, `ITEM_FINAL`, `EMBALAGEM`.
- **FR-004**: A `unitOfMeasureId` **DEVE** existir no catálogo de unidades de medida da organização e estar `ACTIVE`.
- **FR-005**: O `name` **DEVE** ser obrigatório e possuir entre 2 e 120 caracteres.
- **FR-006**: O `name` **DEVE** ser único por `businessUnitId` (case-insensitive).
- **FR-007**: `requiresExpiration` **DEVE** ser obrigatório, boolean e indicar se os lotes do item exigem data de validade.

---

## Entity

### InventoryItem

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do item | Obrigatório, único |
| `organizationId` | Organização proprietária | Obrigatório |
| `businessUnitId` | Unidade de negócio proprietária | Obrigatório |
| `name` | Nome do item | Obrigatório, 2-120 chars, único por unidade de negócio (case-insensitive) |
| `type` | Tipificação do item | Obrigatório, `INSUMO`, `ITEM_FINAL`, `EMBALAGEM` |
| `unitOfMeasureId` | Unidade de medida do item | Obrigatório, unidade ativa do catálogo |
| `requiresExpiration` | Exige validade por lote | Obrigatório, boolean |
| `createdBy` | Autor do cadastro | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Relacionamentos**: Um item pertence a uma organização e a uma unidade de negócio.

---

## Success Criteria

- **SC-001**: 100% dos itens criados possuem tipificação válida.
- **SC-002**: 100% dos itens criados possuem unidade de medida válida.
- **SC-003**: 100% dos itens criados registram autor e unidade de negócio.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Item de estoque | Entidade física controlável no estoque |
| Unidade de medida | Forma de quantificar um item (ex.: unidade, kg, litro) |
| Fracionamento | Capacidade de movimentar quantidades não inteiras |
| Validade | Data limite para uso de um lote |

---

## Summary

A capability **Create Inventory Item** cadastra itens físicos controláveis no estoque, com tipificação, unidade de medida e regras de validade.

Ela estabelece a base para criação de lotes e movimentações de forma consistente por unidade de negócio.

---
