# Update User

**Created**: 2025-12-29

**Project**: `specs/project.md`

---

## User Stories

### User Story 1 — Atualizar dados básicos de uma identidade (P1)

Como **módulo interno**,

quero **atualizar os dados básicos de uma identidade de usuário existente**,

para manter as informações da identidade corretas e atualizadas ao longo do tempo.

**Por que P1**:

Informações de identidade podem mudar (nome, identificador lógico), e o sistema precisa refletir essas mudanças sem recriar usuários.

### Acceptance Criteria

```gherkin
Scenario: Atualizar dados básicos de um usuário existente
  Given que existe um usuário previamente criado
  And que o usuário possui uma identidade válida
  When o módulo interno solicita a atualização dos dados básicos
  Then os dados informados devem ser atualizados com sucesso
  And a identidade do usuário deve ser preservada

Scenario: Atualizar apenas parte dos dados
  Given que existe um usuário previamente criado
  When o módulo interno atualiza apenas um dos campos permitidos
  Then apenas o campo informado deve ser alterado
  And os demais dados devem permanecer inalterados

Scenario: Tentar atualizar com payload vazio
  Given que existe um usuário previamente criado
  When o módulo interno envia uma atualização sem campos válidos
  Then a operação deve ser rejeitada
  And o sistema deve informar erro de validação

Scenario: Tentar atualizar com campo inválido
  Given que existe um usuário previamente criado
  When o módulo interno informa um campo inválido ou vazio
  Then a operação deve ser rejeitada
  And o sistema deve informar erro de validação

Scenario: Tentar atualizar um usuário inexistente
  Given que não existe um usuário com o identificador informado
  When o módulo interno solicita a atualização dos dados
  Then a operação deve ser rejeitada
  And o sistema deve informar que a identidade não existe

```

---

### User Story 2 — Impedir atualização de dados sensíveis ao acesso (P1)

Como **sistema**,

quero **impedir que a atualização de identidade afete autenticação ou verificação de acesso**,

para garantir separação clara de responsabilidades dentro do módulo Identity.

**Por que P1**:

Misturar atualização de identidade com acesso ou autenticação introduz risco de segurança e acoplamento indevido.

### Acceptance Criteria

```gherkin
Scenario: Atualização não afeta autenticação nem verificação de acesso
  Given que um usuário existente possui credenciais e associações
  When os dados básicos da identidade são atualizados
  Then nenhuma credencial deve ser criada, alterada ou removida
  And nenhum acesso operacional deve ser concedido ou revogado

```

---

## Functional Requirements

- **FR-001**: O sistema **DEVE** permitir a atualização apenas de usuários previamente criados.
- **FR-002**: O sistema **DEVE** permitir a atualização de dados básicos da identidade.
- **FR-003**: O sistema **NÃO DEVE** permitir alteração do identificador técnico da identidade (`id`).
- **FR-004**: O sistema **DEVE** impedir a atualização para um identificador lógico já existente.
- **FR-005**: A atualização de um usuário **NÃO DEVE** criar, alterar ou remover credenciais de autenticação.
- **FR-006**: A atualização de um usuário **NÃO DEVE** conceder, revogar ou alterar acessos operacionais.
- **FR-007**: A atualização **NÃO DEVE** alterar o status administrativo do usuário.
- **FR-008**: O sistema **DEVE** preservar todas as associações existentes da identidade.
- **FR-009**: A atualização **DEVE** ser parcial: apenas campos presentes na solicitação são alterados.
- **FR-010**: Uma atualização sem campos válidos **DEVE** ser rejeitada.
- **FR-011**: `identifier` e `name` **DEVEM** seguir as mesmas regras de validação da criação.
- **FR-012**: A verificação de unicidade do `identifier` **NÃO DEVE** considerar o próprio usuário como duplicado.
- **FR-013**: Campos fornecidos com valor vazio ou inválido **DEVEM** resultar em erro de validação.
- **FR-014**: A atualização **NÃO DEVE** realizar validação de acesso do chamador, pois é uso interno do módulo.

---

## Entity

### User

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador único da identidade | Imutável |
| `identifier` | Identificador lógico do usuário (email ou username) | Mutável, único, 3-120 chars, sem espaços, case-insensitive |
| `name` | Nome exibido do usuário | Mutável, 2-120 chars, não vazio |
| `status` | Estado administrativo da identidade | Imutável nesta capability |
| `createdAt` | Data de criação | Imutável |
| `updatedAt` | Data da última atualização | Atualizado automaticamente |

**Observações importantes**:

- Esta capability **atua apenas sobre dados de identidade**.
- Nenhum campo relacionado a:
    - autenticação
    - credenciais
    - tenants
    - business units
        
        é afetado por esta operação.
        

---

## Success Criteria

- **SC-001**: 100% das atualizações preservam o identificador técnico da identidade.
- **SC-002**: Nenhuma atualização altera autenticação ou autorização.
- **SC-003**: Atualizações inválidas (usuário inexistente ou identificador duplicado) são rejeitadas consistentemente.
- **SC-004**: Dados atualizados passam a refletir corretamente em consultas subsequentes.

---

## Glossary

| Termo | Definição |
| --- | --- |
| Update User | Atualização de dados básicos de uma identidade |
| Identidade | Representação única e persistente de um usuário |
| Dados Básicos | Informações não relacionadas a acesso ou autenticação |

---

## Summary

A capability **Update User** permite atualizar dados básicos de uma identidade existente, preservando completamente autenticação, autorizações e associações.

Ela existe para manter a identidade do usuário correta ao longo do tempo, sem introduzir efeitos colaterais no modelo de acesso do sistema.
