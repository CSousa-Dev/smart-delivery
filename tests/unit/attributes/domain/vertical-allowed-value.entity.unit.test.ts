import { VerticalAllowedValue } from '../../../../src/modules/attributes/domain/entities/vertical-allowed-value.entity';
import {
  AllowedValueLengthOutOfBoundsError,
  InvalidAllowedValueNameError,
  InvalidAllowedValueValueError,
} from '../../../../src/modules/attributes/domain/errors/allowed-value.errors';

describe('VerticalAllowedValue Entity', () => {
  it('should trim and create vertical allowed value', () => {
    const value = VerticalAllowedValue.create({
      verticalAttributeId: 'vert-attr-1',
      name: '  Tamanho  ',
      value: 'Large',
      minLength: 1,
      maxLength: 10,
    });

    expect(value.getName()).toBe('Tamanho');
    expect(value.getValue()).toBe('Large');
  });

  it('should reject empty name', () => {
    expect(() =>
      VerticalAllowedValue.create({
        verticalAttributeId: 'vert-attr-1',
        name: '   ',
        value: 'Large',
        minLength: 1,
        maxLength: 10,
      })
    ).toThrow(InvalidAllowedValueNameError);
  });

  it('should reject invalid value format', () => {
    expect(() =>
      VerticalAllowedValue.create({
        verticalAttributeId: 'vert-attr-1',
        name: 'Tamanho',
        value: 'large size',
        minLength: 1,
        maxLength: 10,
      })
    ).toThrow(InvalidAllowedValueValueError);
  });

  it('should reject out of bounds length', () => {
    expect(() =>
      VerticalAllowedValue.create({
        verticalAttributeId: 'vert-attr-1',
        name: 'Tamanho',
        value: 'LargeValue',
        minLength: 2,
        maxLength: 5,
      })
    ).toThrow(AllowedValueLengthOutOfBoundsError);
  });
});
