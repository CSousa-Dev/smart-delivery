import { createProductsAppServices } from './services';
import { ProductController } from '../../presentation/http/controllers/product.controller';

type AppServices = ReturnType<typeof createProductsAppServices>;

export function createProductsControllers(appServices: AppServices) {
  return {
    productController: new ProductController(appServices.createProductService),
  };
}
