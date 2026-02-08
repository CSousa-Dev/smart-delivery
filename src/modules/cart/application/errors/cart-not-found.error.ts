export class CartNotFoundError extends Error {
  public readonly code = 'CART_NOT_FOUND';
  public readonly payload: { cartId: string };

  constructor(cartId: string) {
    super(`Cart not found: ${cartId}`);
    this.name = 'CartNotFoundError';
    this.payload = { cartId };
    Object.setPrototypeOf(this, CartNotFoundError.prototype);
  }
}
