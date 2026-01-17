import { PrismaClient } from '@prisma/client';
import { LinkAttributeToVerticalService } from '../../../../../src/modules/attributes/application/services/link-attribute-to-vertical.service';
import { PrismaAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/allowed-value/allowed-value.repository.impl';
import { PrismaAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/attribute/attribute.repository.impl';
import { PrismaVerticalRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical/vertical.repository.impl';
import { PrismaVerticalAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical-attribute/vertical-attribute.repository.impl';
import { PrismaVerticalAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical-allowed-value/vertical-allowed-value.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Link Attribute to Vertical – [CAP-005]', () => {
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

  it('should link attribute to vertical with subset and additional values – [SCN-001]', async () => {
    const vertical = await prisma.vertical.create({
      data: {
        id: 'vertical-1',
        name: 'Food',
        code: 'FOOD',
        description: 'Food operations',
      },
    });

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

    const globalValue = await prisma.attributeAllowedValue.create({
      data: {
        id: 'value-1',
        attributeId: attribute.id,
        name: 'Grande',
        value: 'Large',
        nameNormalized: 'grande',
        valueNormalized: 'large',
      },
    });

    const service = new LinkAttributeToVerticalService(
      new PrismaVerticalRepository(prisma),
      new PrismaAttributeRepository(prisma),
      new PrismaAllowedValueRepository(prisma),
      new PrismaVerticalAttributeRepository(prisma),
      new PrismaVerticalAllowedValueRepository(prisma)
    );

    const output = await service.execute({
      verticalId: vertical.id,
      attributeId: attribute.id,
      allowedValueIds: [globalValue.id],
      additionalAllowedValues: [
        { id: 'value-2', name: 'Pequeno', value: 'Small' },
      ],
      defaultValueId: 'value-2',
    });

    const link = await prisma.verticalAttribute.findUnique({
      where: { id: output.id },
    });
    const links = await prisma.verticalAllowedValueLink.findMany({
      where: { verticalAttributeId: output.id },
    });
    const additional = await prisma.verticalAllowedValue.findMany({
      where: { verticalAttributeId: output.id },
    });

    expect(link).not.toBeNull();
    expect(links).toHaveLength(1);
    expect(additional).toHaveLength(1);
  });
});
