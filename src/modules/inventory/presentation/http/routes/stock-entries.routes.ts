import { Router } from 'express';
import { StockEntryController } from '../controllers/stock-entry.controller';

export function createStockEntriesRouter(controller: StockEntryController): Router {
  const router = Router();

  router.post('/inventory/stock-entries', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
