import { OrganizationPrismaClient } from '../../database/prisma';
import { VerticalRepository } from '../../../domain/repositories/vertical.repository';
import { Vertical } from '../../../domain/entities/vertical.entity';
import { VerticalMapper } from './vertical.mapper';

export class PrismaVerticalRepository implements VerticalRepository {
  constructor(private readonly prisma: OrganizationPrismaClient) {}

  async listByIds(ids: string[]): Promise<Vertical[]> {
    if (ids.length === 0) {
      return [];
    }

    const verticals = await this.prisma.vertical.findMany({
      where: { id: { in: ids } },
      orderBy: { name: 'asc' },
    });

    return verticals.map((vertical) => VerticalMapper.toDomain(vertical));
  }
}
