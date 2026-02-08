//Este arquivo tem como finalidade comprovar que os produtos selecionados
// para a criação de um pedido existem na unidade de negócio informada

import { ProductService } from '../../domain/ports/product.service';
import { ProductValidationErrorOutputDTO } from '../dtos/product-validation-error.output.dto';
import { ProductValidationInputDTO } from '../dtos/product-validation.input.dto';

export class ProductValidationService {
  constructor(private readonly productRepository: ProductService) {}

  async validateProductsExistisInBusinessUnit(
    products: ProductValidationInputDTO
  ): Promise<ProductValidationErrorOutputDTO[]> {
    // Lógica para validar se os produtos existem na unidade de negócio



    return [];
  }
}
