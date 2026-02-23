# Domain Definition: [NOME DA ENTIDADE OU CONCEITO]

**Created**: [DATE]  
**Project**: [specs/project.md](../project.md)  
**Module/Context**: [EX: cart / orders / auth]  
**Status**: [Draft | Approved | Deprecated]

---

<!--
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║  DOMAIN DEFINITION - Fonte de verdade sem tecnologia                      ║
  ║                                                                           ║
  ║  Este documento define o significado de negócio de uma entidade/conceito,║
  ║  seus eventos e invariantes. Specs de feature DEVEM referenciar este doc ║
  ║  e NÃO duplicar regras gerais de domínio.                                 ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
-->

## Purpose

<!--
  FUNÇÃO: Explicar por que esta definição existe e qual dor evita.
-->

[Resumo curto do papel deste domínio no negócio]

---

## Domain Meaning

<!--
  FUNÇÃO: Definir o que o domínio representa e o que NÃO representa.
  REGRAS:
  - Linguagem de negócio
  - Sem banco, sem API, sem framework
-->

### Represents

- [O que esta entidade/conceito representa]
- [Qual decisão de negócio ela suporta]

### Does Not Represent

- [Limite explícito 1]
- [Limite explícito 2]

---

## Ubiquitous Language

<!--
  FUNÇÃO: Alinhar vocabulário entre negócio e engenharia.
-->

| Termo | Definição de Negócio |
|-------|----------------------|
| [termo] | [definição clara] |

---

## Lifecycle (Opcional)

<!--
  FUNÇÃO: Registrar estados e transições quando o conceito tiver ciclo de vida.
-->

| Estado | Significado | Como entra | Como sai |
|--------|-------------|------------|----------|
| [estado] | [significado] | [evento/condição] | [evento/condição] |

---

## Domain Events

<!--
  FUNÇÃO: Explicitar eventos de negócio associados ao domínio.
  REGRAS:
  - Event naming em linguagem de negócio
  - Descrever gatilho e significado, não detalhes técnicos de payload
-->

| Event ID | Evento | Disparado quando | Significado de negócio | Invariantes relacionadas |
|----------|--------|------------------|------------------------|--------------------------|
| EV-001 | [Nome do evento] | [situação] | [efeito no negócio] | [INV-001, INV-002] |

---

## Invariants

<!--
  FUNÇÃO: Definir verdades que SEMPRE devem ser preservadas.
  REGRAS:
  - Escrever como regra verificável
  - Usar IDs para referência (INV-001...)
  - Dizer impacto caso violada
-->

| Invariant ID | Regra invariável | Justificativa de negócio | Consequência se violar |
|--------------|------------------|--------------------------|------------------------|
| INV-001 | [regra sempre verdadeira] | [por que existe] | [impacto da violação] |

---

## Allowed Relationships

<!--
  FUNÇÃO: Definir vínculos permitidos com outros domínios.
-->

| Domínio Relacionado | Relação permitida | Condições |
|---------------------|-------------------|-----------|
| [domínio] | [tipo de vínculo] | [quando é permitido] |

---

## Forbidden Relationships

<!--
  FUNÇÃO: Evitar acoplamento ou associação indevida.
-->

| Relação proibida | Motivo |
|------------------|--------|
| [relação] | [motivo de negócio] |

---

## Consistency Boundaries

<!--
  FUNÇÃO: Delimitar onde a consistência deve ser imediata e onde pode ser eventual
  do ponto de vista de negócio (sem entrar em tecnologia).
-->

- **Consistência imediata obrigatória**: [casos]
- **Consistência eventual aceitável**: [casos]
- **Fonte primária de verdade**: [qual domínio decide]

---

## Feature Reuse Contract

<!--
  FUNÇÃO: Mostrar como specs de feature devem reutilizar esta definição.
-->

| Feature/Capability | Pode referenciar | Não deve redefinir |
|--------------------|------------------|--------------------|
| [nome da feature] | [INV-001, EV-001, termos] | [regras globais já definidas aqui] |

---

## Open Questions

| ID | Pergunta | Impacto | Dono |
|----|----------|---------|------|
| Q-001 | [ponto pendente] | [alto/medio/baixo] | [papel] |

---

## Non-Goals

- [O que este documento não cobre]
- [Ex.: fluxos detalhados de UI, endpoint, persistência]

---

## Summary

[Resumo em 2-3 frases do domínio, eventos e invariantes principais]

---
