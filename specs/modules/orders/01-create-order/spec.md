# Capability: Create Order

**Created**: 2026-01-16  
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

### User Story 1 - Criar pedido interno (P1)

Como **sistema interno autorizado ou operador da unidade de negócio**,  
quero **criar um pedido com cliente, endereço e produtos**,  
para **iniciar o ciclo de vida do pedido**.

**Por que P1**: Sem a criação do pedido não existe fluxo de atendimento.

#### Acceptance Criteria

```gherkin
Scenario: Criar pedido com dados obrigatórios
  Given que clientId, addressId, organizationId, businessUnitId e produtos foram informados
  When o pedido é criado com products contendo productId e quantity
  Then o pedido deve ser criado com status PENDING
  And o sistema deve gerar um orderId

Scenario: Criar pedido com referência externa
  Given que externalOrderId e externalSource foram informados
  When o pedido é criado
  Then o pedido deve registrar externalOrderId e externalSource

Scenario: Rejeitar criação com referência externa duplicada
  Given que já existe um pedido com o mesmo externalOrderId e externalSource
  When o pedido é criado com a mesma combinação
  Then a criação deve ser rejeitada
  And o sistema deve informar que a combinação externa já existe

Scenario: Rejeitar criação sem dados obrigatórios
  Given que clientId, addressId, organizationId, businessUnitId ou products não foram informados
  When o pedido é criado
  Then a criação deve ser rejeitada
  And o sistema deve informar que existem campos obrigatórios ausentes
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar um pedido com `organizationId`, `businessUnitId`, `clientId`, `addressId` e `products`.
- **FR-002**: O `orderId` **DEVE** ser gerado pelo sistema no momento da criação e ser único.
- **FR-003**: O status inicial do pedido **DEVE** ser `PENDING` e **NÃO DEVE** ser informado por quem cria.
- **FR-004**: `products` **DEVE** conter ao menos um produto.
- **FR-005**: Cada produto **DEVE** conter `productId` e `quantity`.
- **FR-006**: `quantity` **DEVE** ser maior que zero.
- **FR-007**: `observation` **PODE** ser informado por produto como texto livre.
- **FR-008**: `externalOrderId` e `externalSource` **PODEM** ser informados e são strings opcionais.
- **FR-009**: Quando `externalOrderId` e `externalSource` forem informados, a combinação **DEVE** ser única.
- **FR-010**: Apenas sistemas internos autorizados ou usuários vinculados à organização e unidade de negócio **PODEM** criar pedidos.

---

## Entity

### Order

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do pedido | Obrigatório, único |
| `organizationId` | Organização dona do pedido | Obrigatório |
| `businessUnitId` | Unidade de negócio do pedido | Obrigatório |
| `clientId` | Cliente do pedido | Obrigatório |
| `addressId` | Endereço do pedido | Obrigatório |
| `externalOrderId` | Identificador externo do pedido | Opcional |
| `externalSource` | Fonte externa do pedido | Opcional |
| `status` | Estado do pedido | Obrigatório, default `PENDING` |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

### OrderProduct

| Campo | Descrição | Regras |
| --- | --- | --- |
| `orderId` | Pedido relacionado | Obrigatório |
| `productId` | Produto do pedido | Obrigatório |
| `quantity` | Quantidade do produto | Obrigatório, maior que zero |
| `observation` | Observação do produto | Opcional |

**Relacionamentos**: Um pedido possui uma lista de produtos relacionados.

---

## Success Criteria

- **SC-001**: 100% dos pedidos criados iniciam com status `PENDING`.
- **SC-002**: 100% das tentativas com combinação externa duplicada são rejeitadas.
- **SC-003**: 100% dos pedidos criados possuem ao menos um produto.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Pedido | Registro que representa a solicitação de compra de um cliente |
| Produto do pedido | Produto associado ao pedido no momento da criação |
| Fonte externa | Origem de integração que informa um pedido |

---

## Summary

A capability **Create Order** cria pedidos internos com cliente, endereço e produtos, iniciando o ciclo de vida com status `PENDING`.

Ela permite referência externa opcional, garantindo unicidade quando informada, e assegura que apenas origens autorizadas possam criar pedidos.

---
