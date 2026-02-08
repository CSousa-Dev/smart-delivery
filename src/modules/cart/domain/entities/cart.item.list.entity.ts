import { ItemQuantityViolationError } from '../errors/item-quantity-violation.error';
import { ItemNotFoundInCartViolationError } from '../errors/item-not-found-in-cart-violation.error';
import { CartItem } from './cart-item.entity';

export class CartItemList {
  private readonly items: CartItem[];

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  public getItens(): CartItem[] {
    return this.items;
  }

  public addItem(item: CartItem): void {
    this.validateQuantity(item);
    this.items.push(item);
  }

  public removeItem(itemId: string): void {
    const index = this.items.findIndex((item) => item.id.equals(itemId));
    if (index === -1) {
      throw new ItemNotFoundInCartViolationError(itemId);
    }
    this.items.splice(index, 1);
  }

  public updateItem(item: CartItem): void {
    const index = this.items.findIndex((existingItem) => existingItem.id.equals(item.id));
    if (index === -1) {
      throw new ItemNotFoundInCartViolationError(item.id.get());
    }
    this.validateQuantity(item);
    this.items[index] = item;
  }

  private validateQuantity(itemDTO: CartItem): void {
    if (itemDTO.quantity <= 0) {
      throw new ItemQuantityViolationError(itemDTO, 'Quantity must be greater than zero.');
    }
  }
}
