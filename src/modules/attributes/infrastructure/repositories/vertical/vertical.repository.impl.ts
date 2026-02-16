import { PrismaClient } from '@prisma/client';
import { VerticalRepository } from '../../../domain/repositories/vertical.repository';
import { Vertical } from '../../../domain/entities/vertical.entity';
import { VerticalMapper } from './vertical.mapper';

export class PrismaVerticalRepository implements VerticalRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(vertical: Vertical): Promise<void> {
    await this.prisma.vertical.create({
      data: VerticalMapper.toPersistence(vertical),
    });
  }

  async update(vertical: Vertical): Promise<void> {
    const { id, createdAt, ...data } = VerticalMapper.toPersistence(vertical);
    await this.prisma.vertical.update({
      where: { id: vertical.getId().value },
      data,
    });
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.prisma.vertical.count({
      where: { name },
    });

    return count > 0;
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await this.prisma.vertical.count({
      where: { code },
    });

    return count > 0;
  }

  async existsByNameExcludingId(name: string, excludeId: string): Promise<boolean> {
    const count = await this.prisma.vertical.count({
      where: {
        name,
        id: { not: excludeId },
      },
    });

    return count > 0;
  }

  async existsByCodeExcludingId(code: string, excludeId: string): Promise<boolean> {
    const count = await this.prisma.vertical.count({
      where: {
        code,
        id: { not: excludeId },
      },
    });

    return count > 0;
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prisma.vertical.count({
      where: { id, isActive: true },
    });

    return count > 0;
  }

  async findById(id: string): Promise<Vertical | null> {
    const found = await this.prisma.vertical.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return VerticalMapper.toDomain(found);
  }

  async listAll(): Promise<Vertical[]> {
    const items = await this.prisma.vertical.findMany({
      orderBy: { name: 'asc' },
    });

    return items.map((item) => VerticalMapper.toDomain(item));
  }
}
