export type PaymentProcessedEvent = {
  cartId: string;
  paymentId: string;
  occurredAt: Date;
};

export interface PaymentProcessedListener {
  onPaymentProcessed(handler: (event: PaymentProcessedEvent) => Promise<void>): void;
}
