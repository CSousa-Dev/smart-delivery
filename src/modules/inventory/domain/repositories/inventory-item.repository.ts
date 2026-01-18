import { InventoryItem } from '../entities/inventory-item.entity';

export interface InventoryItemRepository {
  existsByNameAndBusinessUnitId(nameNormalized: string, businessUnitId: string): Promise<boolean>;
  existsById(businessUnitId: string, itemId: string): Promise<boolean>;
  findById(id: string): Promise<{
    id: string;
    businessUnitId: string;
    unitOfMeasureId: string;
    requiresExpiration: boolean;
  } | null>;
  save(item: InventoryItem): Promise<void>;
}
