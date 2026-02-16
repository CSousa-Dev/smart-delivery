## Backend API Docs

Documentacao de contrato entre backend e frontend para consumo das APIs.

Estrutura:
- `docs/atributtes/`: modulo de atributos (admin e consumo)
  - `docs/atributtes/veritcals.md`: endpoints de verticais
  - `docs/atributtes/categories.md`: endpoints de categorias
  - `docs/atributtes/attributes.md`: definicao de atributos
  - `docs/atributtes/allowed-values.md`: allowed values globais
  - `docs/atributtes/vertical-attributes.md`: vinculo atributo x vertical
  - `docs/atributtes/category-attributes.md`: vinculo atributo x categoria
  - `docs/atributtes/resolved-attributes.md`: atributos resolvidos por contexto
- `docs/organization/`: modulo de organizacao
  - `docs/organization/guia-frontend-organizacao.md`: **ponto de entrada** para o frontend (visão geral, fluxos, endpoints)
  - `docs/organization/regras-negocio-organizacao-user-frontend.md`: regras de negocio (Create, List, Get, Update User/Organization)
  - `docs/organization/cadastro-organizacao-owner-vertical.md`: fluxos de cadastro e endpoints (Create, List, Get, Update)
  - `docs/organization/prompt-criacao-organizacao-frontend.md`: prompt resumido para organizacao
  - `docs/organization/prompt-criacao-usuario-frontend.md`: prompt resumido para usuario
