import { ListBusinessUnitsService } from '../../../../../src/modules/organization/application/services/list-business-units.service';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability List Business Units – [CAP-009]', () => {
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

  const buildService = () => new ListBusinessUnitsService(new PrismaBusinessUnitRepository(prisma));

  const seedOrganization = async (id: string) =>
    prisma.organization.create({
      data: {
        id,
        tradeName: `Org ${id}`,
        legalName: `Org ${id} LTDA`,
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
      },
    });

  const seedBusinessUnit = async (id: string, organizationId: string, createdAt: Date) =>
    prisma.businessUnit.create({
      data: {
        id,
        organizationId,
        publicName: `Unit ${id}`,
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        statusId: 'ACTIVE',
        createdAt,
        address: {
          create: {
            street: 'Rua A',
            number: '123',
            neighborhood: 'Centro',
            city: 'Sao Paulo',
            state: 'SP',
            postalCode: '01001000',
            country: 'BR',
            referencePoint: 'Proximo ao mercado',
          },
        },
      },
    });

  it('should list business units – [SCN-001]', async () => {
    const service = buildService();
    await seedOrganization('org-1');
    await seedBusinessUnit('unit-1', 'org-1', new Date('2026-01-01T00:00:00Z'));

    const output = await service.execute({});

    expect(output.items).toHaveLength(1);
    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one business unit item');
    }
    expect(first.organizationId).toBe('org-1');
  });

  it('should return empty list – [SCN-002]', async () => {
    const service = buildService();

    const output = await service.execute({});

    expect(output.items).toEqual([]);
    expect(output.totalItems).toBe(0);
  });

  it('should paginate business units – [SCN-003]', async () => {
    const service = buildService();
    await seedOrganization('org-1');
    const baseDate = new Date('2026-01-01T00:00:00Z');
    const units = Array.from({ length: 21 }, (_, index) => ({
      id: `unit-${index + 1}`,
      createdAt: new Date(baseDate.getTime() + index * 1000),
    }));
    for (const unit of units) {
      await seedBusinessUnit(unit.id, 'org-1', unit.createdAt);
    }

    const output = await service.execute({ page: 2, pageSize: 20, sortDirection: 'desc' });

    expect(output.items).toHaveLength(1);
    expect(output.page).toBe(2);
  });

  it('should return empty list for page out of range – [SCN-004]', async () => {
    const service = buildService();
    await seedOrganization('org-1');
    await seedBusinessUnit('unit-10', 'org-1', new Date('2026-01-01T00:00:00Z'));

    const output = await service.execute({ page: 2, pageSize: 10 });

    expect(output.items).toEqual([]);
    expect(output.totalPages).toBe(1);
  });

  it('should adjust invalid pagination – [SCN-005]', async () => {
    const service = buildService();
    await seedOrganization('org-1');
    await seedBusinessUnit('unit-11', 'org-1', new Date('2026-01-01T00:00:00Z'));

    const output = await service.execute({ page: 0, pageSize: 120 });

    expect(output.page).toBe(1);
    expect(output.pageSize).toBe(20);
  });

  it('should adjust invalid sort direction – [SCN-006]', async () => {
    const service = buildService();
    await seedOrganization('org-1');
    await seedBusinessUnit('unit-12', 'org-1', new Date('2026-01-01T00:00:00Z'));

    const output = await service.execute({ sortDirection: 'invalid' });

    expect(output.items.length).toBe(1);
  });
});
