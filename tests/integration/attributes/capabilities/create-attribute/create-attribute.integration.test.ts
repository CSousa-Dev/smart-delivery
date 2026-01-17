import { PrismaClient } from '@prisma/client';
import { CreateAttributeService } from '../../../../../src/modules/attributes/application/services/create-attribute.service';
import { PrismaAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/attribute/attribute.repository.impl';
import { PrismaAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/allowed-value/allowed-value.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Create Attribute – [CAP-001]', () => {
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

  it('should create a basic attribute – [SCN-001]', async () => {
    const service = new CreateAttributeService(
      new PrismaAttributeRepository(prisma),
      new PrismaAllowedValueRepository(prisma)
    );

    const output = await service.execute({
      name: 'Peso',
      code: 'WEIGHT',
      description: 'Peso do produto',
      type: 'number',
      isMultiValue: false,
      isRequired: true,
      minValue: 0,
      maxValue: 100,
    });

    const persisted = await prisma.attribute.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.code).toBe('WEIGHT');
  });

  it('should create an option attribute with allowed values – [SCN-002]', async () => {
    const service = new CreateAttributeService(
      new PrismaAttributeRepository(prisma),
      new PrismaAllowedValueRepository(prisma)
    );

    const output = await service.execute({
      name: 'Tamanho',
      code: 'SIZE',
      description: 'Tamanho do produto',
      type: 'option',
      isMultiValue: false,
      isRequired: true,
      defaultValueId: 'value-1',
      allowedValues: [
        { id: 'value-1', name: 'Grande', value: 'Large' },
        { id: 'value-2', name: 'Pequeno', value: 'Small' },
      ],
    });

    const allowedValues = await prisma.attributeAllowedValue.findMany({
      where: { attributeId: output.id },
    });

    expect(allowedValues).toHaveLength(2);
  });
});
