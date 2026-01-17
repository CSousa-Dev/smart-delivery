import { CreateBusinessUnitService } from '../../../../../src/modules/organization/application/services/create-business-unit.service';
import { OrganizationNotFoundError } from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { UserNotOwnerError } from '../../../../../src/modules/organization/domain/errors/business-unit.errors';
import { PrismaBusinessUnitRepository } from '../../../../../src/modules/organization/infrastructure/repositories/business-unit/business-unit.repository.impl';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

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
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationUnitOfWork(prisma)
    );

  const createOrganization = async (overrides?: Partial<{ ownerUserId: string; statusId: string }>) =>
    prisma.organization.create({
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

  const baseInput = {
    organizationId: 'org-1',
    actorUserId: 'user-1',
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

  it('should reject when user is not owner – [SCN-003]', async () => {
    const service = buildService();
    await createOrganization({ ownerUserId: 'user-1' });

    await expect(
      service.execute({
        ...baseInput,
        actorUserId: 'user-2',
      })
    ).rejects.toBeInstanceOf(UserNotOwnerError);
  });

  it('should keep organization active for additional unit – [SCN-004]', async () => {
    const service = buildService();
    await createOrganization({ statusId: 'ACTIVE' });

    await service.execute(baseInput);

    const organization = await prisma.organization.findUnique({
      where: { id: 'org-1' },
    });

    expect(organization?.statusId).toBe('ACTIVE');
  });
});
