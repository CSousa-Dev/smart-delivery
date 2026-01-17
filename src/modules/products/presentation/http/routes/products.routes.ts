import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

export function createProductsRouter(controller: ProductController): Router {
  const router = Router();

  router.post('/products', (req, res, next) => controller.create(req, res, next));

  return router;
}
