# Capability: Create Organization

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

### User Story 1 - Register organization for selling (P1)

Como **pessoa que deseja vender pela plataforma**,  
quero **cadastrar minha organização com seus dados legais**,  
para **habilitar o negócio no contexto seller**.

**Por que P1**: Sem a organização não existe negócio para operar ou configurar ponto de venda.

#### Acceptance Criteria

```gherkin
Scenario: Criar organização com usuário owner válido
  Given que o usuário owner existe e não está vinculado a nenhuma organização
  And que não existe usuário ou organização com o mesmo documento
  And que todas as verticais informadas estão registradas
  When a organização é criada informando o ownerUserId e uma lista de verticalIds
  Then a organização deve ser criada com status PENDING_BUSINESS_UNIT
  And o usuário deve ser vinculado como owner da organização
  And o usuário deve ficar com status ACTIVE

Scenario: Rejeitar criação com ownerUserId inexistente
  Given que o usuário owner informado não existe
  When a organização é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o usuário owner não existe

Scenario: Rejeitar criação com owner já vinculado a organização
  Given que o usuário owner informado já está vinculado a uma organização
  When a organização é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o usuário já está vinculado a uma organização

Scenario: Rejeitar criação com documento já cadastrado
  Given que já existe um usuário ou organização com o mesmo documento
  When a organização é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que o documento já está cadastrado

Scenario: Rejeitar criação com CNPJ sem razão social
  Given que o tipo de documento é CNPJ
  And que a razão social não foi informada
  When a organização é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que a razão social é obrigatória para CNPJ

Scenario: Rejeitar criação com vertical inválida
  Given que ao menos uma das verticais informadas não está registrada
  When a organização é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar "Tipo de Negócio Não registrado"
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar uma organização com: nome fantasia, razão social (quando aplicável), tipo de documento, documento e uma ou mais verticais.
- **FR-002**: A criação da organização **DEVE** exigir `ownerUserId`.
- **FR-003**: O `ownerUserId` **DEVE** existir no contexto Organization.
- **FR-004**: Um usuário **DEVE** estar vinculado a apenas uma organização.
- **FR-005**: Um usuário **DEVE** ser owner de apenas uma organização.
- **FR-006**: Cada organização **DEVE** possuir exatamente um owner.
- **FR-007**: Ao criar a organização, o sistema **DEVE** vincular o usuário como owner.
- **FR-008**: Ao criar a organização, o usuário owner **DEVE** receber status `ACTIVE`.
- **FR-009**: A organização **DEVE** iniciar com status `PENDING_BUSINESS_UNIT`.
- **FR-010**: O documento da organização **DEVE** conter apenas dígitos.
- **FR-011**: O tipo de documento da organização **DEVE** ser um valor válido entre `CPF` e `CNPJ`.
- **FR-012**: O documento da organização **DEVE** ter 11 dígitos para `CPF` e 14 dígitos para `CNPJ`.
- **FR-013**: O documento da organização **DEVE** ser único no contexto de Organization, não podendo existir em usuários ou organizações.
- **FR-014**: `legalName` **DEVE** ser obrigatório quando o `documentType` for `CNPJ`.
- **FR-015**: As verticais **DEVEM** ser referenciadas por `verticalIds`.
- **FR-016**: `verticalIds` **DEVE** conter ao menos um identificador.
- **FR-017**: Cada `verticalId` informado **DEVE** existir no catálogo de verticais.
- **FR-018**: Se algum `verticalId` não estiver registrado, o sistema **DEVE** rejeitar a criação e informar "Tipo de Negócio Não registrado".
- **FR-019**: Uma organização **PODE** possuir mais de uma vertical.
- **FR-020**: O status da organização **NÃO DEVE** ser informado pelo usuário e **DEVE** ser definido pela aplicação.

---

## Entity

### Organization

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da organização | Obrigatório, único |
| `tradeName` | Nome fantasia da organização | Obrigatório |
| `legalName` | Razão social/nome formal | Obrigatório quando `documentType` = `CNPJ` |
| `documentType` | Tipo do documento | Obrigatório, valores: `CPF`, `CNPJ` |
| `documentNumber` | Documento da organização | Obrigatório, somente dígitos, 11 (CPF) ou 14 (CNPJ), único entre usuários e organizações |
| `verticalIds` | Verticais da organização | Obrigatório, lista com 1+ ids registrados |
| `ownerUserId` | Usuário owner da organização | Obrigatório |
| `statusId` | Identificador do status | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Status permitidos**:

- `PENDING_BUSINESS_UNIT`: Organização sem unidade de negócio configurada
- `ACTIVE`: Organização com pelo menos uma unidade de negócio

---

## Success Criteria

- **SC-001**: 100% das organizações criadas possuem owner válido e status inicial `PENDING_BUSINESS_UNIT`.
- **SC-002**: 100% das tentativas de criação com documento duplicado são rejeitadas.
- **SC-003**: 100% das organizações criadas possuem verticais informadas conforme o catálogo.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Organization | Negócio que será operado na plataforma |
| Owner | Usuário responsável pela organização |
| Vertical | Categoria de atuação do negócio |

---

## Summary

A capability **Create Organization** registra o negócio do seller com dados legais e define um owner único.

Ela estabelece o vínculo do usuário com a organização e prepara o negócio para a criação do primeiro ponto de venda.

---
