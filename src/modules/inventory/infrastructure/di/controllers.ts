import { UnitOfMeasureController } from '../../presentation/http/controllers/unit-of-measure.controller';
import { InventoryItemController } from '../../presentation/http/controllers/inventory-item.controller';
import { StockEntryController } from '../../presentation/http/controllers/stock-entry.controller';
import { StockExitController } from '../../presentation/http/controllers/stock-exit.controller';
import { StockPositionController } from '../../presentation/http/controllers/stock-position.controller';
import { StockMovementController } from '../../presentation/http/controllers/stock-movement.controller';

export function createInventoryControllers(appServices: {
  createUnitOfMeasureService: any;
  updateUnitOfMeasureService: any;
  createInventoryItemService: any;
  registerStockEntryService: any;
  registerStockExitService: any;
  getStockPositionService: any;
  listStockMovementsService: any;
}) {
  return {
    unitOfMeasureController: new UnitOfMeasureController(
      appServices.createUnitOfMeasureService,
      appServices.updateUnitOfMeasureService
    ),
    inventoryItemController: new InventoryItemController(appServices.createInventoryItemService),
    stockEntryController: new StockEntryController(appServices.registerStockEntryService),
    stockExitController: new StockExitController(appServices.registerStockExitService),
    stockPositionController: new StockPositionController(appServices.getStockPositionService),
    stockMovementController: new StockMovementController(appServices.listStockMovementsService),
  };
}
