import { PrismaClient } from '@prisma/client';
import { LinkAttributeToCategoryService } from '../../../../../src/modules/attributes/application/services/link-attribute-to-category.service';
import { PrismaAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/allowed-value/allowed-value.repository.impl';
import { PrismaAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/attribute/attribute.repository.impl';
import { PrismaCategoryRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category/category.repository.impl';
import { PrismaVerticalAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical-attribute/vertical-attribute.repository.impl';
import { PrismaVerticalAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical-allowed-value/vertical-allowed-value.repository.impl';
import { PrismaCategoryAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category-attribute/category-attribute.repository.impl';
import { PrismaCategoryAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category-allowed-value/category-allowed-value.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Link Attribute to Category – [CAP-006]', () => {
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
    await prisma.attribute.deleteMany();
    await prisma.category.deleteMany();
    await prisma.vertical.deleteMany();
  });

  it('should link attribute to category – [SCN-001]', async () => {
    const vertical = await prisma.vertical.create({
      data: {
        id: 'vertical-1',
        name: 'Food',
        code: 'FOOD',
        description: 'Food operations',
      },
    });

    const category = await prisma.category.create({
      data: {
        id: 'category-1',
        verticalId: vertical.id,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
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

    await prisma.verticalAttribute.create({
      data: {
        id: 'vert-attr-1',
        verticalId: vertical.id,
        attributeId: attribute.id,
      },
    });

    const service = new LinkAttributeToCategoryService(
      new PrismaCategoryRepository(prisma),
      new PrismaCategoryAttributeRepository(prisma),
      new PrismaCategoryAllowedValueRepository(prisma),
      new PrismaAttributeRepository(prisma),
      new PrismaVerticalAttributeRepository(prisma),
      new PrismaAllowedValueRepository(prisma),
      new PrismaVerticalAllowedValueRepository(prisma)
    );

    const output = await service.execute({
      categoryId: category.id,
      attributeId: attribute.id,
      allowedValueRefs: [{ sourceScope: 'ATTRIBUTE', sourceValueId: globalValue.id }],
      additionalAllowedValues: [{ id: 'value-2', name: 'Pequeno', value: 'Small' }],
      defaultValueId: 'value-2',
    });

    const link = await prisma.categoryAttribute.findUnique({
      where: { id: output.id },
    });
    const links = await prisma.categoryAllowedValueLink.findMany({
      where: { categoryAttributeId: output.id },
    });
    const additional = await prisma.categoryAllowedValue.findMany({
      where: { categoryAttributeId: output.id },
    });

    expect(link).not.toBeNull();
    expect(links).toHaveLength(1);
    expect(additional).toHaveLength(1);
  });
});
