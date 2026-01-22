import { Router } from 'express';
import { createUnitsOfMeasureRouter } from './units-of-measure.routes';
import { createInventoryItemsRouter } from './inventory-items.routes';
import { createStockEntriesRouter } from './stock-entries.routes';
import { createStockExitsRouter } from './stock-exits.routes';
import { createStockPositionsRouter } from './stock-positions.routes';
import { createStockMovementsRouter } from './stock-movements.routes';
import { UnitOfMeasureController } from '../controllers/unit-of-measure.controller';
import { InventoryItemController } from '../controllers/inventory-item.controller';
import { StockEntryController } from '../controllers/stock-entry.controller';
import { StockExitController } from '../controllers/stock-exit.controller';
import { StockPositionController } from '../controllers/stock-position.controller';
import { StockMovementController } from '../controllers/stock-movement.controller';

export interface InventoryControllers {
  unitOfMeasureController: UnitOfMeasureController;
  inventoryItemController: InventoryItemController;
  stockEntryController: StockEntryController;
  stockExitController: StockExitController;
  stockPositionController: StockPositionController;
  stockMovementController: StockMovementController;
}

export function createInventoryHttpRouter(controllers: InventoryControllers): Router {
  const router = Router();

  router.use(createUnitsOfMeasureRouter(controllers.unitOfMeasureController));
  router.use(createInventoryItemsRouter(controllers.inventoryItemController));
  router.use(createStockEntriesRouter(controllers.stockEntryController));
  router.use(createStockExitsRouter(controllers.stockExitController));
  router.use(createStockPositionsRouter(controllers.stockPositionController));
  router.use(createStockMovementsRouter(controllers.stockMovementController));

  return router;
}
