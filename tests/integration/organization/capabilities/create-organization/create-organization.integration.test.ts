import { CreateOrganizationService } from '../../../../../src/modules/organization/application/services/create-organization.service';
import {
  MissingLegalNameError,
  OwnerUserNotFoundError,
  UserAlreadyLinkedError,
  VerticalNotRegisteredError,
} from '../../../../../src/modules/organization/domain/errors/organization.errors';
import { DocumentAlreadyExistsError } from '../../../../../src/modules/organization/domain/errors/user.errors';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import { PrismaUserOrganizationLinkRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user-organization-link/user-organization-link.repository.impl';
import { PrismaUserRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user/user.repository.impl';
import { PrismaVerticalRepository } from '../../../../../src/modules/organization/infrastructure/repositories/vertical/vertical.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Create Organization – [CAP-002]', () => {
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
    await prisma.vertical.deleteMany();
  });

  const buildService = () =>
    new CreateOrganizationService(
      new PrismaOrganizationRepository(prisma),
      new PrismaUserRepository(prisma),
      new PrismaUserOrganizationLinkRepository(prisma),
      new PrismaVerticalRepository(prisma),
      new PrismaOrganizationUnitOfWork(prisma)
    );

  const createOwnerUser = async () =>
    prisma.user.create({
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
        statusId: 'ORG_LINKED',
      },
    });

  it('should create organization with valid owner – [SCN-001]', async () => {
    const service = buildService();
    await createOwnerUser();
    await prisma.vertical.createMany({
      data: [
        { id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' },
        { id: 'vert-2', name: 'V2', code: 'v2', description: 'Vertical 2' },
      ],
    });

    const output = await service.execute({
      tradeName: 'Loja X',
      legalName: 'Loja X LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: 'user-1',
      verticalIds: ['vert-1', 'vert-2'],
    });

    const organization = await prisma.organization.findUnique({ where: { id: output.id } });
    const owner = await prisma.user.findUnique({ where: { id: 'user-1' } });
    const link = await prisma.userOrganizationLink.findUnique({
      where: { userId: 'user-1' },
    });
    const verticalLinks = await prisma.organizationVertical.count({
      where: { organizationId: output.id },
    });

    expect(output.status).toBe('PENDING_BUSINESS_UNIT');
    expect(organization).not.toBeNull();
    expect(owner?.statusId).toBe('ACTIVE');
    expect(link?.isOwner).toBe(true);
    expect(verticalLinks).toBe(2);
  });

  it('should reject when owner does not exist – [SCN-002]', async () => {
    const service = buildService();

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CPF',
        documentNumber: '12345678901',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(OwnerUserNotFoundError);
  });

  it('should reject when owner is already linked – [SCN-003]', async () => {
    const service = buildService();
    await createOwnerUser();
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
    await prisma.userOrganizationLink.create({
      data: {
        userId: 'user-1',
        organizationId: 'org-1',
        isOwner: true,
      },
    });

    await expect(
      service.execute({
        tradeName: 'Loja Y',
        legalName: 'Loja Y LTDA',
        documentType: 'CNPJ',
        documentNumber: '22345678901234',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(UserAlreadyLinkedError);
  });

  it('should reject duplicated document – [SCN-004]', async () => {
    const service = buildService();
    await createOwnerUser();
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

    await expect(
      service.execute({
        tradeName: 'Loja Y',
        legalName: 'Loja Y LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(DocumentAlreadyExistsError);
  });

  it('should reject missing legal name for CNPJ – [SCN-005]', async () => {
    const service = buildService();
    await createOwnerUser();
    await prisma.vertical.createMany({
      data: [{ id: 'vert-1', name: 'V1', code: 'v1', description: 'Vertical 1' }],
    });

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(MissingLegalNameError);
  });

  it('should reject invalid vertical – [SCN-006]', async () => {
    const service = buildService();
    await createOwnerUser();

    await expect(
      service.execute({
        tradeName: 'Loja X',
        legalName: 'Loja X LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(VerticalNotRegisteredError);
  });
});
