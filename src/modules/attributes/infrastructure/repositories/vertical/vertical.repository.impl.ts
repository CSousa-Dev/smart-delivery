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

  async existsById(id: string): Promise<boolean> {
    const count = await this.prisma.vertical.count({
      where: { id },
    });

    return count > 0;
  }
}
