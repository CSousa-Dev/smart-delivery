import { CreateProductService } from '../../application/services/create-product.service';
import { createProductsRepositories } from './repositories';
import { createProductsAdapters } from './adapters';

type Repositories = ReturnType<typeof createProductsRepositories>;
type Adapters = ReturnType<typeof createProductsAdapters>;

export function createProductsAppServices(repos: Repositories, adapters: Adapters) {
  return {
    createProductService: new CreateProductService(
      repos.productRepository,
      adapters.businessUnitRepository,
      adapters.categoryRepository,
      adapters.attributeValueValidationPort
    ),
  };
}
