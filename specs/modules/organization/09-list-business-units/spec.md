# Capability: List Business Units

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

### User Story 1 - Listar unidades de negócio cadastradas (P1)

Como **responsável pelo módulo de organização**,  
quero **listar as unidades de negócio cadastradas**,  
para **localizar rapidamente um ponto de venda e acessar seus detalhes**.

**Por que P1**: A listagem facilita a busca de unidades de negócio e o acesso à consulta individual.

#### Acceptance Criteria

```gherkin
Scenario: Listar unidades de negócio existentes
  Given que existem unidades de negócio cadastradas
  When a listagem é solicitada
  Then o sistema deve retornar as unidades de negócio cadastradas

Scenario: Listagem vazia
  Given que não existem unidades de negócio cadastradas
  When a listagem é solicitada
  Then o sistema deve retornar uma lista vazia

Scenario: Listar unidades de negócio com paginação
  Given que existem mais de 20 unidades de negócio cadastradas
  When a listagem é solicitada com `page = 2` e `pageSize = 20`
  Then o sistema deve retornar 20 unidades de negócio
  And deve retornar metadados de paginação coerentes

Scenario: Listar página fora do intervalo
  Given que existem 5 unidades de negócio cadastradas
  When a listagem é solicitada com `page = 2` e `pageSize = 10`
  Then o sistema deve retornar uma lista vazia
  And deve retornar metadados de paginação coerentes

Scenario: Ajustar paginação inválida
  Given que existem unidades de negócio cadastradas
  When a listagem é solicitada com `page = 0` e `pageSize = 120`
  Then o sistema deve considerar `page = 1`
  And deve considerar `pageSize = 20`

Scenario: Ajustar direção de ordenação inválida
  Given que existem unidades de negócio cadastradas
  When a listagem é solicitada com `sortDirection = invalid`
  Then o sistema deve usar `sortDirection = desc`
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir listar todas as unidades de negócio cadastradas.
- **FR-002**: A listagem **DEVE** ser paginada com parâmetros `page` e `pageSize`.
- **FR-003**: `page` **DEVE** iniciar em 1 e `pageSize` **DEVE** estar entre 1 e 100, com valor padrão 20; valores inválidos **DEVEM** ser ajustados para `page = 1` e `pageSize = 20`.
- **FR-004**: O sistema **DEVE** retornar metadados de paginação: `page`, `pageSize`, `totalItems`, `totalPages`.
- **FR-005**: O sistema **DEVE** permitir ordenação por `createdAt` com direção `asc` ou `desc`, com padrão `desc`; valores inválidos **DEVEM** usar o padrão `desc`.
- **FR-006**: A listagem **NÃO DEVE** aplicar filtros além de paginação e ordenação.

---

## Entity

### BusinessUnitListResult

| Campo | Descrição | Regras |
| --- | --- | --- |
| `items` | Lista de unidades de negócio | Obrigatório, itens do tipo `BusinessUnitListItem` |
| `page` | Número da página atual | Obrigatório, >= 1 |
| `pageSize` | Tamanho da página | Obrigatório, entre 1 e 100 |
| `totalItems` | Total de unidades de negócio encontradas | Obrigatório |
| `totalPages` | Total de páginas disponíveis | Obrigatório |

### BusinessUnitListItem

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade de negócio | Obrigatório |
| `organizationId` | Organização vinculada | Obrigatório |
| `publicName` | Nome público exibido aos compradores | Obrigatório |
| `phoneNumber` | Telefone de contato | Obrigatório, somente dígitos, máximo 15 caracteres |
| `phoneHasWhatsapp` | Indica se o telefone possui WhatsApp | Obrigatório |
| `statusId` | Identificador do status | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das listagens retornam as unidades de negócio cadastradas ou lista vazia.
- **SC-002**: 100% das listagens retornam metadados de paginação coerentes.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Business Unit | Ponto de venda da organização |

---

## Summary

A capability **List Business Units** retorna a lista de unidades de negócio cadastradas para facilitar a navegação e seleção.

Ela habilita o acesso rápido à consulta individual de cada unidade de negócio.

---
