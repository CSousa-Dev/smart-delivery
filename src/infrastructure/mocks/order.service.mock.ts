import { OrderService } from '../../modules/cart/domain/ports/order.service';
import { Cart } from '../../modules/cart/domain/entities/cart.entity';
import { OrderPaymentReference } from '../../modules/cart/domain/value-objects/order-payment-reference.vo';

export class OrderServiceMock implements OrderService {
  async createOrderFromCart(cart: Cart, _payment: OrderPaymentReference): Promise<string> {
    return `order-${cart.id.get()}`;
  }
}
