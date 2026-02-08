export interface CreateOrderProps {
  id?: string;
  clientId: string;
  businessUnitId: string;
  orderProducts: Array<{
    productId: string;
    quantity: number;
  }>;
  status: 'pending';
}

/*
 Como um pedido vai funcionar dentro do nosso sistema?

 O usuário selecionou os produtos que deseja comprar
 Assumimos que antes da criação do pedido os produtos foram devidamente validados garantindo que

 */
