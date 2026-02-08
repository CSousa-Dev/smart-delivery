import { CartStatus } from './cart-status.enum';

export class CartStatusChange {
  constructor(
    public readonly status: CartStatus,
    public readonly changedAt: Date,
    public readonly durationMs?: number
  ) {}
}
