import { AttributeValueValidationAdapter } from '../../../../src/modules/products/infrastructure/external/attribute-value-validation.adapter';
import { ResolveAttributeConfigurationService } from '../../../../src/modules/attributes/application/services/resolve-attribute-configuration.service';
import { AttributeValueValidationService } from '../../../../src/modules/attributes/domain/services/attribute-value-validation.service';

describe('AttributeValueValidationAdapter', () => {
  it('should return valid when there are no resolved attributes', async () => {
    const resolveService = {
      list: jest.fn().mockResolvedValue({ items: [] }),
    } as unknown as ResolveAttributeConfigurationService;
    const validationService = {
      validate: jest.fn(),
    } as unknown as AttributeValueValidationService;

    const adapter = new AttributeValueValidationAdapter(resolveService, validationService);

    const result = await adapter.validate({
      categoryId: 'cat-1',
      verticalId: 'vert-1',
      attributes: [],
    });

    expect(result).toEqual({ isValid: true, errors: [] });
    expect(validationService.validate).not.toHaveBeenCalled();
  });

  it('should include required attributes with missing values', async () => {
    const resolveService = {
      list: jest.fn().mockResolvedValue({
        items: [
          {
            attributeId: 'attr-1',
            name: 'Attr',
            code: 'ATTR',
            description: 'Attr',
            type: 'text',
            isMultiValue: false,
            isRequired: true,
            minValue: 1,
            maxValue: 10,
            defaultValueId: null,
            allowedValues: [],
          },
        ],
      }),
    } as unknown as ResolveAttributeConfigurationService;
    const validationService = {
      validate: jest.fn().mockReturnValue({
        isValid: false,
        errors: [{ attributeId: 'attr-1', reason: 'REQUIRED_VALUE_MISSING' }],
      }),
    } as unknown as AttributeValueValidationService;

    const adapter = new AttributeValueValidationAdapter(resolveService, validationService);

    const result = await adapter.validate({
      categoryId: 'cat-1',
      verticalId: 'vert-1',
      attributes: [],
    });

    expect(validationService.validate).toHaveBeenCalledWith(
      [{ attributeId: 'attr-1', value: null }],
      expect.any(Map)
    );
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
  });
});
