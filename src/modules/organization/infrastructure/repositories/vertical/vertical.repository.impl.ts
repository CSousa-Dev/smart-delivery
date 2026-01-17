import { OrganizationPrismaClient } from '../../database/prisma';
import { VerticalRepository } from '../../../domain/repositories/vertical.repository';

export class PrismaVerticalRepository implements VerticalRepository {
  constructor(private readonly prisma: OrganizationPrismaClient) {}

  async existsByIds(ids: string[]): Promise<boolean> {
    if (ids.length === 0) {
      return false;
    }

    const count = await this.prisma.vertical.count({
      where: { id: { in: ids } },
    });

    return count === ids.length;
  }
}
