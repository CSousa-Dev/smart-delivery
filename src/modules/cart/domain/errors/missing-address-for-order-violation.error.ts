import { CartStatus } from '../entities/cart-status.enum';

export class MissingAddressForOrderViolationError extends Error {
  constructor(status: CartStatus) {
    super(`Address is required when cart status is ${status}.`);
  }
}
