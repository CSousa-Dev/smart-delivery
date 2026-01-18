import { StockLot } from '../entities/stock-lot.entity';
import { LotAllocation } from '../value-objects/lot-allocation.vo';
import { InsufficientStockError, NoValidLotsError } from '../errors/stock-exit.errors';

export class StockExitAllocationService {
  allocate(params: {
    lots: StockLot[];
    quantity: number;
    occurredAt: Date;
    requiresExpiration: boolean;
    itemId: string;
  }): LotAllocation[] {
    const { lots, quantity, occurredAt, requiresExpiration, itemId } = params;

    const validLots = lots.filter((lot) => {
      if (lot.getQuantityAvailable() <= 0) {
        return false;
      }
      const expiresAt = lot.getExpiresAt();
      if (!expiresAt) {
        return !requiresExpiration;
      }
      return expiresAt.getTime() >= occurredAt.getTime();
    });

    if (validLots.length === 0) {
      throw new NoValidLotsError(itemId);
    }

    const sortedLots = validLots.sort((a, b) => {
      if (requiresExpiration) {
        const expA = a.getExpiresAt();
        const expB = b.getExpiresAt();
        if (expA && expB && expA.getTime() !== expB.getTime()) {
          return expA.getTime() - expB.getTime();
        }
        if (expA && !expB) {
          return -1;
        }
        if (!expA && expB) {
          return 1;
        }
      } else {
        if (a.getFirstEntryAt().getTime() !== b.getFirstEntryAt().getTime()) {
          return a.getFirstEntryAt().getTime() - b.getFirstEntryAt().getTime();
        }
      }

      return a.getLotNumber().localeCompare(b.getLotNumber());
    });

    let remaining = quantity;
    const allocations: LotAllocation[] = [];

    for (const lot of sortedLots) {
      if (remaining <= 0) {
        break;
      }
      const available = lot.getQuantityAvailable();
      if (available <= 0) {
        continue;
      }
      const used = Math.min(available, remaining);
      allocations.push(
        LotAllocation.create({
          lotId: lot.getId().value,
          lotNumber: lot.getLotNumber(),
          quantity: used,
        })
      );
      remaining -= used;
    }

    if (remaining > 0) {
      throw new InsufficientStockError(itemId);
    }

    return allocations;
  }
}
