import { Router } from 'express';
import { createProductsRouter } from './products.routes';
import { ProductController } from '../controllers/product.controller';

export interface ProductsControllers {
  productController: ProductController;
}

export function createProductsHttpRouter(controllers: ProductsControllers): Router {
  const router = Router();

  router.use(createProductsRouter(controllers.productController));

  return router;
}
