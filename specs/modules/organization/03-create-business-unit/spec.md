# Capability: Create Business Unit

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

### User Story 1 - Create business unit (P1)

Como **owner da organização**,  
quero **criar uma unidade de negócio com dados públicos e endereço completo**,  
para **iniciar a operação de venda na plataforma**.

**Por que P1**: Sem unidade de negócio não há ponto de venda disponível para clientes.

#### Acceptance Criteria

```gherkin
Scenario: Criar unidade de negócio com dados válidos
  Given que a organização existe e o usuário é owner da organização
  When a unidade de negócio é criada com os dados obrigatórios
  Then a unidade de negócio deve ser criada com status PENDING_PRODUCTS
  And a unidade de negócio deve ficar vinculada à organização
  And a organização deve ficar com status ACTIVE

Scenario: Rejeitar criação com organização inexistente
  Given que a organização informada não existe
  When a unidade de negócio é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que a organização não existe

Scenario: Rejeitar criação por usuário não owner
  Given que a organização existe
  And que o usuário não é owner da organização
  When a unidade de negócio é criada
  Then a criação deve ser rejeitada
  And o sistema deve informar que apenas o owner pode criar a unidade de negócio

Scenario: Criar unidade adicional para organização ativa
  Given que a organização existe e já possui unidade de negócio
  And que o usuário é owner da organização
  When a unidade de negócio é criada com os dados obrigatórios
  Then a unidade de negócio deve ser criada
  And a organização deve permanecer com status ACTIVE
```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir criar uma unidade de negócio vinculada a uma organização existente.
- **FR-002**: A criação **DEVE** ser solicitada por um usuário owner da organização.
- **FR-003**: A unidade de negócio **DEVE** conter nome público, telefone e indicação de WhatsApp.
- **FR-004**: A unidade de negócio **DEVE** possuir endereço completo com estrutura Brasil.
- **FR-005**: O endereço **DEVE** incluir: rua, número, bairro, cidade, estado, CEP, país e ponto de referência.
- **FR-006**: O complemento do endereço **PODE** ser informado.
- **FR-007**: O email do ponto de venda **PODE** ser informado.
- **FR-008**: O Instagram do negócio **PODE** ser informado.
- **FR-009**: O site ou link público do negócio **PODE** ser informado.
- **FR-010**: O telefone da unidade de negócio **DEVE** conter apenas dígitos e ter no máximo 15 caracteres.
- **FR-011**: O CEP **DEVE** seguir o padrão BR com 8 dígitos numéricos.
- **FR-012**: O estado **DEVE** ser uma UF válida do Brasil.
- **FR-013**: O país **DEVE** ser `BR`.
- **FR-014**: A unidade de negócio **DEVE** iniciar com status `PENDING_PRODUCTS`.
- **FR-015**: Ao criar a primeira unidade de negócio, a organização **DEVE** mudar para status `ACTIVE`.
- **FR-016**: Uma organização **PODE** ter múltiplas unidades de negócio, sem limite definido no momento.
- **FR-017**: O status da unidade de negócio **NÃO DEVE** ser informado pelo usuário e **DEVE** ser definido pela aplicação.

---

## Entity

### BusinessUnit

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da unidade de negócio | Obrigatório, único |
| `organizationId` | Organização vinculada | Obrigatório |
| `publicName` | Nome público exibido aos compradores | Obrigatório |
| `phoneNumber` | Telefone de contato | Obrigatório, somente dígitos, máximo 15 caracteres |
| `phoneHasWhatsapp` | Indica se o telefone possui WhatsApp | Obrigatório |
| `email` | Email do ponto de venda | Opcional |
| `instagram` | Instagram do negócio | Opcional |
| `website` | Site ou link público do negócio | Opcional |
| `statusId` | Identificador do status | Obrigatório |
| `createdAt` | Data de criação | Obrigatório |
| `updatedAt` | Data da última atualização | Opcional |

**Status permitidos**:

- `PENDING_PRODUCTS`: Unidade sem produtos cadastrados
- `ACTIVE`: Unidade com produtos cadastrados

### BusinessUnitAddress

| Campo | Descrição | Regras |
| --- | --- | --- |
| `street` | Rua/Logradouro | Obrigatório |
| `number` | Número | Obrigatório |
| `complement` | Complemento | Opcional |
| `neighborhood` | Bairro | Obrigatório |
| `city` | Cidade | Obrigatório |
| `state` | Estado | Obrigatório, UF válida do Brasil |
| `postalCode` | CEP | Obrigatório, 8 dígitos numéricos |
| `country` | País | Obrigatório, valor esperado: `BR` |
| `referencePoint` | Ponto de referência | Obrigatório |

---

## Success Criteria

- **SC-001**: 100% das unidades de negócio criadas possuem status inicial `PENDING_PRODUCTS`.
- **SC-002**: 100% das organizações com unidade de negócio passam para status `ACTIVE`.
- **SC-003**: 100% das unidades de negócio criadas possuem endereço completo.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Business Unit | Ponto de venda da organização |
| Owner | Usuário responsável pela organização |

---

## Summary

A capability **Create Business Unit** registra o ponto de venda da organização com dados públicos e endereço completo.

Ela habilita a organização para operar, mantendo a unidade de negócio em estado pendente até o cadastro de produtos.

---
