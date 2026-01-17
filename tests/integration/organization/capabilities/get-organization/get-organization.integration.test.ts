import { GetOrganizationService } from '../../../../../src/modules/organization/application/services/get-organization.service';
import {
  InvalidOrganizationIdError,
  OrganizationNotFoundError,
} from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import { PrismaUserRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user/user.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Get Organization – [CAP-006]', () => {
  let prisma: OrganizationPrismaClient;
  const organizationId = '11111111-1111-4111-8111-111111111111';

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
    new GetOrganizationService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      new PrismaBusinessUnitRepository(prisma),
      new PrismaUserRepository(prisma)
    );

  const seedOrganization = async () => {
    await prisma.vertical.createMany({
      data: [
        { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
        { id: 'vert-2', name: 'V2', code: 'v2', description: 'Vertical 2' },
      ],
    });
    await prisma.organization.create({
      data: {
        id: organizationId,
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
      },
    });
    await prisma.organizationVertical.createMany({
      data: [
        { organizationId, verticalId: 'vert-1' },
        { organizationId, verticalId: 'vert-2' },
      ],
    });
  };

  it('should return organization without includes – [SCN-001]', async () => {
    const service = buildService();
    await seedOrganization();

    const output = await service.execute({ organizationId });

    expect(output.verticalIds).toEqual(expect.arrayContaining(['vert-1', 'vert-2']));
    expect(output.businessUnits).toBeUndefined();
    expect(output.users).toBeUndefined();
  });

  it('should return organization with business units – [SCN-002]', async () => {
    const service = buildService();
    await seedOrganization();
    await prisma.businessUnit.create({
      data: {
        id: 'unit-1',
        organizationId,
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

    const output = await service.execute({
      organizationId,
      include: 'businessUnits',
    });

    expect(output.businessUnits?.length).toBe(1);
  });

  it('should return organization with business units and users – [SCN-003]', async () => {
    const service = buildService();
    await seedOrganization();
    await prisma.user.create({
      data: {
        id: 'user-1',
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
        statusId: 'ACTIVE',
      },
    });
    await prisma.userOrganizationLink.create({
      data: {
        userId: 'user-1',
        organizationId,
        isOwner: true,
      },
    });

    const output = await service.execute({
      organizationId,
      include: 'businessUnits,users',
    });

    expect(output.users?.length).toBe(1);
  });

  it('should return organization with users only – [SCN-004]', async () => {
    const service = buildService();
    await seedOrganization();
    await prisma.user.create({
      data: {
        id: 'user-2',
        firstName: 'Bruno',
        lastName: 'Souza',
        documentType: 'CPF',
        documentNumber: '98765432100',
        email: 'bruno@example.com',
        phoneNumber: '11988887777',
        emailOptIn: true,
        phoneOptIn: true,
        statusId: 'ACTIVE',
      },
    });
    await prisma.userOrganizationLink.create({
      data: {
        userId: 'user-2',
        organizationId,
        isOwner: false,
      },
    });

    const output = await service.execute({
      organizationId,
      include: 'users',
    });

    expect(output.users?.length).toBe(1);
    expect(output.businessUnits).toBeUndefined();
  });

  it('should return empty lists for missing links – [SCN-005]', async () => {
    const service = buildService();
    await seedOrganization();

    const output = await service.execute({
      organizationId,
      include: 'businessUnits,users',
    });

    expect(output.businessUnits).toEqual([]);
    expect(output.users).toEqual([]);
  });

  it('should ignore invalid include values – [SCN-006]', async () => {
    const service = buildService();
    await seedOrganization();

    const output = await service.execute({
      organizationId,
      include: 'businessUnits,foo,users,users',
    });

    expect(output.businessUnits).toEqual([]);
    expect(output.users).toEqual([]);
  });

  it('should reject invalid organization id – [SCN-007]', async () => {
    const service = buildService();

    await expect(
      service.execute({ organizationId: 'invalid' })
    ).rejects.toBeInstanceOf(InvalidOrganizationIdError);
  });

  it('should reject when organization not found – [SCN-008]', async () => {
    const service = buildService();

    await expect(
      service.execute({ organizationId: '11111111-1111-4111-8111-111111111111' })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });
});
