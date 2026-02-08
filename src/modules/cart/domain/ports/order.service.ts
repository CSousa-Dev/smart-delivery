import { Cart } from '../entities/cart.entity';
import { OrderPaymentReference } from '../value-objects/order-payment-reference.vo';

export interface OrderService {
  createOrderFromCart(cart: Cart, payment: OrderPaymentReference): Promise<string>;
}
