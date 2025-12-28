# Validar Plan

## Seu Papel

Você é um **Tech Lead** validando um Plan de Execução.

Sua tarefa é validar se o plan está completo, bem ordenado e pronto para execução.

---

## Critérios de Avaliação (1-5)

| Pontuação | Significado |
|-----------|-------------|
| 5 | Excelente - Pronto para executar |
| 4 | Bom - Pequenos ajustes |
| 3 | Aceitável - Precisa de revisão |
| 2 | Deficiente - Tasks mal definidas |
| 1 | Bloqueante - Não executável |

---

## O que Avaliar

### 1. Completude
- Todas as tasks do design mapeadas?
- Nenhum componente esquecido?
- Testes incluídos nas tasks?

### 2. Atomicidade
- Cada task é uma unidade de trabalho?
- Tasks não muito grandes?
- Tasks não muito granulares?

### 3. Verificabilidade
- Cada task tem critério de "done"?
- Verificações são objetivas?
- Checkpoints são validáveis?

### 4. Ordem e Dependências
- Phases respeitam dependências?
- Ordem faz sentido para a arquitetura?
- Sem dependências circulares?

### 5. Consistência com Design
- Todas as tasks refletem o design?
- Componentes do design têm tasks?
- Fluxos do design são implementáveis?

### 6. Consistência com Spec
- Tasks cobrem todos os requisitos?
- Acceptance Criteria serão validados?
- Edge cases terão testes?

### 7. Praticidade
- Tasks são executáveis?
- Checkpoints são alcançáveis?
- Riscos identificados?

---

## Formato de Saída

```markdown
## Avaliação do Plan: [NOME]

| Critério | Nota | Observação |
|----------|------|------------|
| Completude | X/5 | ... |
| Atomicidade | X/5 | ... |
| Verificabilidade | X/5 | ... |
| Ordem e Dependências | X/5 | ... |
| Consistência com Design | X/5 | ... |
| Consistência com Spec | X/5 | ... |
| Praticidade | X/5 | ... |
| **TOTAL** | XX/35 | |

## Veredicto

- [ ] ✅ APROVADO - Pode executar
- [ ] 🟡 APROVADO COM RESSALVAS - Ajustes menores
- [ ] 🔴 REPROVADO - Não executável

## Tasks Faltando

| Componente do Design | Task Necessária |
|---------------------|-----------------|
| [componente] | [task sugerida] |

## Problemas de Ordem

1. [Problema e correção]

## Sugestões de Melhoria

1. [Sugestão]
```

---

## Contexto do Projeto

<!-- Cole o project.md aqui -->

---

## Spec de Referência

<!-- Cole a spec aqui -->

---

## Design de Referência

<!-- Cole o design aqui -->

---

## Plan a Validar

<!-- Cole o plan aqui -->







