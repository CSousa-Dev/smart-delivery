import { InventoryItem } from '../../../domain/entities/inventory-item.entity';

export class InventoryItemMapper {
  static toPersistence(item: InventoryItem) {
    return {
      id: item.getId().value,
      organizationId: item.getOrganizationId(),
      businessUnitId: item.getBusinessUnitId(),
      name: item.getName(),
      nameNormalized: item.getNameNormalized(),
      type: item.getType(),
      unitOfMeasureId: item.getUnitOfMeasureId(),
      requiresExpiration: item.getRequiresExpiration(),
      createdBy: item.getCreatedBy(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt(),
    };
  }
}
