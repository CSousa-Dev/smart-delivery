import { PrismaClient } from '@prisma/client';
import { ValidateAttributeValuesService } from '../../../../../src/modules/attributes/application/services/validate-attribute-values.service';
import { ResolveAttributeConfigurationService } from '../../../../../src/modules/attributes/application/services/resolve-attribute-configuration.service';
import { AttributeResolutionService } from '../../../../../src/modules/attributes/domain/services/attribute-resolution.service';
import { AttributeValueValidationService } from '../../../../../src/modules/attributes/domain/services/attribute-value-validation.service';
import { PrismaAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/allowed-value/allowed-value.repository.impl';
import { PrismaAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/attribute/attribute.repository.impl';
import { PrismaCategoryRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category/category.repository.impl';
import { PrismaVerticalAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical-attribute/vertical-attribute.repository.impl';
import { PrismaVerticalAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical-allowed-value/vertical-allowed-value.repository.impl';
import { PrismaCategoryAttributeRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category-attribute/category-attribute.repository.impl';
import { PrismaCategoryAllowedValueRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category-allowed-value/category-allowed-value.repository.impl';
import { PrismaVerticalRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical/vertical.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Attribute Value Validation – [CAP-008]', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = createAttributesTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.verticalAllowedValueLink.deleteMany();
    await prisma.verticalAllowedValue.deleteMany();
    await prisma.verticalAttribute.deleteMany();
    await prisma.attributeAllowedValue.deleteMany();
    await prisma.categoryAllowedValueLink.deleteMany();
    await prisma.categoryAllowedValue.deleteMany();
    await prisma.categoryAttribute.deleteMany();
    await prisma.attribute.deleteMany();
    await prisma.category.deleteMany();
    await prisma.vertical.deleteMany();
  });

  it('should validate attribute values – [SCN-001]', async () => {
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

    const allowedValue = await prisma.attributeAllowedValue.create({
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

    const resolveService = new ResolveAttributeConfigurationService(
      new PrismaAttributeRepository(prisma),
      new PrismaVerticalAttributeRepository(prisma),
      new PrismaCategoryAttributeRepository(prisma),
      new PrismaAllowedValueRepository(prisma),
      new PrismaVerticalAllowedValueRepository(prisma),
      new PrismaCategoryAllowedValueRepository(prisma),
      new PrismaVerticalRepository(prisma),
      new PrismaCategoryRepository(prisma),
      new AttributeResolutionService()
    );

    const validationService = new ValidateAttributeValuesService(
      resolveService,
      new AttributeValueValidationService()
    );

    const result = await validationService.execute({
      verticalId: vertical.id,
      items: [{ attributeId: attribute.id, allowedValueId: allowedValue.id }],
    });

    expect(result.isValid).toBe(true);
  });
});
