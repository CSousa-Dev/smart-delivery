import {
  RegisterStockEntryInput,
  RegisterStockEntryOutput,
} from '../dtos/register-stock-entry.dto';
import { StockLot } from '../../domain/entities/stock-lot.entity';
import {
  StockMovement,
  StockMovementSource,
} from '../../domain/entities/stock-movement.entity';
import { InventoryItemRepository } from '../../domain/repositories/inventory-item.repository';
import { UnitOfMeasureRepository } from '../../domain/repositories/unit-of-measure.repository';
import { StockLotRepository } from '../../domain/repositories/stock-lot.repository';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';
import {
  FractionNotAllowedError,
  InvalidMovementSourceError,
  InvalidQuantityError,
  InventoryItemNotFoundError,
  LotExpirationMismatchError,
  LotItemConflictError,
  MissingExpirationError,
  MissingExternalIdError,
} from '../../domain/errors/stock-entry.errors';

export class RegisterStockEntryService {
  constructor(
    private readonly inventoryItemRepository: InventoryItemRepository,
    private readonly unitOfMeasureRepository: UnitOfMeasureRepository,
    private readonly stockLotRepository: StockLotRepository,
    private readonly stockMovementRepository: StockMovementRepository
  ) {}

  async execute(input: RegisterStockEntryInput): Promise<RegisterStockEntryOutput> {
    if (input.quantity <= 0) {
      throw new InvalidQuantityError(input.quantity);
    }

    const allowedSources = [
      StockMovementSource.PURCHASE_ORDER,
      StockMovementSource.PRODUCTION_ORDER,
      StockMovementSource.INVENTORY_ADJUSTMENT,
    ];
    if (!allowedSources.includes(input.movementSource as StockMovementSource)) {
      throw new InvalidMovementSourceError(input.movementSource);
    }

    if (
      input.movementSource !== StockMovementSource.INVENTORY_ADJUSTMENT &&
      !input.externalId
    ) {
      throw new MissingExternalIdError();
    }

    const item = await this.inventoryItemRepository.findById(input.itemId);
    if (!item || item.businessUnitId !== input.businessUnitId) {
      throw new InventoryItemNotFoundError(input.itemId);
    }

    const unit = await this.unitOfMeasureRepository.findById(item.unitOfMeasureId);
    if (!unit) {
      throw new InventoryItemNotFoundError(input.itemId);
    }

    const hasFraction = Number(input.quantity) % 1 !== 0;
    if (!unit.allowsFraction && hasFraction) {
      throw new FractionNotAllowedError(input.quantity);
    }

    const existingLot = await this.stockLotRepository.findByLotNumber(
      input.businessUnitId,
      input.lotNumber
    );

    if (existingLot) {
      if (existingLot.getItemId() !== input.itemId) {
        throw new LotItemConflictError(input.lotNumber, input.itemId);
      }

      if (input.expiresAt && existingLot.getExpiresAt()) {
        if (existingLot.getExpiresAt()?.getTime() !== input.expiresAt.getTime()) {
          throw new LotExpirationMismatchError(input.lotNumber);
        }
      }

      if (input.expiresAt && !existingLot.getExpiresAt()) {
        throw new LotExpirationMismatchError(input.lotNumber);
      }

      await this.stockLotRepository.incrementQuantity(
        existingLot.getId().value,
        input.quantity
      );
    } else {
      if (item.requiresExpiration && !input.expiresAt) {
        throw new MissingExpirationError(input.itemId);
      }

      const lot = StockLot.create({
        businessUnitId: input.businessUnitId,
        itemId: input.itemId,
        lotNumber: input.lotNumber,
        expiresAt: input.expiresAt ?? null,
        quantityAvailable: input.quantity,
        firstEntryAt: input.occurredAt,
      });

      await this.stockLotRepository.save(lot);
    }

    const movement = StockMovement.createEntry({
      businessUnitId: input.businessUnitId,
      itemId: input.itemId,
      lotNumber: input.lotNumber,
      quantity: input.quantity,
      movementSource: input.movementSource,
      externalId: input.externalId ?? null,
      occurredAt: input.occurredAt,
      createdBy: input.createdBy,
    });

    await this.stockMovementRepository.save(movement);

    const lotAfter = await this.stockLotRepository.findByLotNumber(
      input.businessUnitId,
      input.lotNumber
    );

    return {
      lotId: lotAfter?.getId().value ?? '',
      itemId: input.itemId,
      lotNumber: input.lotNumber,
      quantity: input.quantity,
      movementId: movement.getId().value,
      movementSource: movement.getMovementSource(),
      occurredAt: movement.getOccurredAt(),
    };
  }
}
