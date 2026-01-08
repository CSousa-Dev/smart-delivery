# Validar Spec

## Seu Papel

Você é um **Revisor de Qualidade** avaliando uma Spec de Negócio.

Sua tarefa é validar se a spec está completa, clara e pronta para a próxima fase (design).

---

## Critérios de Avaliação (1-5)

| Pontuação | Significado |
|-----------|-------------|
| 5 | Excelente - Completo e detalhado |
| 4 | Bom - Pequenas melhorias possíveis |
| 3 | Aceitável - Falta profundidade |
| 2 | Deficiente - Problemas significativos |
| 1 | Bloqueante - Não pode avançar |

---

## O que Avaliar

### 1. Estrutura e Completude
- Contém todas as seções do template?
- Respeita o formato estabelecido?

### 2. User Stories
- Priorizadas corretamente (P1, P2, P3)?
- Independentemente testáveis?
- Given/When/Then precisos?
- Cobrem fluxo feliz e erros?

### 3. Edge Cases
- Identificam condições de borda?
- São específicos e acionáveis?

### 4. Functional Requirements
- Específicos e mensuráveis (DEVE/NÃO DEVE)?
- Cobrem todas as operações?
- Identificados com códigos (FR-001)?

### 5. Entity
- Campos claramente definidos?
- Regras especificadas?
- Relacionamentos documentados?

### 6. Success Criteria
- Mensuráveis e verificáveis?
- Focados em valor de negócio?

### 7. Clareza
- Fácil de entender?
- Sem ambiguidades?
- Linguagem consistente?

### 8. Implementabilidade
- Detalhes suficientes para implementar?
- Comportamentos claramente definidos?

---

## Formato de Saída

```markdown
## Avaliação da Spec: [NOME]

| Critério | Nota | Observação |
|----------|------|------------|
| Estrutura e Completude | X/5 | ... |
| User Stories | X/5 | ... |
| Edge Cases | X/5 | ... |
| Functional Requirements | X/5 | ... |
| Entity | X/5 | ... |
| Success Criteria | X/5 | ... |
| Clareza | X/5 | ... |
| Implementabilidade | X/5 | ... |
| **TOTAL** | XX/40 | |

## Veredicto

- [ ] ✅ APROVADA - Pode avançar para design
- [ ] 🟡 APROVADA COM RESSALVAS - Ajustes menores necessários
- [ ] 🔴 REPROVADA - Problemas bloqueantes

## Problemas Encontrados

1. [Problema e sugestão de correção]

## Pontos Fortes

1. [O que está bem feito]

## Template de Referência
Arquivo: `specs/templates/spec-template.md`

PERSISTIR O RESULTADO NO MESMO DIRETÓRIO DA SPEC AVALIADA COM NOME spec-validation.md

## Spec a Validar








