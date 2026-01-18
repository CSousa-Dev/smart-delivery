import { CreateUserService } from '../../../../../src/modules/organization/application/services/create-user.service';
import { OrganizationNotFoundError } from '../../../../../src/modules/organization/domain/errors/organization.errors';
import {
  DocumentAlreadyExistsError,
  EmailAlreadyExistsError,
  InvalidDocumentError,
  PhoneAlreadyExistsError,
} from '../../../../../src/modules/organization/domain/errors/user.errors';
import { PrismaOrganizationRepository } from '../../../../../src/modules/organization/infrastructure/repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../../../../../src/modules/organization/infrastructure/repositories/organization-unit-of-work/organization-unit-of-work.impl';
import { PrismaUserRepository } from '../../../../../src/modules/organization/infrastructure/repositories/user/user.repository.impl';
import {
  createOrganizationTestPrismaClient,
  OrganizationPrismaClient,
} from '../../../../helpers/prisma/organization/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ORGANIZATION_TEST ? describe : describe.skip;

describeIf('Capability Create User – [CAP-001]', () => {
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
    new CreateUserService(
      new PrismaUserRepository(prisma),
      new PrismaOrganizationRepository(prisma),
      new PrismaOrganizationUnitOfWork(prisma)
    );

  it('should create user without organization – [SCN-001]', async () => {
    const service = buildService();

    const output = await service.execute({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
    });

    const savedUser = await prisma.user.findUnique({ where: { id: output.id } });
    const linkCount = await prisma.userOrganizationLink.count({
      where: { userId: output.id },
    });

    expect(output.status).toBe('PENDING_ORG_LINK');
    expect(savedUser).not.toBeNull();
    expect(linkCount).toBe(0);
  });

  it('should create user linked to organization – [SCN-002]', async () => {
    const service = buildService();

    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Org 1',
        legalName: 'Org 1 LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
      },
    });

    const output = await service.execute({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      organizationId: 'org-1',
    });

    const linkCount = await prisma.userOrganizationLink.count({
      where: { userId: output.id, organizationId: 'org-1' },
    });

    expect(output.status).toBe('ORG_LINKED');
    expect(linkCount).toBe(1);
  });

  it('should reject when organization does not exist – [SCN-003]', async () => {
    const service = buildService();

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
        organizationId: 'org-1',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject duplicated document number – [SCN-004]', async () => {
    const service = buildService();

    await prisma.organization.create({
      data: {
        id: 'org-1',
        tradeName: 'Org 1',
        legalName: 'Org 1 LTDA',
        documentType: 'CNPJ',
        documentNumber: '12345678901',
        statusId: 'ACTIVE',
        ownerUserId: 'user-1',
      },
    });

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(DocumentAlreadyExistsError);
  });

  it('should reject duplicated email – [SCN-005]', async () => {
    const service = buildService();

    await service.execute({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
    });

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678902',
        email: 'ana@example.com',
        phoneNumber: '11988887777',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it('should reject duplicated phone – [SCN-006]', async () => {
    const service = buildService();

    await service.execute({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
    });

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678902',
        email: 'ana2@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(PhoneAlreadyExistsError);
  });

  it('should reject invalid document – [SCN-007]', async () => {
    const service = buildService();

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '123',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(InvalidDocumentError);
  });
});
