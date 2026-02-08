import { ProductService } from '../../domain/ports/product.service';
import { OperationsService } from '../../domain/ports/operations.service';
import type { ProductValidationPayload } from '../../domain/product-validation';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { ValidationErrorsError } from '../errors/validation-errors.error';
import { AddCartItemOperationsValidationError } from '../errors/operations-validation.error';

/**
 * Serviço compartilhado: valida um item (produto + operações) antes de adicionar ou atualizar no carrinho.
 * Duas chamadas em paralelo: API de produtos (catálogo + addons + removals) e API de operações.
 */
export class ValidateCartItemService {
  constructor(
    private readonly productService: ProductService,
    private readonly operationsService: OperationsService
  ) {}

  public async execute(item: CartItem): Promise<void> {
    const payload = this.toProductValidationPayload(item);

    const [productResult, operationsResult] = await Promise.all([
      this.productService.validateProduct(item.businessUnitId, payload),
      this.operationsService.checkSaleFeasibility(item),
    ]);

    if (!productResult.isValid) {
      throw new ValidationErrorsError(productResult.productValidationErrors);
    }
    if (!operationsResult.isValid) {
      throw new AddCartItemOperationsValidationError(
        operationsResult.reason ?? 'Operations validation failed'
      );
    }
  }

  private toProductValidationPayload(item: CartItem): ProductValidationPayload {
    return {
      sku: item.sku,
      quantity: item.quantity,
      addons: item.addons.map((a) => ({ sku: a.sku, quantity: a.quantity })),
      removals: item.removals.map((r) => ({ sku: r.sku, quantity: 1 })),
    };
  }
}
