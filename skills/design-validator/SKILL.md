---
name: design-validator
description: Validar designs técnicos deste repositório quanto a arquitetura, completude e consistência com a spec. Use quando o usuário pedir revisão/avaliação de design.md, checagem de aderência DDD, ou relatório com notas por critério antes de seguir para plan.
---

# Design Validator

## Overview

Validar design técnico com base em um rubric de arquitetura e no contexto do projeto. Entrega avaliação estruturada com notas, problemas e veredicto.

## Workflow

### 1) Identificar arquivos de design

- Usar os caminhos informados pelo usuário (aceitar múltiplos).
- Para cada design, identificar a spec correspondente (mesmo diretório com `spec.md` ou caminho fornecido).
- Se a spec não estiver clara, pedir o caminho antes de validar.

### 2) Carregar referências

- Usar `references/validate-design.md` como rubric e formato de saída.
- Usar `specs/project.md` para regras de arquitetura e camadas.
- Usar `specs/templates/design-template.md` para conferir seções esperadas.

### 3) Validar design

- Atribuir notas 1–5 para cada critério com observações objetivas.
- Checar consistência com a spec (requisitos, user stories e acceptance criteria).
- Verificar cobertura de componentes (Entity, VOs, Repository, Services, DTOs, Controller).
- Apontar violações de arquitetura e lacunas técnicas.

### 4) Produzir saída

- Usar o formato definido em `references/validate-design.md`.
- Exibir um resumo curto no chat com nota total e veredicto.
- Persistir um `design-validation.md` ao lado do design apenas se o usuário solicitar.

## Guidelines

- Não editar o conteúdo do design sem pedido explícito.
- Manter a linguagem em português.
- Se diagramas estiverem inválidos (Mermaid), apontar claramente o erro.

## Resources

### references/
- `references/validate-design.md`: rubric completo e formato de saída para validação.
