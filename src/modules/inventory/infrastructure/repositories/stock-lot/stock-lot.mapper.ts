import { StockLot } from '../../../domain/entities/stock-lot.entity';

export class StockLotMapper {
  static toPersistence(lot: StockLot) {
    return {
      id: lot.getId().value,
      businessUnitId: lot.getBusinessUnitId(),
      itemId: lot.getItemId(),
      lotNumber: lot.getLotNumber(),
      expiresAt: lot.getExpiresAt(),
      quantityAvailable: lot.getQuantityAvailable(),
      firstEntryAt: lot.getFirstEntryAt(),
    };
  }
}
