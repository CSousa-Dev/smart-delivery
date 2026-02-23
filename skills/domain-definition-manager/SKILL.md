---
name: domain-definition-manager
description: Criar, refinar e validar definicoes de dominio agnosticas de tecnologia neste repositorio. Use quando o usuario pedir documentacao de dominio no estilo DDD (significado da entidade, eventos, invariantes e fronteiras), ou quando precisar gerar/atualizar arquivos `*.domain.md` e `domain-definition-validation.md` em `specs/modules/...`.
---

# Domain Definition Manager

## Overview

Definir e manter documentos de dominio que funcionam como fonte de verdade de negocio para features, evitando duplicacao de invariantes em specs de capability.

## Workflow

### 1) Definir escopo e destino

- Confirmar modulo/contexto alvo (ex.: `cart`, `orders`, `auth`).
- Confirmar nome do dominio (entidade ou conceito).
- Definir caminho alvo:
  - `specs/modules/<modulo>/<nome-dominio>.domain.md`
- Se o arquivo ja existir, tratar como refinamento e nao sobrescrever sem instrucao explicita.

### 2) Carregar referencias do projeto

- Ler `specs/project.md` para contexto global.
- Ler `specs/domain-definition-workflow.md` para convencoes de uso.
- Ler `specs/templates/domain-definition-template.md` para estrutura obrigatoria.
- Ler as referencias desta skill:
  - `references/create-domain-definition.md`
  - `references/refine-domain-definition.md`
  - `references/validate-domain-definition.md`

### 3) Inicializar documento

- Preferir `scripts/scaffold-domain-definition.sh` para criar o arquivo inicial.
- Nao sobrescrever arquivo existente sem confirmar.

### 4) Escrever ou refinar Domain Definition

- Preencher secoes de significado, linguagem ubiqua, eventos e invariantes.
- Definir fronteiras e relacionamentos permitidos/proibidos.
- Garantir IDs rastreaveis:
  - Eventos: `EV-001`, `EV-002`...
  - Invariantes: `INV-001`, `INV-002`...
- Descrever contrato de reuso por feature sem repetir regra global.

### 5) Validar e persistir

- Avaliar completude, consistencia e clareza com `references/validate-domain-definition.md`.
- Persistir validacao no mesmo diretorio com nome:
  - `domain-definition-validation.md`
- Resumir no chat o que foi criado/atualizado e pendencias.

## Guidelines

- Escrever em portugues, com linguagem de negocio.
- Nao incluir tecnologia, endpoint, framework, banco, schema ou pseudocodigo.
- Nao misturar regra de feature com regra global de dominio.
- Sempre referenciar IDs de invariantes/eventos ao conectar feature e dominio.
- Quando houver ambiguidade de negocio, perguntar objetivamente antes de finalizar.

## Resources

### scripts/
- `scripts/scaffold-domain-definition.sh`: cria `*.domain.md` a partir do template oficial.

### references/
- `references/create-domain-definition.md`: checklist para criacao.
- `references/refine-domain-definition.md`: checklist para refinamento.
- `references/validate-domain-definition.md`: rubric para validacao.
