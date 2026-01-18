import {
  CreateInventoryItemInput,
  CreateInventoryItemOutput,
} from '../dtos/create-inventory-item.dto';
import { InventoryItem, InventoryItemName } from '../../domain/entities/inventory-item.entity';
import { InventoryItemRepository } from '../../domain/repositories/inventory-item.repository';
import { BusinessUnitRepository } from '../../domain/ports/business-unit.repository';
import { UnitOfMeasureRepository } from '../../domain/repositories/unit-of-measure.repository';
import {
  BusinessUnitNotFoundError,
  BusinessUnitOrganizationMismatchError,
  InventoryItemNameAlreadyExistsError,
  UnitOfMeasureInactiveError,
  UnitOfMeasureNotFoundError,
  UnitOfMeasureOrganizationMismatchError,
} from '../../domain/errors/inventory-item.errors';

export class CreateInventoryItemService {
  constructor(
    private readonly inventoryItemRepository: InventoryItemRepository,
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly unitOfMeasureRepository: UnitOfMeasureRepository
  ) {}

  async execute(input: CreateInventoryItemInput): Promise<CreateInventoryItemOutput> {
    const businessUnitExists = await this.businessUnitRepository.existsById(
      input.businessUnitId
    );
    if (!businessUnitExists) {
      throw new BusinessUnitNotFoundError(input.businessUnitId);
    }

    const businessUnitValid = await this.businessUnitRepository.existsByIdAndOrganizationId(
      input.businessUnitId,
      input.organizationId
    );
    if (!businessUnitValid) {
      throw new BusinessUnitOrganizationMismatchError(
        input.businessUnitId,
        input.organizationId
      );
    }

    const unitOfMeasure = await this.unitOfMeasureRepository.findById(input.unitOfMeasureId);
    if (!unitOfMeasure) {
      throw new UnitOfMeasureNotFoundError(input.unitOfMeasureId);
    }
    if (unitOfMeasure.organizationId !== input.organizationId) {
      throw new UnitOfMeasureOrganizationMismatchError(
        input.unitOfMeasureId,
        input.organizationId
      );
    }
    if (unitOfMeasure.status !== 'ACTIVE') {
      throw new UnitOfMeasureInactiveError(input.unitOfMeasureId);
    }

    const name = InventoryItemName.create(input.name);
    const nameExists = await this.inventoryItemRepository.existsByNameAndBusinessUnitId(
      name.normalized,
      input.businessUnitId
    );
    if (nameExists) {
      throw new InventoryItemNameAlreadyExistsError(input.name);
    }

    const item = InventoryItem.create(input);

    await this.inventoryItemRepository.save(item);

    return {
      id: item.getId().value,
      organizationId: item.getOrganizationId(),
      businessUnitId: item.getBusinessUnitId(),
      name: item.getName(),
      type: item.getType(),
      unitOfMeasureId: item.getUnitOfMeasureId(),
      requiresExpiration: item.getRequiresExpiration(),
      createdBy: item.getCreatedBy(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt(),
    };
  }
}
