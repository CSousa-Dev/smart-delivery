import { LinkBusinessUnitVerticalService } from '../../../../../src/modules/organization/application/services/link-business-unit-vertical.service';
import { UnlinkBusinessUnitVerticalService } from '../../../../../src/modules/organization/application/services/unlink-business-unit-vertical.service';
import {
  BusinessUnitNotFoundError,
  BusinessUnitRequiresActiveVerticalError,
  BusinessUnitVerticalNotFoundError,
  UserNotOwnerError,
  VerticalNotInOrganizationError,
} from '../../../../../src/modules/organization/domain/errors/business-unit.errors';
import { OrganizationNotFoundError } from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import { PrismaBusinessUnitVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit-vertical/business-unit-vertical.repository.impl';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Manage Business Unit Verticals – [CAP-011]', () => {
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

  const buildLinkService = () =>
    new LinkBusinessUnitVerticalService(
      new PrismaBusinessUnitRepository(prisma),
      new PrismaBusinessUnitVerticalRepository(prisma),
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma)
    );

  const buildUnlinkService = () =>
    new UnlinkBusinessUnitVerticalService(
      new PrismaBusinessUnitRepository(prisma),
      new PrismaBusinessUnitVerticalRepository(prisma),
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationUnitOfWork(prisma)
    );

  const seedOrganization = async (ownerUserId = 'user-1') =>
    prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'ACTIVE',
        ownerUserId,
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

  it('should link vertical to business unit – [SCN-001]', async () => {
    const service = buildLinkService();
    await seedOrganization();
    await seedBusinessUnit();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });
    await prisma.organizationVertical.create({
      data: { organizationId: 'org-1', verticalId: 'vert-1', statusId: 'ACTIVE' },
    });

    const output = await service.execute({
      businessUnitId: 'unit-1',
      verticalId: 'vert-1',
      actorUserId: 'user-1',
    });

    const link = await prisma.businessUnitVertical.findUnique({
      where: { businessUnitId_verticalId: { businessUnitId: 'unit-1', verticalId: 'vert-1' } },
    });

    expect(output.status).toBe('ACTIVE');
    expect(link?.statusId).toBe('ACTIVE');
  });

  it('should reject when vertical is not active in organization – [SCN-002]', async () => {
    const service = buildLinkService();
    await seedOrganization();
    await seedBusinessUnit();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });

    await expect(
      service.execute({
        businessUnitId: 'unit-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(VerticalNotInOrganizationError);
  });

  it('should reject when business unit is missing – [SCN-003]', async () => {
    const service = buildLinkService();
    await seedOrganization();

    await expect(
      service.execute({
        businessUnitId: 'unit-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitNotFoundError);
  });

  it('should reject when organization is missing – [SCN-004]', async () => {
    const service = buildLinkService();
    await seedOrganization();
    await seedBusinessUnit();
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
    await prisma.organization.deleteMany();
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');

    await expect(
      service.execute({
        businessUnitId: 'unit-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject when user is not owner – [SCN-005]', async () => {
    const service = buildLinkService();
    await seedOrganization('user-2');
    await seedBusinessUnit();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });
    await prisma.organizationVertical.create({
      data: { organizationId: 'org-1', verticalId: 'vert-1', statusId: 'ACTIVE' },
    });

    await expect(
      service.execute({
        businessUnitId: 'unit-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(UserNotOwnerError);
  });

  it('should unlink vertical from business unit – [SCN-006]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();
    await seedBusinessUnit();
    await prisma.vertical.createMany({
      data: [
        { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
        { id: 'vert-2', name: 'V2', code: 'v2', description: 'Vertical 2' },
      ],
    });
    await prisma.organizationVertical.createMany({
      data: [
        { organizationId: 'org-1', verticalId: 'vert-1', statusId: 'ACTIVE' },
        { organizationId: 'org-1', verticalId: 'vert-2', statusId: 'ACTIVE' },
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
          statusId: 'ACTIVE',
        },
      ],
    });

    const output = await service.execute({
      businessUnitId: 'unit-1',
      verticalId: 'vert-1',
      actorUserId: 'user-1',
    });

    const link = await prisma.businessUnitVertical.findUnique({
      where: { businessUnitId_verticalId: { businessUnitId: 'unit-1', verticalId: 'vert-1' } },
    });

    expect(output.status).toBe('INACTIVE');
    expect(link?.statusId).toBe('INACTIVE');
  });

  it('should reject unlink when link is missing – [SCN-007]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();
    await seedBusinessUnit();

    await expect(
      service.execute({
        businessUnitId: 'unit-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitVerticalNotFoundError);
  });

  it('should reject unlink when last active vertical – [SCN-008]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();
    await seedBusinessUnit();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });
    await prisma.organizationVertical.create({
      data: { organizationId: 'org-1', verticalId: 'vert-1', statusId: 'ACTIVE' },
    });
    await prisma.businessUnitVertical.create({
      data: {
        businessUnitId: 'unit-1',
        organizationId: 'org-1',
        verticalId: 'vert-1',
        statusId: 'ACTIVE',
      },
    });

    await expect(
      service.execute({
        businessUnitId: 'unit-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitRequiresActiveVerticalError);
  });
});
