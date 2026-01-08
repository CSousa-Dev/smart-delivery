---
name: spec-validator
description: Validar specs de negócio neste repositório quanto a completude, clareza, coesão interna e prontidão para design. Use quando o usuário pedir revisão/avaliação de specs, pontuação por critérios, verificação de consistência entre seções, ou geração de relatório spec-validation.md para um ou mais arquivos de spec.
---

# Spec Validator

## Overview

Validar specs de negócio com base em um rubric de qualidade, conferindo aderência ao template de spec, consistência entre seções e clareza para implementação. Gera um relatório padronizado `spec-validation.md` ao lado de cada spec analisada.

## Workflow

### 1) Identificar arquivos de spec

- Se o usuário informar caminhos, usar esses arquivos.
- Se não informar, pedir os caminhos e aceitar múltiplos arquivos.
- Se houver ambiguidade (padrão/glob), confirmar a lista antes de validar.

### 2) Carregar referências

- Usar `references/validate-spec.md` como rubric de avaliação e formato de saída.
- Usar o template `specs/templates/spec-template.md` para checar seções esperadas.

### 3) Validar cada spec

- Avaliar todos os critérios do rubric com notas 1–5 e observações objetivas.
- Verificar coesão entre seções (User Stories ↔ Acceptance Criteria ↔ FRs ↔ Entity ↔ Success Criteria).
- Apontar inconsistências, lacunas e ambiguidades com sugestões de correção.
- Determinar se a spec está pronta para design, com base nos critérios.

### 4) Gerar saída

- Produzir o relatório no formato definido em `references/validate-spec.md`.
- Persistir o resultado no mesmo diretório da spec com nome `spec-validation.md`.
- Se o arquivo já existir, sobrescrever (salvo orientação diferente do usuário).
- Exibir no chat um resumo curto com nota total e veredicto.

## Guidelines

- Não editar o conteúdo da spec sem pedido explícito do usuário.
- Manter a linguagem em português, seguindo a linguagem do template.
- Se houver múltiplas specs, gerar um `spec-validation.md` por spec.
- Se faltar informação crítica, marcar como bloqueante e explicar o impacto.

## Resources

### references/

- `references/validate-spec.md`: rubric completo e formato de saída para a validação.
