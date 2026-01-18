import {
  GetStockPositionInput,
  GetStockPositionOutput,
} from '../dtos/get-stock-position.dto';
import { StockPosition, StockLotPosition } from '../../domain/entities/stock-position.entity';
import { InventoryItemRepository } from '../../domain/repositories/inventory-item.repository';
import { StockLotRepository } from '../../domain/repositories/stock-lot.repository';
import {
  InvalidStockPositionQueryError,
  InventoryItemNotFoundError,
  LotNotFoundError,
} from '../../domain/errors/stock-position.errors';

export class GetStockPositionService {
  constructor(
    private readonly inventoryItemRepository: InventoryItemRepository,
    private readonly stockLotRepository: StockLotRepository
  ) {}

  async execute(input: GetStockPositionInput): Promise<GetStockPositionOutput> {
    const hasItemId = Boolean(input.itemId);
    const hasLotNumber = Boolean(input.lotNumber);
    if ((hasItemId && hasLotNumber) || (!hasItemId && !hasLotNumber)) {
      throw new InvalidStockPositionQueryError();
    }

    if (hasItemId) {
      const itemExists = await this.inventoryItemRepository.existsById(
        input.businessUnitId,
        input.itemId as string
      );
      if (!itemExists) {
        throw new InventoryItemNotFoundError(input.itemId as string);
      }

      const lots = await this.stockLotRepository.listByItemId(
        input.businessUnitId,
        input.itemId as string,
        Boolean(input.includeZeroBalance)
      );

      const lotPositions = lots.map(
        (lot) => new StockLotPosition(lot.getLotNumber(), lot.getQuantityAvailable(), lot.getExpiresAt())
      );
      const totalAvailable = lotPositions.reduce(
        (sum, lot) => sum + lot.quantityAvailable,
        0
      );

      const position = new StockPosition(
        input.itemId as string,
        totalAvailable,
        lotPositions
      );

      return {
        itemId: position.itemId,
        totalAvailable: position.totalAvailable,
        lots: position.lots.map((lot) => ({
          lotNumber: lot.lotNumber,
          quantityAvailable: lot.quantityAvailable,
          expiresAt: lot.expiresAt,
        })),
      };
    }

    const lot = await this.stockLotRepository.findByLotNumber(
      input.businessUnitId,
      input.lotNumber as string
    );
    if (!lot) {
      throw new LotNotFoundError(input.lotNumber as string);
    }

    return {
      itemId: lot.getItemId(),
      lotNumber: lot.getLotNumber(),
      quantityAvailable: lot.getQuantityAvailable(),
      expiresAt: lot.getExpiresAt(),
    };
  }
}
