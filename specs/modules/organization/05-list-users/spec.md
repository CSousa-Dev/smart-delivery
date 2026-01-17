# Capability: List Users

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

### User Story 1 - Listar usuários cadastrados (P1)

Como **responsável pelo módulo de organização**,  
quero **listar os usuários cadastrados**,  
para **localizar rapidamente pessoas e seus vínculos organizacionais**.

**Por que P1**: A listagem permite visão geral e seleção de usuários para consulta detalhada.

#### Acceptance Criteria

```gherkin
Scenario: Listar usuários com vínculo organizacional
  Given que existem usuários cadastrados
  When a listagem é solicitada
  Then o sistema deve retornar os usuários cadastrados
  And deve retornar o organizationId quando houver vínculo

Scenario: Listar usuários sem vínculo organizacional
  Given que existem usuários sem organização vinculada
  When a listagem é solicitada
  Then o sistema deve retornar os usuários
  And o organizationId deve ser nulo quando não houver vínculo

Scenario: Listagem vazia
  Given que não existem usuários cadastrados
  When a listagem é solicitada
  Then o sistema deve retornar uma lista vazia

Scenario: Listar usuários com paginação
  Given que existem mais de 20 usuários cadastrados
  When a listagem é solicitada com `page = 2` e `pageSize = 20`
  Then o sistema deve retornar 20 usuários
  And deve retornar metadados de paginação coerentes

Scenario: Listar página fora do intervalo
  Given que existem 5 usuários cadastrados
  When a listagem é solicitada com `page = 2` e `pageSize = 10`
  Then o sistema deve retornar uma lista vazia
  And deve retornar metadados de paginação coerentes

Scenario: Ajustar paginação inválida
  Given que existem usuários cadastrados
  When a listagem é solicitada com `page = 0` e `pageSize = 120`
  Then o sistema deve considerar `page = 1`
  And deve considerar `pageSize = 20`

Scenario: Ajustar direção de ordenação inválida
  Given que existem usuários cadastrados
  When a listagem é solicitada com `sortDirection = invalid`
  Then o sistema deve usar `sortDirection = desc`
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir listar todos os usuários cadastrados.
- **FR-002**: A listagem **DEVE** ser paginada com parâmetros `page` e `pageSize`.
- **FR-003**: `page` **DEVE** iniciar em 1 e `pageSize` **DEVE** estar entre 1 e 100, com valor padrão 20; valores inválidos **DEVEM** ser ajustados para `page = 1` e `pageSize = 20`.
- **FR-004**: O sistema **DEVE** retornar metadados de paginação: `page`, `pageSize`, `totalItems`, `totalPages`.
- **FR-005**: O sistema **DEVE** permitir ordenação por `createdAt` com direção `asc` ou `desc`, com padrão `desc`; valores inválidos **DEVEM** usar o padrão `desc`.
- **FR-006**: A listagem **NÃO DEVE** aplicar filtros além de paginação e ordenação.
- **FR-007**: Cada usuário listado **DEVE** incluir `organizationId` quando houver vínculo.
- **FR-008**: Quando não houver vínculo organizacional, o `organizationId` **DEVE** ser `null`.

---

## Entity

### UserListResult

| Campo | Descrição | Regras |
| --- | --- | --- |
| `items` | Lista de usuários | Obrigatório, itens do tipo `UserListItem` |
| `page` | Número da página atual | Obrigatório, >= 1 |
| `pageSize` | Tamanho da página | Obrigatório, entre 1 e 100 |
| `totalItems` | Total de usuários encontrados | Obrigatório |
| `totalPages` | Total de páginas disponíveis | Obrigatório |

### UserListItem

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único do usuário | Obrigatório |
| `firstName` | Nome do usuário | Obrigatório |
| `lastName` | Sobrenome do usuário | Obrigatório |
| `email` | Email do usuário | Obrigatório, formato válido |
| `phoneNumber` | Celular do usuário | Obrigatório, somente dígitos, máximo 15 caracteres |
| `statusId` | Identificador do status | Obrigatório |
| `organizationId` | Organização vinculada | Opcional, `null` quando não existir vínculo |
| `createdAt` | Data de criação | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% dos usuários listados possuem `organizationId` consistente com o vínculo.
- **SC-002**: 100% das listagens retornam com sucesso, mesmo quando vazias.
- **SC-003**: 100% das listagens retornam metadados de paginação coerentes.

---

## Glossary

| Termo | Definição |
| --- | --- |
| User | Pessoa física que inicia o onboarding para vender |
| Organization | Negócio registrado pelo usuário |

---

## Summary

A capability **List Users** retorna a lista de usuários cadastrados com indicação de vínculo organizacional.

Ela facilita a navegação e seleção de usuários no módulo de organização.

---
