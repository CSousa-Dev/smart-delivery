import { PrismaClient } from '@prisma/client';
import { CreateVerticalService } from '../../../../../src/modules/attributes/application/services/create-vertical.service';
import { PrismaVerticalRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical/vertical.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Create Vertical – [CAP-002]', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = createAttributesTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.categoryAllowedValueLink.deleteMany();
    await prisma.categoryAllowedValue.deleteMany();
    await prisma.categoryAttribute.deleteMany();
    await prisma.verticalAllowedValueLink.deleteMany();
    await prisma.verticalAllowedValue.deleteMany();
    await prisma.verticalAttribute.deleteMany();
    await prisma.attributeAllowedValue.deleteMany();
    await prisma.category.deleteMany();
    await prisma.attribute.deleteMany();
    await prisma.vertical.deleteMany();
  });

  it('should create a vertical – [SCN-001]', async () => {
    const service = new CreateVerticalService(new PrismaVerticalRepository(prisma));

    const output = await service.execute({
      name: 'Food',
      code: 'FOOD',
      description: 'Food operations',
    });

    const persisted = await prisma.vertical.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.code).toBe('FOOD');
  });
});
