---
name: plan-validator
description: Validar plans de execução quanto a completude, ordem, verificabilidade e consistência com spec e design. Use quando o usuário pedir revisão/avaliação de plan.md antes de executar ou quando quiser identificar gaps de tarefas e dependências.
---

# Plan Validator

## Overview

Validar plans de execução com base em um rubric técnico e no contexto do projeto. Entrega avaliação estruturada com notas, problemas e veredicto.

## Workflow

### 1) Identificar arquivos de plan

- Usar os caminhos informados pelo usuário (aceitar múltiplos).
- Para cada plan, localizar a spec e o design correspondentes (mesmo diretório com `spec.md` e `design.md` ou caminhos fornecidos).
- Se não houver contexto suficiente, pedir os caminhos antes de validar.

### 2) Carregar referências

- Usar `references/validate-plan.md` como rubric e formato de saída.
- Usar `specs/templates/plan-template.md` para conferir estrutura e seções esperadas.
- Usar `specs/project.md` para dependências e padrões do projeto.

### 3) Validar plan

- Atribuir notas 1–5 para cada critério com observações objetivas.
- Verificar se todas as tasks do design estão mapeadas.
- Checar se cada task é atômica, verificável e com testes incluídos.
- Avaliar ordem, dependências e consistência com spec (ACs e edge cases).

### 4) Produzir saída

- Usar o formato definido em `references/validate-plan.md`.
- Exibir um resumo curto no chat com nota total e veredicto.
- Persistir um `plan-validation.md` ao lado do plan apenas se o usuário solicitar.

## Guidelines

- Não editar o conteúdo do plan sem pedido explícito.
- Manter a linguagem em português.
- Se houver gaps claros, propor tasks faltantes de forma objetiva.

## Resources

### references/
- `references/validate-plan.md`: rubric completo e formato de saída para validação.
