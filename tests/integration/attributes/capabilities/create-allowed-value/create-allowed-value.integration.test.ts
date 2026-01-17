import { PrismaClient } from '@prisma/client';
import { CreateAllowedValueService } from '../../../../../src/modules/attributes/application/services/create-allowed-value.service';
import { PrismaAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/allowed-value/allowed-value.repository.impl';
import { PrismaAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/attribute/attribute.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Create Allowed Value – [CAP-004]', () => {
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

  it('should create allowed value for option attribute – [SCN-001]', async () => {
    const attribute = await prisma.attribute.create({
      data: {
        id: 'attribute-1',
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho do produto',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
        minValue: 1,
        maxValue: 10,
      },
    });

    const service = new CreateAllowedValueService(
      new PrismaAttributeRepository(prisma),
      new PrismaAllowedValueRepository(prisma)
    );

    const output = await service.execute({
      attributeId: attribute.id,
      name: 'Grande',
      value: 'Large',
      description: 'Grande',
    });

    const persisted = await prisma.attributeAllowedValue.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.attributeId).toBe(attribute.id);
  });
});
