import { OrganizationDbClient } from '../../database/prisma';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User, UserStatusValue } from '../../../domain/entities/user.entity';
import { UserMapper } from './user.mapper';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.getId().value },
      create: UserMapper.toPersistence(user),
      update: UserMapper.toPersistence(user),
    });
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return User.create({
      id: found.id,
      firstName: found.firstName,
      lastName: found.lastName,
      documentType: found.documentType,
      documentNumber: found.documentNumber,
      email: found.email,
      phoneNumber: found.phoneNumber,
      emailOptIn: found.emailOptIn,
      phoneOptIn: found.phoneOptIn,
      status: found.statusId as UserStatusValue,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async existsByDocumentNumber(documentNumber: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { documentNumber },
    });

    return count > 0;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });

    return count > 0;
  }

  async existsByPhoneNumber(phoneNumber: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { phoneNumber },
    });

    return count > 0;
  }

  async list(
    page: number,
    pageSize: number,
    sortDirection: 'asc' | 'desc'
  ): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return users.map((user: any) =>
      User.create({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        email: user.email,
        phoneNumber: user.phoneNumber,
        emailOptIn: user.emailOptIn,
        phoneOptIn: user.phoneOptIn,
        status: user.statusId as UserStatusValue,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );
  }

  async countAll(): Promise<number> {
    return this.prisma.user.count();
  }

  async listByOrganizationId(organizationId: string): Promise<User[]> {
    const links = await this.prisma.userOrganizationLink.findMany({
      where: { organizationId },
      include: { user: true },
      orderBy: { user: { createdAt: 'desc' } },
    });

    return links.map((link: any) =>
      User.create({
        id: link.user.id,
        firstName: link.user.firstName,
        lastName: link.user.lastName,
        documentType: link.user.documentType,
        documentNumber: link.user.documentNumber,
        email: link.user.email,
        phoneNumber: link.user.phoneNumber,
        emailOptIn: link.user.emailOptIn,
        phoneOptIn: link.user.phoneOptIn,
        status: link.user.statusId as UserStatusValue,
        createdAt: link.user.createdAt,
        updatedAt: link.user.updatedAt,
      })
    );
  }
}
