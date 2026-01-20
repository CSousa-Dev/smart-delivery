import { CreateUnitOfMeasureService } from '../../application/services/create-unit-of-measure.service';
import { UpdateUnitOfMeasureService } from '../../application/services/update-unit-of-measure.service';
import { CreateInventoryItemService } from '../../application/services/create-inventory-item.service';
import { RegisterStockEntryService } from '../../application/services/register-stock-entry.service';
import { RegisterStockExitService } from '../../application/services/register-stock-exit.service';
import { GetStockPositionService } from '../../application/services/get-stock-position.service';
import { ListStockMovementsService } from '../../application/services/list-stock-movements.service';
import { StockExitAllocationService } from '../../domain/services/stock-exit-allocation.service';

export function createInventoryDomainServices() {
  return {
    stockExitAllocationService: new StockExitAllocationService(),
  };
}

export function createInventoryAppServices(
  repos: {
    inventoryItemRepository: any;
    unitOfMeasureRepository: any;
    stockLotRepository: any;
    stockMovementRepository: any;
  },
  adapters: {
    organizationRepository: any;
    businessUnitRepository: any;
  },
  domainServices: {
    stockExitAllocationService: StockExitAllocationService;
  }
) {
  return {
    createUnitOfMeasureService: new CreateUnitOfMeasureService(
      repos.unitOfMeasureRepository,
      adapters.organizationRepository
    ),
    updateUnitOfMeasureService: new UpdateUnitOfMeasureService(repos.unitOfMeasureRepository),
    createInventoryItemService: new CreateInventoryItemService(
      repos.inventoryItemRepository,
      adapters.businessUnitRepository,
      repos.unitOfMeasureRepository
    ),
    registerStockEntryService: new RegisterStockEntryService(
      repos.inventoryItemRepository,
      repos.unitOfMeasureRepository,
      repos.stockLotRepository,
      repos.stockMovementRepository
    ),
    registerStockExitService: new RegisterStockExitService(
      repos.inventoryItemRepository,
      repos.unitOfMeasureRepository,
      repos.stockLotRepository,
      repos.stockMovementRepository,
      domainServices.stockExitAllocationService
    ),
    getStockPositionService: new GetStockPositionService(
      repos.inventoryItemRepository,
      repos.stockLotRepository
    ),
    listStockMovementsService: new ListStockMovementsService(repos.stockMovementRepository),
  };
}
