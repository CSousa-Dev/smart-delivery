import { CartDomainEvent } from './cart-domain-event';
import { PaymentReceipt } from '../value-objects/payment-receipt.vo';

export class CartPaymentConfirmedEvent implements CartDomainEvent {
  readonly name = 'CartPaymentConfirmed';

  constructor(
    public readonly cartId: string,
    public readonly paymentReceipt: PaymentReceipt,
    public readonly occurredAt: Date = new Date()
  ) {}
}
