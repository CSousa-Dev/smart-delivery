O usuário acessa a tela de produtos

Como os produtos são carregados para ele?

Ele vem através da configuração do catálogo de produtos que permite exibir os produtos
disponíbilizados pelas lojas/PDVs (BU).

O usuário consegue selecionar um produto, se o carrinho não possui produtos, o carrinho é aberto.
Quando o carrinho é aberto o primeiro produto é adicionado.
O carrinho precisa ser validado;
Precisa calcular preços;


Quando o usuário seleciona mais produtos:
Produtos inalterados são considerados válidos;
Ou seja, um produto é adicionado a um carrinho que já está aberto, não é todo o carrinho que é validado
é apenas o produto que foi selecionado atomicamente.

O carrinho surge em duas operações, ao adicionar o primeiro produto e ao finalizar a compra.
Logo a listagem de produtos dentro de um carrinho deve sempre ser imutavel inalteravel e 
manter a integridade dos produtos.

Ou seja
Primeiro produto, duas coisas são feitas
Carrinho é aberto
Produto adicioando (não literalmente, o produto é vinculado ao carrinho mas ambos são entidades atomcias)
Produtos subsequentes
Produto adicionado (não literalmente, o produto é vinculado ao carrinho mas ambos são entidades)

Ambos os produtos, itens de carrinho passam por suas validações para manterem consistencia