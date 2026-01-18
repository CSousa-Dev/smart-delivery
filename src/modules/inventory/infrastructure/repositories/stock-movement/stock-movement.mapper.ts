import { StockMovement } from '../../../domain/entities/stock-movement.entity';

export class StockMovementMapper {
  static toPersistence(movement: StockMovement) {
    return {
      id: movement.getId().value,
      businessUnitId: movement.getBusinessUnitId(),
      itemId: movement.getItemId(),
      lotNumber: movement.getLotNumber(),
      type: movement.getType(),
      quantity: movement.getQuantity(),
      movementSource: movement.getMovementSource(),
      externalId: movement.getExternalId(),
      occurredAt: movement.getOccurredAt(),
      createdBy: movement.getCreatedBy(),
    };
  }
}
