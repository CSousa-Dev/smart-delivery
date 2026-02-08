1. Entidades de Dados (Modelo ER)
   Para suportar o comportamento de "Atributos Aninhados" e "Agregadores", a modelagem deve seguir esta estrutura:
   A. Produto (Item Base)
   É o nó raiz. Na vertical de pizzaria (Multisetup), o preço é 0.00. Nas demais, é o preço de vitrine.
   id: UUID interno.
   external_code: ID de integração com o PDV/Estoque.
   name: Nome do produto.
   price: Preço base (decimal).
   vertical_type: ENUM (RESTAURANT, PIZZARIA, MARKET).
   B. Agregador (Modifier Group)
   É o "Atributo Pai" que define as regras de negócio para as seleções.
   id: UUID interno.
   name: Nome único para o vendedor (ex: "Agregador Pães Gourmet").
   display_name: Nome visível ao cliente (ex: "Escolha seu Pão").
   min_choices: Mínimo de seleções (ex: 1 para obrigatório).
   max_choices: Máximo de seleções.
   is_multivalued: Booleano (se permite escolher o mesmo item mais de uma vez).
   C. Atributo Complemento (Option)
   É o valor permitido (Allowed Value). Ele é, em essência, um "Subproduto".
   id: UUID interno.
   product_id: Referência ao item no Estoque (Produto não-final).
   external_code: ID para baixa de estoque.
   increment_price: Valor a ser somado ao preço base (pode ser 0.00).
   order: Inteiro para ordenação na vitrine (1 a N).
   parent_modifier_group_id: FK para o Agregador.
2. Mapeamento de Vínculos (Hierarquia)
   A flexibilidade do sistema reside nas tabelas de associação:
   Tabela	De (Origem)	Para (Destino)	Atributos Adicionais
   Product_Association	Produto	Agregador	order, status (Ativo/Inativo)
   Nested_Association	Atributo Complemento	Agregador (Sub-nível)	Permite que uma opção abra um novo grupo
3. Exemplo de JSON para Sincronização (iFood API 2026)
   Ao realizar o PATCH no catálogo do iFood, a estrutura de atributos "multivalorados" segue este padrão de sub-objetos:
   json
   {
   "name": "Hambúrguer da Casa",
   "externalCode": "PROD-100",
   "price": 25.00,
   "modifierGroups": [
   {
   "name": "Escolha o Pão", // Agregador
   "min": 1,
   "max": 1,
   "options": [
   {
   "name": "Pão Brioche", // Atributo Complemento
   "externalCode": "ESTOQUE-BRIOCHE",
   "price": 2.00,
   "order": 1
   },
   {
   "name": "Pão Australiano",
   "externalCode": "ESTOQUE-AUST",
   "price": 3.00,
   "order": 2
   }
   ]
   }
   ]
   }
   Use o código com cuidado.

4. Regras de Negócio por Vertical
   Vertical Restaurante:
   O cálculo de preço é Produto.price + SUM(Option.increment_price).
   Vertical Pizzaria (Multisetup):
   Deve possuir obrigatoriamente um Agregador com a tag SIZE.
   O preço base do produto é ignorado; o preço da Option dentro do grupo SIZE assume o papel de preço principal.
   Gestão de Estoque:
   O sistema deve processar o externalCode de cada Option selecionada no pedido para realizar o "split" de baixa de insumos.
5. Links Úteis para Implementação (2026)
   Guia de Gerenciamento de Catálogos (Merchant API)
   Referência de Atributos e Modificadores
   Validação de Esquemas de Pizza/Multisetup



