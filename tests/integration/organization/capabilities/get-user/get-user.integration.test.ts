import { GetUserService } from '../../../../../src/modules/organization/application/services/get-user.service';
import { InvalidUserIdError, UserNotFoundError } from '../../../../../src/modules/organization/domain/errors/user.errors';
import { PrismaUserOrganizationLinkRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user-organization-link/user-organization-link.repository.impl';
import { PrismaUserRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user/user.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Get User – [CAP-004]', () => {
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
    await prisma.vertical.deleteMany();
  });

  const buildService = () =>
    new GetUserService(
      new PrismaUserRepository(prisma),
      new PrismaUserOrganizationLinkRepository(prisma)
    );

  it('should return user with organization link – [SCN-001]', async () => {
    const service = buildService();
    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'PENDING_BUSINESS_UNIT',
        ownerUserId: 'user-1',
      },
    });
    await prisma.user.create({
      data: {
        id: '11111111-1111-4111-8111-111111111111',
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
        userId: '11111111-1111-4111-8111-111111111111',
        organizationId: 'org-1',
        isOwner: true,
      },
    });

    const output = await service.execute({
      userId: '11111111-1111-4111-8111-111111111111',
      actorUserId: '11111111-1111-4111-8111-111111111111',
    });

    expect(output.organizationId).toBe('org-1');
  });

  it('should return user without organization link – [SCN-002]', async () => {
    const service = buildService();
    await prisma.user.create({
      data: {
        id: '22222222-2222-4222-8222-222222222222',
        firstName: 'Joao',
        lastName: 'Souza',
        documentType: 'CPF',
        documentNumber: '12345678902',
        email: 'joao@example.com',
        phoneNumber: '11988887777',
        emailOptIn: true,
        phoneOptIn: true,
        statusId: 'ORG_LINKED',
      },
    });

    const output = await service.execute({
      userId: '22222222-2222-4222-8222-222222222222',
      actorUserId: '22222222-2222-4222-8222-222222222222',
    });

    expect(output.organizationId).toBeNull();
  });

  it('should return inactive user – [SCN-003]', async () => {
    const service = buildService();
    await prisma.user.create({
      data: {
        id: '33333333-3333-4333-8333-333333333333',
        firstName: 'Maria',
        lastName: 'Oliveira',
        documentType: 'CPF',
        documentNumber: '12345678903',
        email: 'maria@example.com',
        phoneNumber: '11977776666',
        emailOptIn: true,
        phoneOptIn: true,
        statusId: 'INACTIVE',
      },
    });

    const output = await service.execute({
      userId: '33333333-3333-4333-8333-333333333333',
      actorUserId: '33333333-3333-4333-8333-333333333333',
    });

    expect(output.status).toBe('INACTIVE');
  });

  it('should reject invalid user id – [SCN-004]', async () => {
    const service = buildService();

    await expect(
      service.execute({
        userId: 'invalid',
        actorUserId: '11111111-1111-4111-8111-111111111111',
      })
    ).rejects.toBeInstanceOf(InvalidUserIdError);
  });

  it('should reject when user does not exist – [SCN-005]', async () => {
    const service = buildService();

    await expect(
      service.execute({
        userId: '11111111-1111-4111-8111-111111111111',
        actorUserId: '11111111-1111-4111-8111-111111111111',
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
