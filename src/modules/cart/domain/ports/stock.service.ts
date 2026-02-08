import { CartItem } from '../entities/cart-item.entity';
import { CartItemStockValidation } from '../value-objects/cart-item-stock-validation.vo';

export interface StockService {
  validateStock(items: CartItem[]): Promise<CartItemStockValidation[]>;
}
