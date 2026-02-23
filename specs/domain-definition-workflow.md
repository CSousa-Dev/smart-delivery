# Domain Definition Workflow

Este fluxo cria documentos de domínio reutilizáveis por múltiplas features, evitando duplicação de regra em cada spec.

---

## Objetivo

Uma Domain Definition responde, de forma agnóstica de tecnologia:
- o que a entidade/conceito representa
- quais eventos de negócio a envolvem
- quais invariantes nunca podem ser quebradas
- quais relações são permitidas ou proibidas

---

## Quando criar

Crie uma Domain Definition quando:
- uma entidade/conceito passa a ser usada por mais de uma capability
- invariantes estão sendo repetidas em specs diferentes
- existe risco de interpretações diferentes sobre o mesmo conceito

---

## Onde salvar

Salvar no diretório do módulo:
- `specs/modules/<modulo>/<nome-entidade>.domain.md`

Exemplo:
- `specs/modules/cart/cart.domain.md`
- `specs/modules/orders/order.domain.md`

Se houver validação:
- `specs/modules/<modulo>/domain-definition-validation.md`

---

## Fluxo de criação

1. Criar o documento base com:
- `specs/prompts/create/create-domain-definition.md`
- `specs/templates/domain-definition-template.md`

2. Refinar o conteúdo:
- `specs/prompts/refine/refine-domain-definition.md`

3. Validar qualidade:
- `specs/prompts/validate/validate-domain-definition.md`

4. Aprovar e publicar no módulo.

---

## Regra de uso em Features

Toda spec de capability deve:
1. Referenciar a Domain Definition na seção `Domain References`.
2. Reusar IDs de invariantes/eventos (ex: `INV-003`, `EV-002`) quando aplicável.
3. Definir apenas regras locais da capability que não pertencem ao domínio global.

Toda spec de capability não deve:
1. Redefinir invariantes globais já aprovadas na Domain Definition.
2. Redefinir significado semântico da entidade.

---

## Critérios de pronto

Uma Domain Definition está pronta quando:
- possui limites semânticos claros (represents / does not represent)
- invariantes são verificáveis e possuem impacto de violação
- eventos de domínio estão explícitos
- relações permitidas/proibidas estão documentadas
- features conseguem referenciar sem repetir regra

---
