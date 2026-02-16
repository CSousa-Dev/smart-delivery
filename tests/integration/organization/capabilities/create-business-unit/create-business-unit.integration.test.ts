import { CreateBusinessUnitService } from '../../../../../src/modules/organization/application/services/create-business-unit.service';
import { OrganizationNotFoundError } from '../../../../../src/modules/organization/domain/errors/organization.errors';
import {
  OwnerCannotCreateBusinessUnitError,
  BusinessUnitLimitReachedError,
  UserNotOwnerError,
} from '../../../../../src/modules/organization/domain/errors/business-unit.errors';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import { PrismaBusinessUnitVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit-vertical/business-unit-vertical.repository.impl';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';
import { createVerticalCatalogStub } from '../../../../helpers/organization/vertical-catalog-stub';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Create Business Unit – [CAP-003]', () => {
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
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
  });

  const buildService = () =>
    new CreateBusinessUnitService(
      new PrismaBusinessUnitRepository(prisma),
      new PrismaBusinessUnitVerticalRepository(prisma),
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      new PrismaOrganizationUnitOfWork(prisma)
    );

  const createOrganization = async (
    overrides?: Partial<{ ownerUserId: string; statusId: string }>
  ) => {
    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: overrides?.statusId ?? 'PENDING_BUSINESS_UNIT',
        ownerUserId: overrides?.ownerUserId ?? 'user-1',
      },
    });
    await prisma.organizationVertical.create({
      data: {
        organizationId: 'org-1',
        verticalCode: 'v1',
        statusId: 'ACTIVE',
      },
    });
  };

  const baseInput = {
    organizationId: 'org-1',
    actorUserId: 'platform-1',
    verticalCodes: ['v1'],
    publicName: 'Loja X',
    phoneNumber: '11-99999-9999',
    phoneHasWhatsapp: true,
    address: {
      street: 'Rua A',
      number: '123',
      neighborhood: 'Centro',
      city: 'Sao Paulo',
      state: 'SP',
      postalCode: '01001-000',
      country: 'BR',
      referencePoint: 'Proximo ao mercado',
    },
  };

  it('should create business unit and activate organization – [SCN-001]', async () => {
    const service = buildService();
    await createOrganization();

    const output = await service.execute(baseInput);

    const unit = await prisma.businessUnit.findUnique({ where: { id: output.id } });
    const address = await prisma.businessUnitAddress.findUnique({
      where: { businessUnitId: output.id },
    });
    const organization = await prisma.organization.findUnique({
      where: { id: 'org-1' },
    });

    expect(output.status).toBe('PENDING_PRODUCTS');
    expect(unit).not.toBeNull();
    expect(address).not.toBeNull();
    expect(organization?.statusId).toBe('ACTIVE');
  });

  it('should reject when organization does not exist – [SCN-002]', async () => {
    const service = buildService();

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      OrganizationNotFoundError
    );
  });

  it('should reject when actor is owner (only platform can create BU) – [SCN-003]', async () => {
    const service = buildService();
    await createOrganization({ ownerUserId: 'user-1' });

    await expect(
      service.execute({
        ...baseInput,
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(OwnerCannotCreateBusinessUnitError);
  });

  it('should reject when business unit limit reached – [SCN-004]', async () => {
    const service = buildService();
    await createOrganization();
    await prisma.businessUnit.create({
      data: {
        id: 'existing-unit',
        organizationId: 'org-1',
        publicName: 'Existing',
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        statusId: 'PENDING_PRODUCTS',
        address: {
          create: {
            street: 'Rua A',
            number: '1',
            neighborhood: 'Centro',
            city: 'Sao Paulo',
            state: 'SP',
            postalCode: '01001000',
            country: 'BR',
            referencePoint: '',
          },
        },
      },
    });

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      BusinessUnitLimitReachedError
    );
  });
});
