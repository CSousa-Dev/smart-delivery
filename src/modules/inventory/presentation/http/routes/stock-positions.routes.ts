import { Router } from 'express';
import { StockPositionController } from '../controllers/stock-position.controller';

export function createStockPositionsRouter(controller: StockPositionController): Router {
  const router = Router();

  router.get('/inventory/stock-positions', (req, res, next) =>
    controller.get(req, res, next)
  );

  return router;
}
