import { ListOrganizationsService } from '../../../../../src/modules/organization/application/services/list-organizations.service';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';
import { createVerticalCatalogStub } from '../../../../helpers/organization/vertical-catalog-stub';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability List Organizations – [CAP-007]', () => {
  let prisma: OrganizationPrismaClient;

  beforeAll(() => {
    prisma = createOrganizationTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.businessUnitVertical.deleteMany();
    await prisma.businessUnitAddress.deleteMany();
    await prisma.businessUnit.deleteMany();
    await prisma.organizationVertical.deleteMany();
    await prisma.userOrganizationLink.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
  });

  const buildService = () =>
    new ListOrganizationsService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      createVerticalCatalogStub(['v1', 'v2'])
    );

  const seedOrganization = async (id: string, createdAt: Date, verticalCodes: string[]) => {
    const numericSuffix = id.replace(/\D/g, '') || '1';
    const documentNumber = String(10000000000000 + Number(numericSuffix)).padStart(14, '0');
    await prisma.organization.create({
      data: {
        id,
        tradeName: `Org ${id}`,
        legalName: `Org ${id} LTDA`,
        documentType: 'CNPJ',
        documentNumber,
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
        createdAt,
      },
    });
    await prisma.organizationVertical.createMany({
      data: verticalCodes.map((verticalCode) => ({
        organizationId: id,
        verticalCode,
        statusId: 'ACTIVE',
      })),
    });
  };

  it('should list organizations – [SCN-001]', async () => {
    const service = buildService();
    await seedOrganization('org-1', new Date('2026-01-01T00:00:00Z'), ['v1']);

    const output = await service.execute({});

    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one organization item');
    }
    expect(first.verticals.map((v) => v.code)).toEqual(['v1']);
  });

  it('should return empty list – [SCN-002]', async () => {
    const service = buildService();

    const output = await service.execute({});

    expect(output.items).toEqual([]);
    expect(output.totalItems).toBe(0);
  });

  it('should paginate organizations – [SCN-003]', async () => {
    const service = buildService();
    const baseDate = new Date('2026-01-01T00:00:00Z');
    const orgs = Array.from({ length: 21 }, (_, index) => ({
      id: `org-${index + 1}`,
      createdAt: new Date(baseDate.getTime() + index * 1000),
    }));
    await prisma.organization.createMany({
      data: orgs.map((org, index) => ({
        id: org.id,
        tradeName: `Org ${org.id}`,
        legalName: `Org ${org.id} LTDA`,
        documentType: 'CNPJ',
        documentNumber: String(10000000000000 + index),
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
        createdAt: org.createdAt,
      })),
    });
    await prisma.organizationVertical.createMany({
      data: orgs.map((org) => ({
        organizationId: org.id,
        verticalCode: 'v1',
        statusId: 'ACTIVE',
      })),
    });

    const output = await service.execute({ page: 2, pageSize: 20, sortDirection: 'desc' });

    expect(output.items).toHaveLength(1);
    expect(output.page).toBe(2);
  });

  it('should return empty list for page out of range – [SCN-004]', async () => {
    const service = buildService();
    await seedOrganization('org-10', new Date('2026-01-01T00:00:00Z'), ['v1']);

    const output = await service.execute({ page: 2, pageSize: 10 });

    expect(output.items).toEqual([]);
    expect(output.totalPages).toBe(1);
  });

  it('should adjust invalid pagination – [SCN-005]', async () => {
    const service = buildService();
    await seedOrganization('org-11', new Date('2026-01-01T00:00:00Z'), ['v1']);

    const output = await service.execute({ page: 0, pageSize: 120 });

    expect(output.page).toBe(1);
    expect(output.pageSize).toBe(20);
  });

  it('should adjust invalid sort direction – [SCN-006]', async () => {
    const service = buildService();
    await seedOrganization('org-12', new Date('2026-01-01T00:00:00Z'), ['v1']);

    const output = await service.execute({ sortDirection: 'invalid' });

    expect(output.items.length).toBe(1);
  });
});
