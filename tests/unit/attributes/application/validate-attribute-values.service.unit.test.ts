import { ValidateAttributeValuesService } from '../../../../src/modules/attributes/application/services/validate-attribute-values.service';
import { AttributeValueValidationService } from '../../../../src/modules/attributes/domain/services/attribute-value-validation.service';
import { InvalidValidationPayloadError, VerticalRequiredForCategoriesError } from '../../../../src/modules/attributes/domain/errors/validation.errors';

describe('ValidateAttributeValuesService', () => {
  const buildService = () => {
    const resolveAttributeConfigurationService = {
      list: jest.fn().mockResolvedValue({ items: [] }),
    };

    return {
      service: new ValidateAttributeValuesService(
        resolveAttributeConfigurationService as any,
        new AttributeValueValidationService()
      ),
      resolveAttributeConfigurationService,
    };
  };

  it('should reject empty items', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ items: [] })
    ).rejects.toBeInstanceOf(InvalidValidationPayloadError);
  });

  it('should reject categoryIds without verticalId', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ items: [{ attributeId: 'attr-1', value: '1' }], categoryIds: ['cat-1'] })
    ).rejects.toBeInstanceOf(VerticalRequiredForCategoriesError);
  });

  it('should validate values', async () => {
    const { service, resolveAttributeConfigurationService } = buildService();
    (resolveAttributeConfigurationService.list as jest.Mock).mockResolvedValue({
      items: [
        {
          attributeId: 'attr-1',
          name: 'Peso',
          code: 'WEIGHT',
          description: 'Peso',
          type: 'number',
          isMultiValue: false,
          isRequired: true,
          minValue: 0,
          maxValue: 10,
          defaultValueId: null,
          allowedValues: [],
        },
      ],
    });

    const result = await service.execute({
      items: [{ attributeId: 'attr-1', value: 5 }],
    });

    expect(result.isValid).toBe(true);
  });
});
