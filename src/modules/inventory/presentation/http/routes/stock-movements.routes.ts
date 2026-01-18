import { Router } from 'express';
import { StockMovementController } from '../controllers/stock-movement.controller';

export function createStockMovementsRouter(controller: StockMovementController): Router {
  const router = Router();

  router.get('/inventory/stock-movements', (req, res, next) =>
    controller.list(req, res, next)
  );

  return router;
}
