import { VerticalAttribute } from '../../../../src/modules/attributes/domain/entities/vertical-attribute.entity';
import { InvalidAttributeLimitsError, InvalidDefaultValueError } from '../../../../src/modules/attributes/domain/errors/attribute.errors';

describe('VerticalAttribute Entity', () => {
  it('should reject invalid limits', () => {
    expect(() =>
      VerticalAttribute.create({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        minValue: 10,
        maxValue: 5,
      })
    ).toThrow(InvalidAttributeLimitsError);
  });

  it('should reject default value without scope', () => {
    expect(() =>
      VerticalAttribute.create({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        defaultValueId: 'value-1',
      })
    ).toThrow(InvalidDefaultValueError);
  });

  it('should create vertical attribute', () => {
    const verticalAttribute = VerticalAttribute.create({
      verticalId: 'vertical-1',
      attributeId: 'attribute-1',
      isRequired: true,
      isMultiValue: false,
    });

    expect(verticalAttribute.getId().value).toBeDefined();
  });
});
