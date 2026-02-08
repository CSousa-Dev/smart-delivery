export class CartOwnerMismatchError extends Error {
  public readonly code = 'CART_OWNER_MISMATCH';
  public readonly payload: { actorUserId: string; cartId?: string };

  constructor(actorUserId: string, cartId?: string) {
    super('User is not owner of cart.');
    this.name = 'CartOwnerMismatchError';
    this.payload = { actorUserId, ...(cartId ? { cartId } : {}) };
    Object.setPrototypeOf(this, CartOwnerMismatchError.prototype);
  }
}
