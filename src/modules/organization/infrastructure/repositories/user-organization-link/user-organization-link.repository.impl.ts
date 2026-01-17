import { OrganizationDbClient } from '../../database/prisma';
import { UserOrganizationLink } from '../../../domain/entities/user-organization-link.entity';
import { UserOrganizationLinkRepository } from '../../../domain/repositories/user-organization-link.repository';
import { UserOrganizationLinkMapper } from './user-organization-link.mapper';

export class PrismaUserOrganizationLinkRepository implements UserOrganizationLinkRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async save(link: UserOrganizationLink): Promise<void> {
    await this.prisma.userOrganizationLink.create({
      data: UserOrganizationLinkMapper.toPersistence(link),
    });
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const count = await this.prisma.userOrganizationLink.count({
      where: { userId },
    });

    return count > 0;
  }

  async findByUserId(userId: string): Promise<UserOrganizationLink | null> {
    const link = await this.prisma.userOrganizationLink.findUnique({
      where: { userId },
    });

    if (!link) {
      return null;
    }

    return UserOrganizationLink.restore({
      userId: link.userId,
      organizationId: link.organizationId,
      isOwner: link.isOwner,
      createdAt: link.createdAt,
    });
  }

  async listByUserIds(userIds: string[]): Promise<UserOrganizationLink[]> {
    if (!userIds.length) {
      return [];
    }

    const links = await this.prisma.userOrganizationLink.findMany({
      where: { userId: { in: userIds } },
    });

    return links.map((link: any) =>
      UserOrganizationLink.restore({
        userId: link.userId,
        organizationId: link.organizationId,
        isOwner: link.isOwner,
        createdAt: link.createdAt,
      })
    );
  }
}
