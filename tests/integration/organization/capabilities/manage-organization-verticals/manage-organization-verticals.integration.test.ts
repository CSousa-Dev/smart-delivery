import { LinkOrganizationVerticalService } from '../../../../../src/modules/organization/application/services/link-organization-vertical.service';
import { UnlinkOrganizationVerticalService } from '../../../../../src/modules/organization/application/services/unlink-organization-vertical.service';
import {
  OrganizationNotFoundError,
  OrganizationRequiresActiveVerticalError,
  OrganizationVerticalNotFoundError,
  VerticalNotRegisteredError,
} from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { UserNotOwnerError } from '../../../../../src/modules/organization/domain/errors/business-unit.errors';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import { PrismaOrganizationVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization-vertical/organization-vertical.repository.impl';
import { PrismaVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/vertical/vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

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
    await prisma.organization.deleteMany();
    await prisma.vertical.deleteMany();
  });

  const buildLinkService = () =>
    new LinkOrganizationVerticalService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
      new PrismaVerticalRepository(prisma)
    );

  const buildUnlinkService = () =>
    new UnlinkOrganizationVerticalService(
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationVerticalRepository(prisma),
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

  it('should link new vertical – [SCN-001]', async () => {
    const service = buildLinkService();
    await seedOrganization();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });

    const output = await service.execute({
      organizationId: 'org-1',
      verticalId: 'vert-1',
      actorUserId: 'user-1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalId: { organizationId: 'org-1', verticalId: 'vert-1' } },
    });

    expect(output.status).toBe('ACTIVE');
    expect(link?.statusId).toBe('ACTIVE');
  });

  it('should reactivate inactive link – [SCN-002]', async () => {
    const service = buildLinkService();
    await seedOrganization();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });
    await prisma.organizationVertical.create({
      data: {
        organizationId: 'org-1',
        verticalId: 'vert-1',
        statusId: 'INACTIVE',
      },
    });

    await service.execute({
      organizationId: 'org-1',
      verticalId: 'vert-1',
      actorUserId: 'user-1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalId: { organizationId: 'org-1', verticalId: 'vert-1' } },
    });

    expect(link?.statusId).toBe('ACTIVE');
  });

  it('should reject link when organization is missing – [SCN-003]', async () => {
    const service = buildLinkService();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject link when user is not owner – [SCN-004]', async () => {
    const service = buildLinkService();
    await seedOrganization('user-2');
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(UserNotOwnerError);
  });

  it('should reject link when vertical is not registered – [SCN-005]', async () => {
    const service = buildLinkService();
    await seedOrganization();

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(VerticalNotRegisteredError);
  });

  it('should unlink active vertical – [SCN-006]', async () => {
    const service = buildUnlinkService();
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
        { organizationId: 'org-1', verticalId: 'vert-2', statusId: 'ACTIVE' },
      ],
    });

    const output = await service.execute({
      organizationId: 'org-1',
      verticalId: 'vert-1',
      actorUserId: 'user-1',
    });

    const link = await prisma.organizationVertical.findUnique({
      where: { organizationId_verticalId: { organizationId: 'org-1', verticalId: 'vert-1' } },
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
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(OrganizationVerticalNotFoundError);
  });

  it('should reject unlink when last active vertical – [SCN-008]', async () => {
    const service = buildUnlinkService();
    await seedOrganization();
    await prisma.vertical.create({
      data: { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
    });
    await prisma.organizationVertical.create({
      data: { organizationId: 'org-1', verticalId: 'vert-1', statusId: 'ACTIVE' },
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        verticalId: 'vert-1',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(OrganizationRequiresActiveVerticalError);
  });
});
