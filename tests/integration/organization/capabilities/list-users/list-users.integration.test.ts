import { ListUsersService } from '../../../../../src/modules/organization/application/services/list-users.service';
import { PrismaUserOrganizationLinkRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user-organization-link/user-organization-link.repository.impl';
import { PrismaUserRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user/user.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability List Users – [CAP-005]', () => {
  let prisma: OrganizationPrismaClient;

  beforeAll(() => {
    prisma = createOrganizationTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.businessUnitAddress.deleteMany();
    await prisma.businessUnit.deleteMany();
    await prisma.organizationVertical.deleteMany();
    await prisma.userOrganizationLink.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.vertical.deleteMany();
  });

  const buildService = () =>
    new ListUsersService(
      new PrismaUserRepository(prisma),
      new PrismaUserOrganizationLinkRepository(prisma)
    );

  const createUser = async (id: string, createdAt: Date, sequence: number) =>
    prisma.user.create({
      data: {
        id,
        firstName: 'User',
        lastName: id,
        documentType: 'CPF',
        documentNumber: String(10000000000 + sequence),
        email: `${id}@example.com`,
        phoneNumber: String(11900000000 + sequence),
        emailOptIn: true,
        phoneOptIn: true,
        statusId: 'ACTIVE',
        createdAt,
      },
    });

  it('should list users with organization link – [SCN-001]', async () => {
    const service = buildService();
    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
      },
    });
    await createUser('user-1', new Date('2026-01-01T00:00:00Z'), 1);
    await prisma.userOrganizationLink.create({
      data: {
        userId: 'user-1',
        organizationId: 'org-1',
        isOwner: true,
      },
    });

    const output = await service.execute({});

    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one user item');
    }
    expect(first.organizationId).toBe('org-1');
  });

  it('should list users without organization link – [SCN-002]', async () => {
    const service = buildService();
    await createUser('user-2', new Date('2026-01-02T00:00:00Z'), 2);

    const output = await service.execute({});

    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one user item');
    }
    expect(first.organizationId).toBeNull();
  });

  it('should return empty list when no users – [SCN-003]', async () => {
    const service = buildService();

    const output = await service.execute({});

    expect(output.items).toEqual([]);
    expect(output.totalItems).toBe(0);
    expect(output.totalPages).toBe(0);
  });

  it('should paginate users – [SCN-004]', async () => {
    const service = buildService();
    const baseDate = new Date('2026-01-01T00:00:00Z');
    const users = Array.from({ length: 21 }, (_, index) => ({
      id: `user-${index + 1}`,
      createdAt: new Date(baseDate.getTime() + index * 1000),
    }));
    await prisma.user.createMany({
      data: users.map((user, index) => ({
        id: user.id,
        firstName: 'User',
        lastName: user.id,
        documentType: 'CPF',
        documentNumber: String(10000000000 + index),
        email: `${user.id}@example.com`,
        phoneNumber: String(11900000000 + index),
        emailOptIn: true,
        phoneOptIn: true,
        statusId: 'ACTIVE',
        createdAt: user.createdAt,
      })),
    });

    const output = await service.execute({ page: 2, pageSize: 20, sortDirection: 'desc' });

    expect(output.items).toHaveLength(1);
    expect(output.page).toBe(2);
    expect(output.pageSize).toBe(20);
  });

  it('should return empty list for page out of range – [SCN-005]', async () => {
    const service = buildService();
    await createUser('user-10', new Date('2026-01-01T00:00:00Z'), 10);

    const output = await service.execute({ page: 2, pageSize: 10 });

    expect(output.items).toEqual([]);
    expect(output.totalPages).toBe(1);
  });

  it('should adjust invalid pagination – [SCN-006]', async () => {
    const service = buildService();
    await createUser('user-11', new Date('2026-01-01T00:00:00Z'), 11);

    const output = await service.execute({ page: 0, pageSize: 120 });

    expect(output.page).toBe(1);
    expect(output.pageSize).toBe(20);
  });

  it('should adjust invalid sort direction – [SCN-007]', async () => {
    const service = buildService();
    await createUser('user-12', new Date('2026-01-01T00:00:00Z'), 12);

    const output = await service.execute({ sortDirection: 'invalid' });

    expect(output.items.length).toBe(1);
  });
});
