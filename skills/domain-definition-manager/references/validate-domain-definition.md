# Validar Domain Definition

## Papel

Atuar como revisor de qualidade de dominio e validar prontidao para reuso por features.

## Criterios (nota 1-5)

1. Estrutura e completude.
2. Domain Meaning (representa / nao representa).
3. Linguagem ubiqua.
4. Eventos de dominio.
5. Invariantes.
6. Relacionamentos e fronteiras.
7. Reuso por features.
8. Clareza e agnosticismo tecnologico.

## Formato de saida

- Gerar tabela com notas e observacoes por criterio.
- Gerar veredicto: aprovado, aprovado com ressalvas, reprovado.
- Listar problemas encontrados e pontos fortes.

## Persistencia

- Salvar no mesmo diretorio do dominio avaliado:
  - `domain-definition-validation.md`

## Referencias do projeto

- Prompt base: `specs/prompts/validate/validate-domain-definition.md`
- Template: `specs/templates/domain-definition-template.md`
