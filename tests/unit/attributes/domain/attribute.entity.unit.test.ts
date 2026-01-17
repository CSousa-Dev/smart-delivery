import {
  Attribute,
  AttributeLimits,
} from '../../../../src/modules/attributes/domain/entities/attribute.entity';
import {
  InvalidAttributeCodeError,
  InvalidAttributeLimitsError,
  InvalidAttributeTypeError,
} from '../../../../src/modules/attributes/domain/errors/attribute.errors';

describe('Attribute Entity', () => {
  it('should apply defaults for text attributes', () => {
    const attribute = Attribute.create({
      name: 'Peso',
      code: 'WEIGHT',
      description: 'Peso do produto',
      type: 'text',
      isMultiValue: false,
      isRequired: true,
    });

    expect(attribute.getMinValue()).toBe(1);
    expect(attribute.getMaxValue()).toBe(255);
  });

  it('should apply defaults for number attributes', () => {
    const attribute = Attribute.create({
      name: 'Quantidade',
      code: 'QUANTITY',
      description: 'Quantidade',
      type: 'number',
      isMultiValue: false,
      isRequired: true,
    });

    expect(attribute.getMinValue()).toBe(-1000000);
    expect(attribute.getMaxValue()).toBe(1000000);
  });

  it('should apply defaults for option attributes', () => {
    const attribute = Attribute.create({
      name: 'Tamanho',
      code: 'SIZE',
      description: 'Tamanho do produto',
      type: 'option',
      isMultiValue: false,
      isRequired: true,
    });

    expect(attribute.getMinValue()).toBe(1);
    expect(attribute.getMaxValue()).toBe(100);
  });

  it('should reject invalid attribute code format', () => {
    expect(() =>
      Attribute.create({
        name: 'Cor',
        code: 'invalid_code',
        description: 'Cor do produto',
        type: 'text',
        isMultiValue: false,
        isRequired: true,
      })
    ).toThrow(InvalidAttributeCodeError);
  });

  it('should reject invalid attribute type', () => {
    expect(() =>
      Attribute.create({
        name: 'Cor',
        code: 'COLOR',
        description: 'Cor do produto',
        type: 'unsupported',
        isMultiValue: false,
        isRequired: true,
      })
    ).toThrow(InvalidAttributeTypeError);
  });

  it('should reject invalid limits when minValue is greater than maxValue', () => {
    expect(() =>
      AttributeLimits.create({
        type: 'text',
        minValue: 10,
        maxValue: 5,
      })
    ).toThrow(InvalidAttributeLimitsError);
  });
});
