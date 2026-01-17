import { Vertical } from '../../../../src/modules/attributes/domain/entities/vertical.entity';
import {
  InvalidVerticalCodeError,
  InvalidVerticalDescriptionError,
  InvalidVerticalNameError,
} from '../../../../src/modules/attributes/domain/errors/vertical.errors';

describe('Vertical Entity', () => {
  it('should create vertical with trimmed name and description', () => {
    const vertical = Vertical.create({
      name: '  Food  ',
      code: 'FOOD',
      description: '  Food operations  ',
    });

    expect(vertical.getName()).toBe('Food');
    expect(vertical.getDescription()).toBe('Food operations');
  });

  it('should reject invalid code format', () => {
    expect(() =>
      Vertical.create({
        name: 'Food',
        code: 'food',
        description: 'Food operations',
      })
    ).toThrow(InvalidVerticalCodeError);
  });

  it('should reject invalid name length', () => {
    expect(() =>
      Vertical.create({
        name: '  ',
        code: 'FOOD',
        description: 'Food operations',
      })
    ).toThrow(InvalidVerticalNameError);
  });

  it('should reject invalid description length', () => {
    expect(() =>
      Vertical.create({
        name: 'Food',
        code: 'FOOD',
        description: '  ',
      })
    ).toThrow(InvalidVerticalDescriptionError);
  });
});
