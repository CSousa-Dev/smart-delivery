---
name: plan-mass-creator
description: Criar plans de execução em lote a partir de múltiplas specs e designs. Use quando o usuário pedir para gerar planos para várias capabilities, a partir de pares spec.md + design.md, garantindo que cada plan linke a spec e o design.
---

# Plan Mass Creator

## Overview

Gerar plans de execução para múltiplas capabilities com base em suas specs e designs. Cada plan segue o template do projeto e referencia explicitamente a spec e o design correspondentes.

## Workflow

### 1) Definir o conjunto de entrada

- Aceitar lista de caminhos (diretórios, specs ou designs).
- Para cada diretório, localizar `spec.md` e `design.md`.
- Para cada spec, localizar o design correspondente no mesmo diretório.
- Se houver ambiguidade, pedir confirmação da lista de pares antes de gerar.

### 2) Carregar referências

- Usar `references/create-plan.md` como regras de criação do plan.
- Usar `specs/templates/plan-template.md` como estrutura base.
- Usar `specs/project.md` para padrões e dependências.

### 3) Criar um plan por capability

- Ler spec e design completos antes de escrever o plan.
- Transformar componentes do design em tasks atômicas e verificáveis.
- Incluir testes dentro das tasks (não criar fase separada de testes).
- Gerar IDs sequenciais (T001, T002...) por plan.
- Garantir que o header linke a spec e o design via caminhos relativos.

### 4) Persistir saída

- Criar `plan.md` no mesmo diretório da spec/design.
- Não sobrescrever sem aviso se já existir `plan.md` (pedir confirmação).
- Resumir no chat quais plans foram criados.

## Guidelines

- Manter a linguagem em português e alinhada aos templates do projeto.
- Se faltar spec ou design, registrar como bloqueante e pular o par.
- O plan deve refletir o design e cobrir os requisitos da spec.

## Resources

### references/
- `references/create-plan.md`: regras e passos para criar plans a partir de spec + design.
