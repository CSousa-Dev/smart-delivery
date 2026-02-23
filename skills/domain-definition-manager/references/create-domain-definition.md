# Criar Domain Definition

## Papel

Atuar como Domain Analyst para registrar a fonte de verdade de negocio de uma entidade/conceito.

## Checklist de criacao

1. Definir claramente o que o dominio representa e nao representa.
2. Definir linguagem ubiqua (termos sem ambiguidades).
3. Mapear eventos de negocio com IDs `EV-XXX`.
4. Mapear invariantes com IDs `INV-XXX` e consequencia de violacao.
5. Definir relacoes permitidas e proibidas.
6. Definir limites de consistencia (imediata vs eventual em termos de negocio).
7. Definir contrato de reuso por feature.
8. Fechar com summary curto e perguntas abertas.

## Regras obrigatorias

- Nao mencionar tecnologia de implementacao.
- Nao descrever endpoint, banco, framework ou codigo.
- Nao repetir regra local de uma unica feature como se fosse regra global.

## Referencias do projeto

- Fluxo: `specs/domain-definition-workflow.md`
- Template: `specs/templates/domain-definition-template.md`
- Prompt base: `specs/prompts/create/create-domain-definition.md`
