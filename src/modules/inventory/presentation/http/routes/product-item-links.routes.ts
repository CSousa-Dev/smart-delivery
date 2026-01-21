import { Router } from 'express';
import { ProductItemLinkController } from '../controllers/product-item-link.controller';

export function createProductItemLinksRouter(
  controller: ProductItemLinkController
): Router {
  const router = Router();

  router.post('/inventory/product-item-links', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.post('/inventory/product-item-links/deactivate', (req, res, next) =>
    controller.deactivate(req, res, next)
  );

  return router;
}
