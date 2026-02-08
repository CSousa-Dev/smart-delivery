import { Router } from 'express';
import { createCartRouter } from './cart.routes';
import { CartController } from '../controllers/cart.controller';

export interface CartControllers {
  cartController: CartController;
}

export function createCartHttpRouter(controllers: CartControllers): Router {
  const router = Router();

  router.use(createCartRouter(controllers.cartController));

  return router;
}
