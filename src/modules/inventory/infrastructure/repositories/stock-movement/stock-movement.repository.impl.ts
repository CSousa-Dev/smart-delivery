import { PrismaClient } from '@prisma/client';
import { StockMovementRepository } from '../../../domain/repositories/stock-movement.repository';
import { StockMovement } from '../../../domain/entities/stock-movement.entity';
import { StockMovementMapper } from './stock-movement.mapper';
import { StockMovementRecord } from '../../../domain/entities/stock-movement-record.entity';

export class PrismaStockMovementRepository implements StockMovementRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(movement: StockMovement): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.stockMovement.create({
      data: StockMovementMapper.toPersistence(movement),
    });
  }

  async saveAll(movements: StockMovement[]): Promise<void> {
    if (movements.length === 0) {
      return;
    }
    const prisma = this.prisma as any;
    await prisma.stockMovement.createMany({
      data: movements.map((movement) => StockMovementMapper.toPersistence(movement)),
    });
  }

  async listByFilters(params: {
    businessUnitId: string;
    itemId?: string;
    lotNumber?: string;
    movementType?: string;
    movementSource?: string;
    externalId?: string;
    occurredAtStart?: Date;
    occurredAtEnd?: Date;
    page: number;
    pageSize: number;
  }): Promise<{ records: StockMovementRecord[]; total: number }> {
    const {
      businessUnitId,
      itemId,
      lotNumber,
      movementType,
      movementSource,
      externalId,
      occurredAtStart,
      occurredAtEnd,
      page,
      pageSize,
    } = params;

    const where = {
      businessUnitId,
      ...(itemId ? { itemId } : {}),
      ...(lotNumber ? { lotNumber } : {}),
      ...(movementType ? { type: movementType } : {}),
      ...(movementSource ? { movementSource } : {}),
      ...(externalId ? { externalId } : {}),
      ...(occurredAtStart || occurredAtEnd
        ? {
            occurredAt: {
              ...(occurredAtStart ? { gte: occurredAtStart } : {}),
              ...(occurredAtEnd ? { lte: occurredAtEnd } : {}),
            },
          }
        : {}),
    };

    const prisma = this.prisma as any;
    const [total, records] = await prisma.$transaction([
      prisma.stockMovement.count({ where }),
      prisma.stockMovement.findMany({
        where,
        orderBy: [{ occurredAt: 'asc' }, { id: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      total,
      records: records.map(
        (record: any) =>
          new StockMovementRecord(
            record.id,
            record.itemId,
            record.lotNumber,
            record.type,
            Number(record.quantity),
            record.movementSource,
            record.externalId,
            record.occurredAt,
            record.createdBy
          )
      ),
    };
  }
}
