# inventory

**Nota de escopo**: O modulo inventory e agnostico de produto. O vinculo entre item e produto pertence ao modulo de producao e nao faz parte deste contexto.

## 01-create-item

### spec
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

### spec-validation
## Avaliação da Spec: Create Inventory Item

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes. |
| User Stories | 4/5 | Histórias claras e testáveis, mas faltam cenários para `requiresExpiration` ausente/valor inválido e duplicidade case-insensitive. |
| Edge Cases | 4/5 | Cobertura boa, porém sem bordas para `requiresExpiration` inválido/ausente e unicidade case-insensitive do `name`. |
| Functional Requirements | 5/5 | Regras claras, incluindo unicidade por unidade de negócio. |
| Entity | 5/5 | Entidade bem definida e alinhada às regras. |
| Success Criteria | 5/5 | Métricas objetivas e verificáveis. |
| Clareza | 5/5 | Linguagem consistente e fácil de entender. |
| Implementabilidade | 5/5 | Especificação suficiente para implementação direta. |
| **TOTAL** | 38/40 | |

## Veredicto

- [ ] ✅ APROVADA - Pode avançar para design
- [x] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Não há cenário explícito para `requiresExpiration` ausente ou com valor inválido, apesar de ser obrigatório.
2. Acceptance Criteria não cobre duplicidade case-insensitive do `name` (FR-006).

## Pontos Fortes

1. Validações essenciais (unidade, tipo e unidade de medida) bem cobertas.
2. FRs e Entity consistentes com a regra de unicidade por unidade de negócio.
3. Glossary e Summary alinhados ao domínio de estoque.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/01-create-item/spec.md`

## 02-link-product-to-item

**Status**: Fora de escopo no inventory.

O vinculo entre item de estoque e produto foi movido para o modulo de producao.
O inventory permanece agnostico de produto e nao expõe entidades ou endpoints de vinculo.

## 03-register-stock-entry

### spec
# Capability: Register Stock Entry

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

### User Story 1 - Registrar entrada de estoque por lote (P1)

Como **responsável pelo estoque**,  
quero **registrar uma entrada vinculada a um lote**,  
para **refletir fielmente a entrada física de itens**.

**Por que P1**: Sem entradas registradas o estoque não representa a realidade.

#### Acceptance Criteria

```gherkin
Scenario: Registrar entrada criando novo lote
  Given que o item existe na unidade de negócio
  And que o número de lote informado não existe na unidade
  And que a quantidade informada é positiva
  When a entrada é registrada com itemId, lotNumber, quantity, movementSource e occurredAt
  Then o lote deve ser criado com a quantidade informada
  And a movimentação de entrada deve ser registrada

Scenario: Registrar entrada incrementando lote existente
  Given que o lote informado já existe na unidade de negócio
  And que o lote pertence ao item informado
  When a entrada é registrada para esse lote
  Then a quantidade disponível do lote deve ser incrementada
  And a movimentação de entrada deve ser registrada

Scenario: Rejeitar entrada com item inexistente
  Given que o item informado não existe na unidade de negócio
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que o item não existe

Scenario: Rejeitar entrada com validade divergente do lote existente
  Given que o lote informado já existe na unidade de negócio
  And que o expiresAt informado é diferente do registrado no lote
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que a validade não confere com o lote

Scenario: Rejeitar entrada com lote existente de outro item
  Given que o lote informado já existe
  And que o lote pertence a outro item
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar conflito de lote e item
```

---

### User Story 2 - Garantir consistência de validações (P1)

Como **sistema**,  
quero **validar quantidade, validade e origem da entrada**,  
para **manter o estoque coerente e auditável**.

**Por que P1**: Movimentações incorretas geram divergência física e financeira.

#### Acceptance Criteria

```gherkin
Scenario: Rejeitar entrada com quantidade inválida
  Given que a quantidade informada é zero ou negativa
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar erro de validação

Scenario: Rejeitar entrada fracionada quando a unidade de medida não permite
  Given que a unidade de medida do item não permite fracionamento
  And que a quantidade informada possui casas decimais
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que fracionamento não é permitido

Scenario: Rejeitar entrada sem validade quando o item exige
  Given que o item exige validade por lote
  And que a data de validade não foi informada
  When a entrada é registrada para um novo lote
  Then a entrada deve ser rejeitada
  And o sistema deve informar que a validade é obrigatória

Scenario: Rejeitar entrada sem externalId quando a origem exige
  Given que a origem da movimentação não é INVENTORY_ADJUSTMENT
  And que o externalId não foi informado
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que o externalId é obrigatório

Scenario: Rejeitar entrada com origem inválida
  Given que a origem da movimentação informada é inválida
  When a entrada é registrada
  Then a entrada deve ser rejeitada
  And o sistema deve informar que a origem é inválida
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir registrar entrada com `businessUnitId`, `itemId`, `lotNumber`, `quantity`, `movementSource`, `occurredAt` e `createdBy`.
- **FR-002**: O `itemId` **DEVE** existir e pertencer à `businessUnitId` informada.
- **FR-003**: O `lotNumber` **DEVE** ser informado e, para criação de novo lote, **DEVE** ser único dentro da `businessUnitId`.
- **FR-004**: Se o lote já existir, ele **DEVE** pertencer ao mesmo `itemId` informado.
- **FR-005**: Se o lote já existir e `expiresAt` for informado, ele **DEVE** ser igual ao `expiresAt` registrado no lote.
- **FR-006**: Quando o lote não existir, `expiresAt` **DEVE** ser informado se o item exigir validade; caso contrário, **PODE** ser omitido.
- **FR-007**: A `quantity` **DEVE** ser maior que zero.
- **FR-008**: Se a unidade de medida do item não permitir fracionamento, a `quantity` **NÃO DEVE** possuir casas decimais.
- **FR-009**: `movementSource` **DEVE** ser um dos valores: `PURCHASE_ORDER`, `PRODUCTION_ORDER`, `INVENTORY_ADJUSTMENT`.
- **FR-010**: `externalId` **DEVE** ser informado quando `movementSource` for diferente de `INVENTORY_ADJUSTMENT`.
- **FR-011**: Cada entrada **DEVE** gerar uma movimentação imutável do tipo `ENTRY`.
- **FR-012**: A entrada **DEVE** incrementar a quantidade disponível do lote.
- **FR-013**: A movimentação **DEVE** referenciar um `lotNumber` que pertença ao `itemId` informado.

---

## Entity

### StockLot

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador do lote | Obrigatório, único |
| `businessUnitId` | Unidade de negócio do lote | Obrigatório |
| `itemId` | Item controlado | Obrigatório |
| `lotNumber` | Número externo do lote | Obrigatório, único por unidade de negócio |
| `expiresAt` | Data de validade | Opcional, obrigatória se item exigir |
| `quantityAvailable` | Quantidade disponível | Obrigatório, >= 0 |

### StockMovement

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador da movimentação | Obrigatório, único |
| `businessUnitId` | Unidade de negócio | Obrigatório |
| `itemId` | Item movimentado | Obrigatório |
| `lotNumber` | Lote movimentado | Obrigatório, deve pertencer ao `itemId` informado |
| `type` | Tipo de movimentação | Obrigatório, `ENTRY` |
| `quantity` | Quantidade movimentada | Obrigatório, > 0 |
| `movementSource` | Origem da movimentação | Obrigatório |
| `externalId` | Identificador externo da origem | Obrigatório exceto `INVENTORY_ADJUSTMENT` |
| `occurredAt` | Data/hora do evento | Obrigatório |
| `createdBy` | Autor do registro | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das entradas registradas geram movimentação imutável.
- **SC-002**: 100% das entradas com item que exige validade informam `expiresAt`.
- **SC-003**: 0% das entradas permitem quantidade fracionada quando o item não permite.
- **SC-004**: 100% das entradas com `movementSource` diferente de `INVENTORY_ADJUSTMENT` informam `externalId`.
- **SC-005**: 0% das entradas registram movimentação com lote que não pertence ao `itemId`.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Entrada de estoque | Registro de incorporação física de itens |
| Lote | Unidade mínima de controle e rastreabilidade |
| Origem da movimentação | Contexto externo que gerou a entrada |

---

## Summary

A capability **Register Stock Entry** registra entradas físicas no estoque por lote, criando ou incrementando lotes e gerando movimentações imutáveis.

Ela valida consistência de quantidade, validade e origem, garantindo rastreabilidade por unidade de negócio.

---

### spec-validation
## Avaliação da Spec: Register Stock Entry

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes e bem preenchidas. |
| User Stories | 5/5 | Fluxos principais e rejeições críticas cobertos. |
| Edge Cases | 5/5 | Cobertura sólida para lote, validade, origem e fracionamento. |
| Functional Requirements | 5/5 | Regras abrangentes e sem ambiguidades relevantes. |
| Entity | 5/5 | Entidades claras e coerentes com as validações. |
| Success Criteria | 4/5 | Métricas objetivas, mas não cobrem origem/externalId e coerência lote-item. |
| Clareza | 5/5 | Linguagem consistente e direta. |
| Implementabilidade | 5/5 | Especificação suficiente para implementação direta. |
| **TOTAL** | 39/40 | |

## Veredicto

- [x] ✅ APROVADA - Pode avançar para design
- [ ] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Success Criteria não contempla métricas relacionadas a validação de origem/externalId e coerência lote-item (FR-010/FR-013).

## Pontos Fortes

1. Distinção clara entre criação de lote e incremento de lote existente.
2. Validações de validade, fracionamento e origem bem especificadas.
3. Entidades e FRs alinhados para rastreabilidade completa.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/03-register-stock-entry/spec.md`

## 04-register-stock-exit

### spec
# Capability: Register Stock Exit

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

### User Story 1 - Registrar saída de estoque (P1)

Como **responsável pelo estoque**,  
quero **registrar saídas por finalidade operacional**,  
para **refletir corretamente consumo, venda ou perda de itens**.

**Por que P1**: Saídas não registradas geram estoque fictício e distorções financeiras.

#### Acceptance Criteria

```gherkin
Scenario: Registrar saída com lotes informados
  Given que o item existe na unidade de negócio
  And que os lotes informados possuem saldo disponível
  When a saída é registrada com lotAllocations
  Then os saldos dos lotes devem ser reduzidos
  And a movimentação de saída deve ser registrada

Scenario: Rejeitar saída com item inexistente
  Given que o item informado não existe na unidade de negócio
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o item não existe

Scenario: Registrar saída com seleção automática de lotes
  Given que o item possui saldo disponível em múltiplos lotes
  And que nenhum lote foi informado
  When a saída é registrada
  Then o sistema deve selecionar lotes pela validade mais próxima
  And quando não houver validade deve selecionar por FIFO
  And a movimentação deve registrar quais lotes foram usados

Scenario: Rejeitar seleção automática com apenas lotes vencidos
  Given que o item possui apenas lotes vencidos com saldo disponível
  And que nenhum lote foi informado
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que não há lotes válidos para saída

Scenario: Rejeitar saída com saldo insuficiente
  Given que o saldo disponível é menor que a quantidade solicitada
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o saldo é insuficiente

Scenario: Rejeitar saída com lote sem saldo suficiente
  Given que um lote informado possui saldo menor do que a quantidade alocada
  When a saída é registrada com lotAllocations
  Then a saída deve ser rejeitada
  And o sistema deve informar que o lote não possui saldo suficiente

Scenario: Rejeitar saída com lote vencido
  Given que o lote informado está vencido na data da movimentação
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o lote está vencido

Scenario: Rejeitar saída com lote de outro item
  Given que o lote informado pertence a outro item
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o lote não pertence ao item
```

---

### User Story 2 - Garantir consistência e auditoria (P1)

Como **sistema**,  
quero **validar quantidade, fracionamento e origem da saída**,  
para **preservar a integridade do estoque**.

**Por que P1**: Saídas inconsistentes comprometem o controle físico e contábil.

#### Acceptance Criteria

```gherkin
Scenario: Rejeitar saída com quantidade inválida
  Given que a quantidade informada é zero ou negativa
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar erro de validação

Scenario: Rejeitar saída fracionada quando a unidade de medida não permite
  Given que a unidade de medida do item não permite fracionamento
  And que a quantidade informada possui casas decimais
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que fracionamento não é permitido

Scenario: Rejeitar saída sem externalId quando a origem exige
  Given que a origem da movimentação não é INVENTORY_ADJUSTMENT
  And que o externalId não foi informado
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que o externalId é obrigatório

Scenario: Rejeitar saída com soma de alocações inválida
  Given que a soma das quantidades em lotAllocations é diferente da quantity
  When a saída é registrada
  Then a saída deve ser rejeitada
  And o sistema deve informar que a soma das alocações é inválida
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir registrar saída com `businessUnitId`, `itemId`, `quantity`, `movementSource`, `occurredAt` e `createdBy`.
- **FR-002**: O `itemId` **DEVE** existir e pertencer à `businessUnitId` informada.
- **FR-003**: `movementSource` **DEVE** ser um dos valores: `SALES_ORDER`, `PRODUCTION_ORDER`, `WASTE`, `INVENTORY_ADJUSTMENT`.
- **FR-004**: `externalId` **DEVE** ser informado quando `movementSource` for diferente de `INVENTORY_ADJUSTMENT`.
- **FR-005**: A `quantity` **DEVE** ser maior que zero.
- **FR-006**: Se a unidade de medida do item não permitir fracionamento, a `quantity` **NÃO DEVE** possuir casas decimais.
- **FR-007**: O sistema **NÃO DEVE** permitir saldo negativo em nenhum lote.
- **FR-008**: Quando `lotAllocations` for informado, a soma das quantidades **DEVE** ser igual à `quantity`.
- **FR-009**: Cada lote informado em `lotAllocations` **DEVE** existir na unidade de negócio, pertencer ao `itemId` informado e possuir saldo suficiente.
- **FR-010**: Quando `lotAllocations` não for informado, o sistema **DEVE** selecionar lotes por validade mais próxima (FEFO); quando o item não exige validade, **DEVE** usar FIFO.
- **FR-011**: Cada saída **DEVE** gerar uma movimentação imutável do tipo `EXIT` com os lotes efetivamente utilizados.
- **FR-012**: A saída **DEVE** reduzir o saldo disponível dos lotes utilizados.
- **FR-013**: Lotes vencidos **NÃO DEVEM** ser consumidos em saídas.
- **FR-014**: A seleção automática **NÃO DEVE** considerar lotes vencidos; se apenas lotes vencidos estiverem disponíveis, a saída **DEVE** ser rejeitada.
- **FR-015**: Um lote **DEVE** ser considerado vencido quando `expiresAt` for anterior a `occurredAt`.
- **FR-016**: Em seleção automática, empates **DEVEM** ser resolvidos por `lotNumber` ascendente; em FEFO o empate ocorre quando `expiresAt` for igual, e em FIFO quando a data da primeira entrada do lote for igual.

---

## Entity

### StockMovement

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador da movimentação | Obrigatório, único |
| `businessUnitId` | Unidade de negócio | Obrigatório |
| `itemId` | Item movimentado | Obrigatório |
| `type` | Tipo de movimentação | Obrigatório, `EXIT` |
| `quantity` | Quantidade movimentada | Obrigatório, > 0 |
| `movementSource` | Origem da movimentação | Obrigatório |
| `externalId` | Identificador externo da origem | Obrigatório exceto `INVENTORY_ADJUSTMENT` |
| `occurredAt` | Data/hora do evento | Obrigatório |
| `createdBy` | Autor do registro | Obrigatório |

### LotAllocation

| Campo | Descrição | Regras |
| --- | --- | --- |
| `lotNumber` | Número do lote usado | Obrigatório, deve pertencer ao `itemId` informado |
| `quantity` | Quantidade retirada do lote | Obrigatório, > 0 |

---

## Success Criteria

- **SC-001**: 0% das saídas permitem saldo negativo.
- **SC-002**: 100% das saídas registradas geram movimentação imutável.
- **SC-003**: 100% das saídas registram origem e autor.
- **SC-004**: 0% das saídas com `lotAllocations` aceitam lotes com saldo insuficiente.
- **SC-005**: 100% das seleções automáticas seguem FEFO/FIFO e rejeitam saídas quando só há lotes vencidos.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Saída de estoque | Registro de redução física de itens |
| Origem da movimentação | Contexto externo que gerou a saída |
| Alocação de lote | Distribuição da saída entre lotes |

---

## Summary

A capability **Register Stock Exit** registra saídas físicas do estoque, reduzindo saldos de lotes e criando movimentações imutáveis com origem rastreável.

Ela impede saldo negativo e valida fracionamento, mantendo coerência entre estoque físico e digital.

---

### spec-validation
## Avaliação da Spec: Register Stock Exit

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes. |
| User Stories | 4/5 | Fluxos principais cobertos, mas faltam cenários para saldo insuficiente por lote em `lotAllocations`. |
| Edge Cases | 4/5 | Cobertura boa, porém sem detalhes para desempate de lotes e apenas lotes vencidos. |
| Functional Requirements | 5/5 | Regras completas, incluindo validações de item e lote. |
| Entity | 5/5 | Entidades claras e alinhadas às regras. |
| Success Criteria | 4/5 | Métricas objetivas, porém limitadas para seleção automática e alocações. |
| Clareza | 5/5 | Texto claro e consistente. |
| Implementabilidade | 4/5 | Implementável, mas precisa de definição de desempate na seleção de lotes. |
| **TOTAL** | 36/40 | |

## Veredicto

- [ ] ✅ APROVADA - Pode avançar para design
- [x] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Acceptance Criteria não cobre rejeição quando um lote de `lotAllocations` não tem saldo suficiente (FR-009).
2. Não define desempate quando dois lotes têm a mesma validade (FEFO) ou mesma data de entrada (FIFO).
3. Falta cenário para seleção automática quando apenas lotes vencidos estão disponíveis (FR-014).

## Pontos Fortes

1. Regras de FEFO/FIFO e bloqueio de lotes vencidos bem definidas.
2. Validações de fracionamento e `externalId` claras.
3. Coerência entre FRs e entidades de movimentação.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/04-register-stock-exit/spec.md`

## 05-get-stock-position

### spec
# Capability: Get Stock Position

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

### User Story 1 - Consultar posição por item (P1)

Como **responsável pelo estoque**,  
quero **consultar a posição atual de um item**,  
para **saber a quantidade disponível e os lotes existentes**.

**Por que P1**: A posição atual é a base da operação diária.

#### Acceptance Criteria

```gherkin
Scenario: Consultar posição de item com saldo
  Given que o item possui saldo disponível em um ou mais lotes
  When a posição do item é consultada
  Then o sistema deve retornar a quantidade total disponível
  And deve listar os lotes com suas quantidades e validade

Scenario: Consultar posição de item sem saldo
  Given que o item não possui saldo disponível
  When a posição do item é consultada
  Then o sistema deve retornar quantidade total igual a zero
  And a lista de lotes deve estar vazia

Scenario: Consultar posição incluindo lotes zerados
  Given que o item possui lotes com saldo zero
  When a posição do item é consultada com includeZeroBalance = true
  Then o sistema deve retornar os lotes com saldo zero

Scenario: Rejeitar consulta de item inexistente
  Given que o item informado não existe na unidade de negócio
  When a posição do item é consultada
  Then o sistema deve informar que o item não foi encontrado

Scenario: Rejeitar consulta com parâmetros inválidos
  Given que itemId e lotNumber não foram informados
  When a posição é consultada
  Then o sistema deve rejeitar a consulta
  And o sistema deve informar que os parâmetros são inválidos
```

---

### User Story 2 - Consultar posição por lote (P2)

Como **responsável pelo estoque**,  
quero **consultar a posição de um lote específico**,  
para **avaliar sua quantidade e validade**.

**Por que P2**: Facilita auditorias e controle de validade.

#### Acceptance Criteria

```gherkin
Scenario: Consultar posição de lote existente
  Given que o lote existe na unidade de negócio
  When a posição do lote é consultada
  Then o sistema deve retornar a quantidade disponível do lote
  And deve informar a validade quando existir

Scenario: Rejeitar consulta de lote inexistente
  Given que o lote informado não existe na unidade de negócio
  When a posição do lote é consultada
  Then o sistema deve informar que o lote não foi encontrado
```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** receber `businessUnitId` e `itemId` para consulta por item.
- **FR-002**: A capability **DEVE** receber `businessUnitId` e `lotNumber` para consulta por lote.
- **FR-003**: A posição por item **DEVE** retornar `totalAvailable` e a lista de lotes com `lotNumber`, `quantityAvailable` e `expiresAt` quando houver.
- **FR-004**: A posição por lote **DEVE** retornar `itemId`, `lotNumber`, `quantityAvailable` e `expiresAt` quando houver, mesmo quando `quantityAvailable = 0`.
- **FR-005**: Lotes com `quantityAvailable = 0` **NÃO DEVEM** ser retornados por padrão na consulta por item.
- **FR-006**: A capability **DEVE** aceitar `includeZeroBalance` (boolean) na consulta por item; quando `true`, lotes com saldo zero **DEVEM** ser incluídos.
- **FR-007**: A consulta **NÃO DEVE** alterar qualquer saldo ou movimentação.
- **FR-008**: Se o `itemId` não existir na unidade de negócio, a consulta **DEVE** ser rejeitada com erro de item não encontrado.
- **FR-009**: Se o `lotNumber` não existir na unidade de negócio, a consulta **DEVE** ser rejeitada com erro de lote não encontrado.
- **FR-010**: Os lotes retornados na consulta por item **DEVEM** ser ordenados por `expiresAt` ascendente (nulos por último) e, em seguida, por `lotNumber` ascendente.
- **FR-011**: A consulta **DEVE** ser rejeitada quando `itemId` e `lotNumber` estiverem ausentes ou quando ambos forem informados simultaneamente.

---

## Entity

### StockPosition

| Campo | Descrição | Regras |
| --- | --- | --- |
| `itemId` | Item consultado | Obrigatório |
| `totalAvailable` | Quantidade total disponível | Obrigatório, >= 0 |
| `lots` | Lotes do item | Lista com lotes e saldos |

### StockLotPosition

| Campo | Descrição | Regras |
| --- | --- | --- |
| `lotNumber` | Número do lote | Obrigatório |
| `quantityAvailable` | Quantidade disponível | Obrigatório, >= 0 |
| `expiresAt` | Data de validade | Opcional |

---

## Success Criteria

- **SC-001**: 100% das consultas retornam saldos coerentes com os lotes registrados.
- **SC-002**: 100% das consultas não alteram o estado do estoque.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Posição de estoque | Estado atual de quantidades disponíveis |
| Lote | Unidade mínima de controle do estoque |

---

## Summary

A capability **Get Stock Position** fornece a posição atual de estoque por item ou por lote, incluindo saldos e validade quando aplicável.

Ela é estritamente consultiva e mantém o estoque como fonte única de verdade do estado físico.

---

### spec-validation
## Avaliação da Spec: Get Stock Position

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes. |
| User Stories | 5/5 | Cenários principais e parâmetros inválidos bem cobertos. |
| Edge Cases | 5/5 | Cobertura completa para lotes zerados e validações de parâmetros. |
| Functional Requirements | 5/5 | Regras claras, incluindo ordenação e filtro de lotes. |
| Entity | 5/5 | Entidades coerentes com o retorno esperado. |
| Success Criteria | 5/5 | Métricas objetivas e verificáveis. |
| Clareza | 5/5 | Texto consistente e sem ambiguidades. |
| Implementabilidade | 5/5 | Especificação pronta para implementação. |
| **TOTAL** | 40/40 | |

## Veredicto

- [x] ✅ APROVADA - Pode avançar para design
- [ ] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Nenhum.

## Pontos Fortes

1. Contrato claro para inclusão de lotes zerados via `includeZeroBalance`.
2. Ordenação e validações de parâmetros explicitadas nos FRs.
3. Estrutura consultiva consistente e completa.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/05-get-stock-position/spec.md`

## 06-list-stock-movements

### spec
# Capability: List Stock Movements

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

### User Story 1 - Consultar histórico de movimentações (P1)

Como **responsável pelo estoque**,  
quero **consultar o histórico de movimentações**,  
para **auditar entradas e saídas ao longo do tempo**.

**Por que P1**: O histórico é a base da rastreabilidade e da auditoria.

#### Acceptance Criteria

```gherkin
Scenario: Listar movimentações por item e período
  Given que existem movimentações registradas para um item
  When o histórico é consultado com itemId e período
  Then o sistema deve retornar as movimentações em ordem cronológica
  And cada movimentação deve incluir lote, quantidade, origem e autor

Scenario: Listar movimentações por origem externa
  Given que existem movimentações com externalId informado
  When o histórico é consultado com movementSource e externalId
  Then o sistema deve retornar apenas as movimentações correspondentes

Scenario: Consultar histórico sem resultados
  Given que não existem movimentações para os filtros informados
  When o histórico é consultado
  Then o sistema deve retornar uma lista vazia

Scenario: Listar movimentações com paginação
  Given que existem mais de 50 movimentações para o filtro informado
  When o histórico é consultado com page = 2 e pageSize = 50
  Then o sistema deve retornar apenas as movimentações da segunda página

Scenario: Rejeitar consulta com intervalo de datas inválido
  Given que a data inicial é posterior à data final
  When o histórico é consultado
  Then a consulta deve ser rejeitada
  And o sistema deve informar que o intervalo de datas é inválido

Scenario: Rejeitar consulta com filtros inválidos
  Given que movementType ou movementSource informado é inválido
  When o histórico é consultado
  Then a consulta deve ser rejeitada
  And o sistema deve informar que o filtro é inválido

Scenario: Rejeitar consulta com paginação inválida
  Given que page é menor que 1 ou pageSize é maior que 200
  When o histórico é consultado
  Then a consulta deve ser rejeitada
  And o sistema deve informar que a paginação é inválida
```

---

## Functional Requirements

- **FR-001**: A capability **DEVE** receber `businessUnitId` como escopo obrigatório.
- **FR-002**: A capability **PODE** receber filtros como `itemId`, `lotNumber`, `movementType`, `movementSource`, `externalId` e intervalo de datas.
- **FR-003**: A capability **DEVE** suportar paginação com `page` (iniciando em 1) e `pageSize` (padrão 50, máximo 200).
- **FR-004**: O intervalo de datas **DEVE** ser aplicado sobre `occurredAt` com início e fim inclusivos e aceitar timestamps ISO-8601; quando ausente timezone, **DEVE** assumir UTC.
- **FR-005**: O resultado **DEVE** ser ordenado por `occurredAt` em ordem cronológica e, em caso de empate, por `id` ascendente.
- **FR-006**: Cada movimentação **DEVE** retornar `id`, `itemId`, `lotNumber`, `type`, `quantity`, `movementSource`, `externalId`, `occurredAt` e `createdBy`.
- **FR-007**: Movimentações **NÃO DEVEM** ser alteradas, removidas ou recalculadas por esta capability.

---

## Entity

### StockMovementRecord

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador da movimentação | Obrigatório |
| `itemId` | Item movimentado | Obrigatório |
| `lotNumber` | Lote movimentado | Obrigatório |
| `type` | Tipo de movimentação | Obrigatório, `ENTRY` ou `EXIT` |
| `quantity` | Quantidade movimentada | Obrigatório, > 0 |
| `movementSource` | Origem da movimentação | Obrigatório |
| `externalId` | Identificador externo da origem | Opcional |
| `occurredAt` | Data/hora do evento | Obrigatório |
| `createdBy` | Autor do registro | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das movimentações retornadas são imutáveis e auditáveis.
- **SC-002**: 100% das consultas retornam resultados coerentes com os filtros informados.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Movimentação | Evento imutável de entrada ou saída de estoque |
| Origem da movimentação | Contexto externo que gerou o evento |

---

## Summary

A capability **List Stock Movements** permite consultar o histórico imutável de entradas e saídas de estoque com filtros por item, lote e origem.

Ela sustenta auditoria e rastreabilidade ao longo do tempo, sem alterar o estado do estoque.

---

### spec-validation
## Avaliação da Spec: List Stock Movements

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes. |
| User Stories | 4/5 | Fluxos principais cobertos, mas sem cenários de paginação. |
| Edge Cases | 4/5 | Faltam cenários para `page`/`pageSize` inválidos ou fora do limite. |
| Functional Requirements | 5/5 | Regras completas, incluindo paginação e ordenação. |
| Entity | 5/5 | Entidade alinhada ao retorno. |
| Success Criteria | 5/5 | Métricas objetivas e verificáveis. |
| Clareza | 5/5 | Texto claro e consistente. |
| Implementabilidade | 5/5 | Especificação pronta para implementação. |
| **TOTAL** | 38/40 | |

## Veredicto

- [ ] ✅ APROVADA - Pode avançar para design
- [x] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Acceptance Criteria não cobre paginação (`page`/`pageSize`) e seus limites (FR-003).
2. Não há cenário para rejeição de `page`/`pageSize` inválidos ou acima do máximo.

## Pontos Fortes

1. Intervalo de datas e timezone definidos de forma explícita.
2. Ordenação determinística com desempate por `id`.
3. Filtros e retorno alinhados ao uso de auditoria.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/06-list-stock-movements/spec.md`

## 07-create-unit-of-measure

### spec
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

### spec-validation
## Avaliação da Spec: Create Unit of Measure

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes e bem preenchidas. |
| User Stories | 5/5 | Fluxos e validações críticas bem cobertos. |
| Edge Cases | 5/5 | Cobertura completa para duplicidade e formato inválido. |
| Functional Requirements | 5/5 | Regras claras, incluindo normalização de unicidade. |
| Entity | 5/5 | Entidade alinhada às regras e ao domínio. |
| Success Criteria | 5/5 | Métricas objetivas e verificáveis. |
| Clareza | 5/5 | Linguagem consistente e sem ambiguidades. |
| Implementabilidade | 5/5 | Especificação pronta para implementação. |
| **TOTAL** | 40/40 | |

## Veredicto

- [x] ✅ APROVADA - Pode avançar para design
- [ ] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Nenhum.

## Pontos Fortes

1. Normalização de unicidade bem definida para `code` e `name`.
2. Acceptance Criteria cobre duplicidade case-insensitive e formato inválido.
3. Regras completas para criação e uso organizacional.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/07-create-unit-of-measure/spec.md`

## 08-update-deactivate-unit-of-measure

### spec
# Capability: Update/Deactivate Unit of Measure

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

### User Story 1 - Atualizar unidade de medida (P1)

Como **responsável pelo catálogo de estoque**,  
quero **atualizar o nome exibido e o status da unidade**,  
para **manter o catálogo consistente com a operação**.

**Por que P1**: O catálogo precisa refletir ajustes operacionais sem recriar unidades.

#### Acceptance Criteria

```gherkin
Scenario: Atualizar unidade de medida com dados válidos
  Given que a unidade existe na organização
  And que o novo name não está em uso na organização
  When a unidade é atualizada com name
  Then a unidade deve ser atualizada
  And o sistema deve registrar o autor da atualização

Scenario: Rejeitar atualização com unidade inexistente
  Given que a unidade informada não existe na organização
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que a unidade não existe

Scenario: Rejeitar atualização com name duplicado
  Given que já existe uma unidade com o mesmo name na organização
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o name já está cadastrado

Scenario: Rejeitar atualização com name inválido
  Given que o name informado está fora do tamanho permitido
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o name é inválido

Scenario: Rejeitar atualização com campos não permitidos
  Given que a unidade existe na organização
  When a atualização é solicitada com code, symbol ou allowsFraction
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o campo informado não pode ser alterado

Scenario: Rejeitar atualização sem campos atualizáveis
  Given que a unidade existe na organização
  When a atualização é solicitada sem name e sem status
  Then a atualização deve ser rejeitada
  And o sistema deve informar que nenhum campo atualizável foi informado

Scenario: Atualizar unidade inativa para ACTIVE
  Given que a unidade está INACTIVE
  When a atualização de status para ACTIVE é solicitada
  Then o status deve ser alterado para ACTIVE
  And o sistema deve registrar o autor da atualização

Scenario: Atualizar unidade apenas com status
  Given que a unidade está ACTIVE
  When a atualização de status para INACTIVE é solicitada
  Then o status deve ser alterado para INACTIVE
  And o sistema deve registrar o autor da atualização

Scenario: Rejeitar atualização com status inválido
  Given que o status informado não está entre ACTIVE ou INACTIVE
  When a atualização é solicitada
  Then a atualização deve ser rejeitada
  And o sistema deve informar que o status é inválido

Scenario: Atualizar unidade com dados idênticos
  Given que a unidade existe na organização
  And que o name e o status informados são iguais aos atuais
  When a atualização é solicitada
  Then o sistema deve retornar o estado atual da unidade
  And não deve alterar updatedAt ou updatedBy
```

---

### User Story 2 - Desativar unidade de medida (P1)

Como **responsável pelo catálogo de estoque**,  
quero **desativar uma unidade de medida**,  
para **impedir novos usos sem afetar itens já cadastrados**.

**Por que P1**: Desativação evita novos cadastros indevidos sem quebrar histórico.

#### Acceptance Criteria

```gherkin
Scenario: Desativar unidade de medida ativa
  Given que a unidade está ativa
  When a desativação é solicitada
  Then o status deve ser alterado para INACTIVE
  And a unidade não deve ser removida do histórico

Scenario: Rejeitar desativação de unidade inexistente
  Given que a unidade informada não existe
  When a desativação é solicitada
  Then a desativação deve ser rejeitada
  And o sistema deve informar que a unidade não existe
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir atualizar uma unidade com `unitOfMeasureId`, `updatedBy` e pelo menos um dos campos: `name` ou `status`.
- **FR-002**: A unidade **DEVE** existir na organização para ser atualizada ou desativada.
- **FR-003**: O `code` **NÃO DEVE** ser alterado após a criação.
- **FR-004**: O `symbol` **NÃO DEVE** ser alterado após a criação.
- **FR-005**: `allowsFraction` **NÃO DEVE** ser alterado após a criação.
- **FR-006**: O `name` **DEVE** ser único na organização (case-insensitive).
- **FR-007**: Para validação de unicidade, o `name` **DEVE** ser normalizado com trim e comparação case-insensitive.
- **FR-008**: O `name` **DEVE** ter entre 2 e 60 caracteres.
- **FR-009**: O `status` **DEVE** aceitar apenas `ACTIVE` ou `INACTIVE`.
- **FR-010**: Quando `name` e `status` informados forem iguais aos atuais, a atualização **DEVE** ser idempotente e **NÃO DEVE** alterar `updatedAt` e `updatedBy`.
- **FR-011**: A desativação **DEVE** alterar o `status` para `INACTIVE` e **NÃO DEVE** remover a unidade.
- **FR-012**: Unidades `INACTIVE` **NÃO DEVEM** ser usadas em novos cadastros de itens ou na atualização da unidade de medida de itens existentes.
- **FR-013**: A desativação **NÃO DEVE** alterar itens já cadastrados nem movimentações históricas.

---

## Entity

### UnitOfMeasure

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade | Obrigatório, único |
| `organizationId` | Organização proprietária | Obrigatório |
| `code` | Código curto da unidade | Obrigatório, imutável |
| `name` | Nome descritivo | Obrigatório, único na organização |
| `symbol` | Símbolo exibido | Obrigatório |
| `allowsFraction` | Permite fracionamento | Obrigatório, boolean |
| `status` | Estado da unidade | Obrigatório, `ACTIVE`, `INACTIVE` |
| `createdBy` | Autor do cadastro | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedBy` | Autor da atualização | Opcional |
| `updatedAt` | Data de atualização | Opcional |

---

## Success Criteria

- **SC-001**: 100% das unidades inativas permanecem preservadas para histórico.
- **SC-002**: 0% dos novos itens são cadastrados com unidade inativa.
- **SC-003**: 100% das atualizações respeitam unicidade de nome.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Desativação | Bloqueio de novos usos sem remoção do registro |

---

## Summary

A capability **Update/Deactivate Unit of Measure** permite atualizar o nome e o status da unidade, além de desativá-la sem excluir registros usados no estoque.

Ela preserva histórico e impede novos usos de unidades inativas, mantendo a integridade do catálogo.

---

### spec-validation
## Avaliação da Spec: Update/Deactivate Unit of Measure

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | 5/5 | Todas as seções do template estão presentes. |
| User Stories | 4/5 | Histórias claras, mas faltam cenários de status inválido e name fora do tamanho. |
| Edge Cases | 4/5 | Cobertura boa, porém sem bordas para validações de status e tamanho de `name`. |
| Functional Requirements | 5/5 | Regras completas, incluindo idempotência. |
| Entity | 5/5 | Entidade consistente com regras de atualização. |
| Success Criteria | 5/5 | Métricas objetivas e verificáveis. |
| Clareza | 5/5 | Texto claro e consistente. |
| Implementabilidade | 5/5 | Especificação pronta para implementação. |
| **TOTAL** | 38/40 | |

## Veredicto

- [ ] ✅ APROVADA - Pode avançar para design
- [x] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. Acceptance Criteria não cobre tentativa de atualizar com `status` inválido (fora de `ACTIVE`/`INACTIVE`).
2. Não há cenário para `name` fora do tamanho permitido (FR-008).

## Pontos Fortes

1. Regras claras de idempotência e campos imutáveis.
2. Cobertura de atualização parcial e ausência de campos atualizáveis.
3. Desativação preserva histórico e impede novos usos.

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar
Arquivo: `specs/modules/inventory/08-update-deactivate-unit-of-measure/spec.md`

## 09-unlink-product-from-item

**Status**: Fora de escopo no inventory.

O desvinculo entre item de estoque e produto foi movido para o modulo de producao.
O inventory permanece agnostico de produto e nao expõe entidades ou endpoints de vinculo.
