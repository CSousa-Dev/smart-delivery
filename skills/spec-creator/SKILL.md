---
name: spec-creator
description: Criar novas specs de negocio (`spec.md`) neste repositorio usando o template oficial e o contexto de `specs/project.md`. Usar quando o usuario pedir para iniciar uma capability do zero, estruturar User Stories/Acceptance Criteria/Functional Requirements, ou gerar/atualizar `spec.md` em `specs/modules/...`.
---

# Spec Creator

## Overview

Criar specs de negocio completas, claras e prontas para a fase de design. Seguir o padrao do projeto para produzir `spec.md` com foco em regras de negocio, sem decidir implementacao tecnica.

## Workflow

### 1) Definir destino e contexto da capability

- Confirmar o diretorio alvo da capability (ex.: `specs/modules/<modulo>/<capability>/`).
- Confirmar o nome da capability para preencher o cabecalho da spec.
- Coletar contexto de negocio minimo antes de escrever:
  - Problema de negocio e objetivo.
  - Usuario/ator principal.
  - Regras e restricoes obrigatorias.
  - Entidades e campos principais.
  - Cenarios criticos (sucesso, erro, borda).
- Perguntar em blocos curtos quando faltar informacao.

### 2) Carregar referencias do projeto

- Ler `specs/project.md` para contexto macro e linguagem do dominio.
- Ler `specs/templates/spec-template.md` para estrutura obrigatoria.
- Ler `references/create-spec.md` para comportamento esperado durante a escrita.
- Ler specs semelhantes no mesmo modulo quando existir padrao relevante.

### 3) Gerar rascunho base

- Criar `spec.md` a partir do template oficial.
- Preferir usar `scripts/scaffold-spec.sh` para inicializar arquivo novo com nome/data preenchidos.
- Nao sobrescrever `spec.md` existente sem confirmacao do usuario.

### 4) Escrever a spec completa

- Preencher todas as secoes do template:
  - User Stories priorizadas por valor (P1, P2, P3).
  - Acceptance Criteria em Gherkin (Given/When/Then).
  - Functional Requirements com IDs sequenciais (`FR-001`, `FR-002`...).
  - Entity com campos e regras de negocio.
  - Success Criteria com metricas verificaveis.
  - Glossary e Summary coerentes com o restante.
- Se houver lacuna de negocio, interromper a escrita e coletar respostas objetivas ate eliminar a lacuna.
- Manter linguagem de negocio; evitar detalhes tecnicos.

### 5) Revisar consistencia e persistir

- Validar consistencia interna entre User Stories, cenarios, FRs e Entity.
- Confirmar se cada cenario Gherkin tem comportamento observavel e testavel.
- Salvar `spec.md` no diretorio alvo.
- Resumir no chat o que foi criado e quais pendencias ficaram marcadas.

## Guidelines

- Escrever em portugues e manter objetividade.
- Nao incluir tecnologia, framework, banco, endpoints ou pseudocodigo na spec.
- Nao usar `[NEEDS CLARIFICATION]` no documento final.
- Nao pular secoes do template; todas as secoes devem ficar completas antes de finalizar.
- Se surgir ambiguidade, fazer perguntas direcionadas e resolver antes de persistir o `spec.md`.
- Priorizar clareza para que design e implementacao ocorram sem ambiguidade.

## Resources

### scripts/
- `scripts/scaffold-spec.sh`: inicializar `spec.md` em um diretorio alvo a partir de `specs/templates/spec-template.md`.

### references/
- `references/create-spec.md`: checklist operacional para criar spec de negocio.
