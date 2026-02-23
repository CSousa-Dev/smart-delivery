# Refinar Domain Definition

## Papel

Atuar como revisor de dominio para melhorar clareza, consistencia e reutilizacao.

## Checklist de refinamento

1. Confirmar se o significado do dominio esta claro (represents / does not represent).
2. Revisar eventos para garantir gatilho e significado de negocio.
3. Revisar invariantes para garantir verificabilidade e ausencia de contradicao.
4. Revisar relacoes permitidas/proibidas e fronteiras.
5. Revisar contrato de reuso por feature para eliminar duplicacao.
6. Marcar pendencias com `[DECISION NEEDED]`.

## Regras obrigatorias

- Manter o documento agnostico de tecnologia.
- Nao inventar decisoes de negocio sem evidencias do contexto.
- Preservar IDs existentes quando a regra permanece a mesma.

## Referencias do projeto

- Prompt base: `specs/prompts/refine/refine-domain-definition.md`
- Template: `specs/templates/domain-definition-template.md`
