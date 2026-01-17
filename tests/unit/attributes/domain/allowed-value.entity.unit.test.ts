import { AllowedValue } from '../../../../src/modules/attributes/domain/entities/allowed-value.entity';
import {
  AllowedValueLengthOutOfBoundsError,
  InvalidAllowedValueNameError,
  InvalidAllowedValueValueError,
} from '../../../../src/modules/attributes/domain/errors/allowed-value.errors';

describe('AllowedValue Entity', () => {
  it('should trim and create allowed value', () => {
    const allowedValue = AllowedValue.create({
      attributeId: 'attr-1',
      name: '  Tamanho  ',
      value: 'Large',
      minLength: 1,
      maxLength: 10,
    });

    expect(allowedValue.getName()).toBe('Tamanho');
    expect(allowedValue.getValue()).toBe('Large');
  });

  it('should reject empty name after trim', () => {
    expect(() =>
      AllowedValue.create({
        attributeId: 'attr-1',
        name: '   ',
        value: 'Large',
        minLength: 1,
        maxLength: 10,
      })
    ).toThrow(InvalidAllowedValueNameError);
  });

  it('should reject invalid Pascal Case value', () => {
    expect(() =>
      AllowedValue.create({
        attributeId: 'attr-1',
        name: 'Tamanho',
        value: 'large size',
        minLength: 1,
        maxLength: 10,
      })
    ).toThrow(InvalidAllowedValueValueError);
  });

  it('should reject value length out of bounds', () => {
    expect(() =>
      AllowedValue.create({
        attributeId: 'attr-1',
        name: 'Tamanho',
        value: 'LargeValue',
        minLength: 2,
        maxLength: 5,
      })
    ).toThrow(AllowedValueLengthOutOfBoundsError);
  });
});
