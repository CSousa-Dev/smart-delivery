# Capability: [NOME]

**Created**: [DATE]  
**Project**: [specs/project.md](../project.md)

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

<!--
  FUNÇÃO: Descrever a jornada do usuário - QUEM quer O QUÊ e POR QUÊ
  
  REGRAS:
  - Priorizadas por valor de negócio (P1 = mais crítico)
  - Cada story deve ser INDEPENDENTEMENTE TESTÁVEL
  - Se implementar apenas UMA story, deve entregar valor (MVP slice)
  
  NÃO COLOCAR AQUI:
  - Detalhes de validação (vai em Functional Requirements)
  - Detalhes técnicos (vai em design.md)
-->

### User Story 1 - [Título Breve] (P1)

[Descreva a jornada do usuário em linguagem simples]

**Por que P1**: [Explique o valor e por que tem essa prioridade]

#### Acceptance Criteria

<!--
  FUNÇÃO: Especificação de teste - cada cenário VIRA um teste automatizado
  
  REGRAS:
  - Given = Estado inicial (setup do teste)
  - When = Ação executada (o que está sendo testado)
  - Then = Resultado esperado (assertion)
  - Deve ser preciso o suficiente para implementar o teste diretamente
  
  NÃO COLOCAR AQUI:
  - Regras de validação genéricas (vai em Functional Requirements)
  - Cenários que são apenas variações de validação
-->

```gherkin
Scenario: [Nome descritivo do cenário de sucesso]
  Given [estado inicial preciso]
  When [ação específica do usuário]
  Then [resultado observável]
  And [resultado adicional se houver]

Scenario: [Nome descritivo do cenário de erro/alternativo]
  Given [estado inicial]
  When [ação que causa o cenário alternativo]
  Then [comportamento esperado]
```

---

### User Story 2 - [Título Breve] (P2)

[Descreva a jornada do usuário]

**Por que P2**: [Explique o valor]

#### Acceptance Criteria

```gherkin
Scenario: [Nome do cenário]
  Given [estado inicial]
  When [ação]
  Then [resultado]
```

---

## Functional Requirements

<!--
  FUNÇÃO: Regras e restrições que o sistema DEVE impor
  
  REGRAS:
  - Usa linguagem "DEVE" / "NÃO DEVE" / "PODE"
  - Cada FR é uma regra de negócio ou constraint
  - Numerados para rastreabilidade (FR-001, FR-002...)
  - Se algo não está claro, marcar com [NEEDS CLARIFICATION]
  
  NÃO COLOCAR AQUI:
  - Fluxos de usuário (vai em User Stories)
  - Detalhes de implementação (vai em design.md)
  
  DIFERENÇA DE ACCEPTANCE CRITERIA:
  - Acceptance Criteria = fluxo (Given/When/Then) → vira TESTE
  - Functional Requirement = regra (DEVE/NÃO DEVE) → vira VALIDAÇÃO no código
-->

- **FR-001**: [Regra que o sistema DEVE impor]
- **FR-002**: [Outra regra ou constraint]
- **FR-003**: [Requisito de dados ou comportamento]

---

## Entity

<!--
  FUNÇÃO: Definir a ESTRUTURA dos dados da capability
  
  REGRAS:
  - Descrever atributos conceituais (não técnicos)
  - Indicar regras de cada campo (obrigatório, formato, limites)
  - Relacionamentos com outras entities se houver
  
  NÃO COLOCAR AQUI:
  - Tipos de banco de dados (vai em design.md)
  - Implementação de Value Objects (vai em design.md)
-->

### [Nome da Entity]

| Campo | Descrição | Regras |
|-------|-----------|--------|
| `id` | [o que representa] | [obrigatório, formato, limites] |
| `name` | [o que representa] | [obrigatório, limites] |
| `status` | [o que representa] | [valores permitidos, default] |

**Relacionamentos**: [se houver, descrever]

---

## Success Criteria

<!--
  FUNÇÃO: Definir COMO MEDIR se a capability foi bem-sucedida
  
  REGRAS:
  - Métricas mensuráveis e verificáveis
  - Agnóstico de tecnologia
  - Focado em valor de negócio
-->

- **SC-001**: [Métrica mensurável - ex: "100% dos registros válidos são persistidos"]
- **SC-002**: [Métrica de uso - ex: "Usuários completam cadastro sem suporte em 99% dos casos"]

---

## Glossary

<!--
  FUNÇÃO: Definir termos específicos desta capability (Linguagem Ubíqua)
  
  REGRAS:
  - Apenas termos que precisam de definição
  - Específicos desta capability (termos globais ficam em docs separados)
  
  PREENCHER POR ÚLTIMO - após escrever o resto do spec
-->

| Termo | Definição |
|-------|-----------|
| [termo] | [definição clara e concisa] |

---

## Summary

<!--
  FUNÇÃO: Resumo executivo da capability
  
  PREENCHER POR ÚLTIMO - após escrever todo o spec
  
  Deve responder em 2-3 frases:
  - O que essa capability faz?
  - Por que existe?
  - Qual o valor principal?
-->

[Resumo em 2-3 frases]

---
