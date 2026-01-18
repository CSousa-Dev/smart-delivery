import { Router } from 'express';
import { InventoryItemController } from '../controllers/inventory-item.controller';

export function createInventoryItemsRouter(controller: InventoryItemController): Router {
  const router = Router();

  router.post('/inventory/items', (req, res, next) => controller.create(req, res, next));

  return router;
}
