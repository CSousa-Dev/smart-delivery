import {
  RegisterStockExitInput,
  RegisterStockExitOutput,
} from '../dtos/register-stock-exit.dto';
import { StockMovement, StockMovementSource } from '../../domain/entities/stock-movement.entity';
import { StockExitAllocationService } from '../../domain/services/stock-exit-allocation.service';
import { InventoryItemRepository } from '../../domain/repositories/inventory-item.repository';
import { UnitOfMeasureRepository } from '../../domain/repositories/unit-of-measure.repository';
import { StockLotRepository } from '../../domain/repositories/stock-lot.repository';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';
import {
  AllocationSumMismatchError,
  FractionNotAllowedError,
  InvalidMovementSourceError,
  InvalidQuantityError,
  InventoryItemNotFoundError,
  LotExpiredError,
  LotInsufficientBalanceError,
  LotItemMismatchError,
  LotNotFoundError,
  MissingExternalIdError,
} from '../../domain/errors/stock-exit.errors';
import { LotAllocation } from '../../domain/value-objects/lot-allocation.vo';

export class RegisterStockExitService {
  constructor(
    private readonly inventoryItemRepository: InventoryItemRepository,
    private readonly unitOfMeasureRepository: UnitOfMeasureRepository,
    private readonly stockLotRepository: StockLotRepository,
    private readonly stockMovementRepository: StockMovementRepository,
    private readonly allocationService: StockExitAllocationService
  ) {}

  async execute(input: RegisterStockExitInput): Promise<RegisterStockExitOutput> {
    if (input.quantity <= 0) {
      throw new InvalidQuantityError(input.quantity);
    }

    const allowedSources = [
      StockMovementSource.SALES_ORDER,
      StockMovementSource.PRODUCTION_ORDER,
      StockMovementSource.WASTE,
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

    let allocations: LotAllocation[] = [];
    if (input.lotAllocations && input.lotAllocations.length > 0) {
      const total = input.lotAllocations.reduce((sum, alloc) => sum + alloc.quantity, 0);
      if (total !== input.quantity) {
        throw new AllocationSumMismatchError(total, input.quantity);
      }

      const lotNumbers = input.lotAllocations.map((alloc) => alloc.lotNumber);
      const lots = await this.stockLotRepository.findByLotNumbers(
        input.businessUnitId,
        lotNumbers
      );

      if (lots.length !== lotNumbers.length) {
        const foundNumbers = new Set(lots.map((lot) => lot.getLotNumber()));
        const missing = lotNumbers.find((lotNumber) => !foundNumbers.has(lotNumber));
        throw new LotNotFoundError(missing ?? 'unknown');
      }

      allocations = input.lotAllocations.map((alloc) => {
        const lot = lots.find((found) => found.getLotNumber() === alloc.lotNumber)!;

        if (lot.getItemId() !== input.itemId) {
          throw new LotItemMismatchError(alloc.lotNumber, input.itemId);
        }

        const expiresAt = lot.getExpiresAt();
        if (item.requiresExpiration && !expiresAt) {
          throw new LotExpiredError(alloc.lotNumber);
        }
        if (expiresAt && expiresAt.getTime() < input.occurredAt.getTime()) {
          throw new LotExpiredError(alloc.lotNumber);
        }

        if (lot.getQuantityAvailable() < alloc.quantity) {
          throw new LotInsufficientBalanceError(alloc.lotNumber);
        }

        return LotAllocation.create({
          lotId: lot.getId().value,
          lotNumber: alloc.lotNumber,
          quantity: alloc.quantity,
        });
      });
    } else {
      const lots = await this.stockLotRepository.listAvailableLots(
        input.businessUnitId,
        input.itemId
      );
      allocations = this.allocationService.allocate({
        lots,
        quantity: input.quantity,
        occurredAt: input.occurredAt,
        requiresExpiration: item.requiresExpiration,
        itemId: input.itemId,
      });
    }

    await this.stockLotRepository.decrementLots(
      allocations.map((allocation) => ({
        lotId: allocation.lotId,
        quantity: allocation.quantity,
      }))
    );

    const movements = allocations.map((allocation) =>
      StockMovement.createExit({
        businessUnitId: input.businessUnitId,
        itemId: input.itemId,
        lotNumber: allocation.lotNumber,
        quantity: allocation.quantity,
        movementSource: input.movementSource,
        externalId: input.externalId ?? null,
        occurredAt: input.occurredAt,
        createdBy: input.createdBy,
      })
    );

    await this.stockMovementRepository.saveAll(movements);

    return {
      itemId: input.itemId,
      quantity: input.quantity,
      movementIds: movements.map((movement) => movement.getId().value),
      lots: allocations.map((allocation) => ({
        lotNumber: allocation.lotNumber,
        quantity: allocation.quantity,
      })),
    };
  }
}
