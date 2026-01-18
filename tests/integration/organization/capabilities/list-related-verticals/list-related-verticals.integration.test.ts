import { ListOrganizationVerticalsService } from '../../../../../src/modules/organization/application/services/list-organization-verticals.service';
import { ListBusinessUnitVerticalsService } from '../../../../../src/modules/organization/application/services/list-business-unit-verticals.service';
import {
  BusinessUnitNotFoundError,
} from '../../../../../src/modules/organization/domain/errors/business-unit.errors';
import {
  OrganizationNotFoundError,
} from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import { PrismaBusinessUnitVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit-vertical/business-unit-vertical.repository.impl';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import { PrismaVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/vertical/vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability List Related Verticals – [CAP-012]', () => {
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
    await prisma.organization.deleteMany();
    await prisma.vertical.deleteMany();
  });

  const buildOrgService = () =>
    new ListOrganizationVerticalsService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      new PrismaVerticalRepository(prisma)
    );

  const buildBuService = () =>
    new ListBusinessUnitVerticalsService(
      new PrismaBusinessUnitRepository(prisma),
      new PrismaBusinessUnitVerticalRepository(prisma),
      new PrismaVerticalRepository(prisma)
    );

  const seedOrganization = async () =>
    prisma.organization.create({
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

  const seedBusinessUnit = async () =>
    prisma.businessUnit.create({
      data: {
        id: 'unit-1',
        organizationId: 'org-1',
        publicName: 'Loja X',
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        statusId: 'PENDING_PRODUCTS',
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

  it('should list organization verticals with status – [SCN-001]', async () => {
    const service = buildOrgService();
    await seedOrganization();
    await prisma.vertical.createMany({
      data: [
        { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
        { id: 'vert-2', name: 'V2', code: 'v2', description: 'Vertical 2' },
      ],
    });
    await prisma.organizationVertical.createMany({
      data: [
        { organizationId: 'org-1', verticalId: 'vert-1', statusId: 'ACTIVE' },
        { organizationId: 'org-1', verticalId: 'vert-2', statusId: 'INACTIVE' },
      ],
    });

    const output = await service.execute({ organizationId: 'org-1' });

    expect(output.items).toHaveLength(2);
    expect(output.items.map((item) => item.status)).toEqual(
      expect.arrayContaining(['ACTIVE', 'INACTIVE'])
    );
  });

  it('should list business unit verticals with status – [SCN-002]', async () => {
    const service = buildBuService();
    await seedOrganization();
    await seedBusinessUnit();
    await prisma.vertical.createMany({
      data: [
        { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
        { id: 'vert-2', name: 'V2', code: 'v2', description: 'Vertical 2' },
      ],
    });
    await prisma.businessUnitVertical.createMany({
      data: [
        {
          businessUnitId: 'unit-1',
          organizationId: 'org-1',
          verticalId: 'vert-1',
          statusId: 'ACTIVE',
        },
        {
          businessUnitId: 'unit-1',
          organizationId: 'org-1',
          verticalId: 'vert-2',
          statusId: 'INACTIVE',
        },
      ],
    });

    const output = await service.execute({ businessUnitId: 'unit-1' });

    expect(output.items).toHaveLength(2);
    expect(output.items.map((item) => item.status)).toEqual(
      expect.arrayContaining(['ACTIVE', 'INACTIVE'])
    );
  });

  it('should reject organization vertical list when org missing – [SCN-003]', async () => {
    const service = buildOrgService();

    await expect(service.execute({ organizationId: 'org-1' })).rejects.toBeInstanceOf(
      OrganizationNotFoundError
    );
  });

  it('should reject business unit vertical list when unit missing – [SCN-004]', async () => {
    const service = buildBuService();

    await expect(service.execute({ businessUnitId: 'unit-1' })).rejects.toBeInstanceOf(
      BusinessUnitNotFoundError
    );
  });
});
