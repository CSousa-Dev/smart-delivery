import { UpdateOrganizationService } from '../../../../../src/modules/organization/application/services/update-organization.service';
import {
  MissingLegalNameError,
  OrganizationNotFoundError,
} from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Update Organization', () => {
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
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
  });

  const buildService = () =>
    new UpdateOrganizationService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma)
    );

  it('should update organization tradeName and legalName', async () => {
    const service = buildService();

    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'PENDING_BUSINESS_UNIT',
        ownerUserId: null,
      },
    });

    const output = await service.execute({
      organizationId: 'org-1',
      tradeName: 'Loja Y',
      legalName: 'Loja Y LTDA',
    });

    const updated = await prisma.organization.findUnique({ where: { id: 'org-1' } });

    expect(output.tradeName).toBe('Loja Y');
    expect(output.legalName).toBe('Loja Y LTDA');
    expect(updated?.tradeName).toBe('Loja Y');
    expect(updated?.legalName).toBe('Loja Y LTDA');
  });

  it('should reject when organization does not exist', async () => {
    const service = buildService();

    await expect(
      service.execute({
        organizationId: 'org-inexistente',
        tradeName: 'Loja Y',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject when CNPJ organization has legalName cleared', async () => {
    const service = buildService();

    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'PENDING_BUSINESS_UNIT',
        ownerUserId: null,
      },
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        legalName: null,
      })
    ).rejects.toBeInstanceOf(MissingLegalNameError);
  });
});
