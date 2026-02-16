import { LinkOrganizationVerticalService } from '../../../../../src/modules/organization/application/services/link-organization-vertical.service';
import { UnlinkOrganizationVerticalService } from '../../../../../src/modules/organization/application/services/unlink-organization-vertical.service';
import {
  OrganizationNotFoundError,
  OrganizationRequiresActiveVerticalError,
  OrganizationVerticalNotFoundError,
  VerticalNotRegisteredError,
} from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';
import { createVerticalCatalogStub } from '../../../../helpers/organization/vertical-catalog-stub';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;
const validVerticalCodes = ['v1', 'v2'];

describeIf('Capability Manage Organization Verticals – [CAP-010]', () => {
  let prisma: OrganizationPrismaClient;

  beforeAll(() => {
    prisma = createOrganizationTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.organizationVertical.deleteMany();
    await prisma.businessUnitVertical.deleteMany();
    await prisma.businessUnitAddress.deleteMany();
    await prisma.businessUnit.deleteMany();
    await prisma.userOrganizationLink.deleteMany();
    await prisma.organization.deleteMany();
  });

  const buildLinkService = () =>
    new LinkOrganizationVerticalService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      createVerticalCatalogStub(validVerticalCodes)
    );

  const buildUnlinkService = () =>
    new UnlinkOrganizationVerticalService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      new PrismaOrganizationUnitOfWork(prisma)
    );

  const seedOrganization = async (ownerUserId: string | null = 'user-1') =>
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

  it('should link new vertical – [SCN-001]', async () => {
    const service = buildLinkService();
    await seedOrganization();

    const output = await service.execute({
      organizationId: 'org-1',
      verticalCode: 'v1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalCode: { organizationId: 'org-1', verticalCode: 'v1' } },
    });

    expect(output.status).toBe('ACTIVE');
    expect(link?.statusId).toBe('ACTIVE');
  });

  it('should reactivate inactive link – [SCN-002]', async () => {
    const service = buildLinkService();
    await seedOrganization();
    await prisma.organizationVertical.create({
      data: {
        organizationId: 'org-1',
        verticalCode: 'v1',
        statusId: 'INACTIVE',
      },
    });

    await service.execute({
      organizationId: 'org-1',
      verticalCode: 'v1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalCode: { organizationId: 'org-1', verticalCode: 'v1' } },
    });

    expect(link?.statusId).toBe('ACTIVE');
  });

  it('should link vertical when organization has no owner – [SCN-001b]', async () => {
    const service = buildLinkService();
    await seedOrganization(null);

    const output = await service.execute({
      organizationId: 'org-1',
      verticalCode: 'v1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalCode: { organizationId: 'org-1', verticalCode: 'v1' } },
    });

    expect(output.status).toBe('ACTIVE');
    expect(link?.statusId).toBe('ACTIVE');
  });

  it('should reject link when organization is missing – [SCN-003]', async () => {
    const service = buildLinkService();

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalCode: 'v1',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject link when vertical is not registered – [SCN-005]', async () => {
    const service = buildLinkService();
    await seedOrganization();

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalCode: 'unknown',
      })
    ).rejects.toBeInstanceOf(VerticalNotRegisteredError);
  });

  it('should unlink active vertical – [SCN-006]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();
    await prisma.organizationVertical.createMany({
      data: [
        { organizationId: 'org-1', verticalCode: 'v1', statusId: 'ACTIVE' },
        { organizationId: 'org-1', verticalCode: 'v2', statusId: 'ACTIVE' },
      ],
    });

    const output = await service.execute({
      organizationId: 'org-1',
      verticalCode: 'v1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalCode: { organizationId: 'org-1', verticalCode: 'v1' } },
    });

    expect(output.status).toBe('INACTIVE');
    expect(link?.statusId).toBe('INACTIVE');
  });

  it('should reject unlink when link is missing – [SCN-007]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalCode: 'v1',
      })
    ).rejects.toBeInstanceOf(OrganizationVerticalNotFoundError);
  });

  it('should reject unlink when last active vertical – [SCN-008]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();
    await prisma.organizationVertical.create({
      data: { organizationId: 'org-1', verticalCode: 'v1', statusId: 'ACTIVE' },
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalCode: 'v1',
      })
    ).rejects.toBeInstanceOf(OrganizationRequiresActiveVerticalError);
  });
});
