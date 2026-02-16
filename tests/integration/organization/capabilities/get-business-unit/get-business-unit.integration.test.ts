import { GetBusinessUnitService } from '../../../../../src/modules/organization/application/services/get-business-unit.service';
import {
  BusinessUnitNotFoundError,
  InvalidBusinessUnitIdError,
} from '../../../../../src/modules/organization/domain/errors/business-unit.errors';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import { PrismaBusinessUnitVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit-vertical/business-unit-vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';
import { createVerticalCatalogStub } from '../../../../helpers/organization/vertical-catalog-stub';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Get Business Unit – [CAP-008]', () => {
  let prisma: OrganizationPrismaClient;

  beforeAll(() => {
    prisma = createOrganizationTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.businessUnitAddress.deleteMany();
    await prisma.businessUnitVertical.deleteMany();
    await prisma.businessUnit.deleteMany();
    await prisma.organizationVertical.deleteMany();
    await prisma.userOrganizationLink.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
  });

  const buildService = () =>
    new GetBusinessUnitService(
      new PrismaBusinessUnitRepository(prisma),
      new PrismaBusinessUnitVerticalRepository(prisma),
      createVerticalCatalogStub(['v1', 'v2'])
    );

  it('should return business unit details – [SCN-001]', async () => {
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
    await prisma.businessUnit.create({
      data: {
        id: '11111111-1111-4111-8111-111111111111',
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
    await prisma.businessUnitVertical.create({
      data: {
        businessUnitId: '11111111-1111-4111-8111-111111111111',
        organizationId: 'org-1',
        verticalCode: 'v1',
        statusId: 'ACTIVE',
      },
    });

    const output = await service.execute({
      businessUnitId: '11111111-1111-4111-8111-111111111111',
      actorUserId: 'user-1',
    });

    expect(output.status).toBe('PENDING_PRODUCTS');
    expect(output.address.city).toBe('Sao Paulo');
    expect(output.verticals.map((v) => v.code)).toEqual(['v1']);
  });

  it('should return pending status – [SCN-002]', async () => {
    const service = buildService();
    await prisma.organization.create({
      data: {
        id: 'org-2',
        tradeName: 'Loja Y',
        legalName: 'Loja Y LTDA',
        documentType: 'CNPJ',
        documentNumber: '22345678901234',
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
      },
    });
    await prisma.businessUnit.create({
      data: {
        id: '22222222-2222-4222-8222-222222222222',
        organizationId: 'org-2',
        publicName: 'Loja Y',
        phoneNumber: '11988887777',
        phoneHasWhatsapp: true,
        statusId: 'PENDING_PRODUCTS',
        address: {
          create: {
            street: 'Rua B',
            number: '45',
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
    await prisma.businessUnitVertical.create({
      data: {
        businessUnitId: '22222222-2222-4222-8222-222222222222',
        organizationId: 'org-2',
        verticalCode: 'v2',
        statusId: 'ACTIVE',
      },
    });

    const output = await service.execute({
      businessUnitId: '22222222-2222-4222-8222-222222222222',
      actorUserId: 'user-1',
    });

    expect(output.status).toBe('PENDING_PRODUCTS');
  });

  it('should reject invalid business unit id – [SCN-003]', async () => {
    const service = buildService();

    await expect(
      service.execute({ businessUnitId: 'invalid', actorUserId: 'user-1' })
    ).rejects.toBeInstanceOf(InvalidBusinessUnitIdError);
  });

  it('should reject when business unit not found – [SCN-004]', async () => {
    const service = buildService();

    await expect(
      service.execute({
        businessUnitId: '11111111-1111-4111-8111-111111111111',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitNotFoundError);
  });
});
