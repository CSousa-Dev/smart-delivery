export class AddCartItemOperationsValidationError extends Error {
  public readonly code = 'ADD_CART_ITEM_OPERATIONS_VALIDATION';
  public readonly payload: { reason: string };

  constructor(reason: string) {
    super(reason);
    this.name = 'AddCartItemOperationsValidationError';
    this.payload = { reason };
    Object.setPrototypeOf(this, AddCartItemOperationsValidationError.prototype);
  }
}
