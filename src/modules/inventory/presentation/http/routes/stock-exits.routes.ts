import { Router } from 'express';
import { StockExitController } from '../controllers/stock-exit.controller';

export function createStockExitsRouter(controller: StockExitController): Router {
  const router = Router();

  router.post('/inventory/stock-exits', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
