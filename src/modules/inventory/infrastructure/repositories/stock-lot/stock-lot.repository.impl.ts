import { PrismaClient } from '@prisma/client';
import { StockLotRepository } from '../../../domain/repositories/stock-lot.repository';
import { StockLot } from '../../../domain/entities/stock-lot.entity';
import { StockLotMapper } from './stock-lot.mapper';

export class PrismaStockLotRepository implements StockLotRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByLotNumber(
    businessUnitId: string,
    lotNumber: string
  ): Promise<StockLot | null> {
    const prisma = this.prisma as any;
    const lot = await prisma.stockLot.findFirst({
      where: { businessUnitId, lotNumber },
    });

    if (!lot) {
      return null;
    }

    return StockLot.restore({
      id: lot.id,
      businessUnitId: lot.businessUnitId,
      itemId: lot.itemId,
      lotNumber: lot.lotNumber,
      expiresAt: lot.expiresAt,
      quantityAvailable: Number(lot.quantityAvailable),
      firstEntryAt: lot.firstEntryAt,
    });
  }

  async findByLotNumbers(
    businessUnitId: string,
    lotNumbers: string[]
  ): Promise<StockLot[]> {
    if (lotNumbers.length === 0) {
      return [];
    }
    const prisma = this.prisma as any;
    const lots = await prisma.stockLot.findMany({
      where: { businessUnitId, lotNumber: { in: lotNumbers } },
    });

    return lots.map((lot: any) =>
      StockLot.restore({
        id: lot.id,
        businessUnitId: lot.businessUnitId,
        itemId: lot.itemId,
        lotNumber: lot.lotNumber,
        expiresAt: lot.expiresAt,
        quantityAvailable: Number(lot.quantityAvailable),
        firstEntryAt: lot.firstEntryAt,
      })
    );
  }

  async listAvailableLots(businessUnitId: string, itemId: string): Promise<StockLot[]> {
    const prisma = this.prisma as any;
    const lots = await prisma.stockLot.findMany({
      where: {
        businessUnitId,
        itemId,
        quantityAvailable: { gt: 0 },
      },
    });

    return lots.map((lot: any) =>
      StockLot.restore({
        id: lot.id,
        businessUnitId: lot.businessUnitId,
        itemId: lot.itemId,
        lotNumber: lot.lotNumber,
        expiresAt: lot.expiresAt,
        quantityAvailable: Number(lot.quantityAvailable),
        firstEntryAt: lot.firstEntryAt,
      })
    );
  }

  async listByItemId(
    businessUnitId: string,
    itemId: string,
    includeZeroBalance: boolean
  ): Promise<StockLot[]> {
    const prisma = this.prisma as any;
    const lots = await prisma.stockLot.findMany({
      where: {
        businessUnitId,
        itemId,
        ...(includeZeroBalance ? {} : { quantityAvailable: { gt: 0 } }),
      },
    });

    const mapped = lots.map((lot: any) =>
      StockLot.restore({
        id: lot.id,
        businessUnitId: lot.businessUnitId,
        itemId: lot.itemId,
        lotNumber: lot.lotNumber,
        expiresAt: lot.expiresAt,
        quantityAvailable: Number(lot.quantityAvailable),
        firstEntryAt: lot.firstEntryAt,
      })
    );

    return mapped.sort((a: StockLot, b: StockLot) => {
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
      return a.getLotNumber().localeCompare(b.getLotNumber());
    });
  }

  async save(lot: StockLot): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.stockLot.create({
      data: StockLotMapper.toPersistence(lot),
    });
  }

  async incrementQuantity(lotId: string, quantity: number): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.stockLot.update({
      where: { id: lotId },
      data: {
        quantityAvailable: {
          increment: quantity,
        },
      },
    });
  }

  async decrementLots(
    allocations: Array<{ lotId: string; quantity: number }>
  ): Promise<void> {
    for (const allocation of allocations) {
      const prisma = this.prisma as any;
      await prisma.stockLot.update({
        where: { id: allocation.lotId },
        data: {
          quantityAvailable: {
            decrement: allocation.quantity,
          },
        },
      });
    }
  }
}
