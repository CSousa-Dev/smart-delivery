import { UnitOfMeasure, UnitStatus } from '../../../../src/modules/inventory/domain/entities/unit-of-measure.entity';
import {
  InvalidUnitCodeError,
  InvalidUnitNameError,
  InvalidUnitSymbolError,
} from '../../../../src/modules/inventory/domain/errors/unit-of-measure.errors';

describe('UnitOfMeasure Entity', () => {
  const baseProps = {
    organizationId: 'org-1',
    code: 'KG',
    name: 'Kilograma',
    symbol: 'kg',
    allowsFraction: true,
    createdBy: 'user-1',
  };

  it('should create unit with normalized code and name', () => {
    const unit = UnitOfMeasure.create(baseProps);

    expect(unit.getStatus()).toBe(UnitStatus.ACTIVE);
    expect(unit.getCode()).toBe('KG');
    expect(unit.getCodeNormalized()).toBe('KG');
    expect(unit.getName()).toBe('Kilograma');
    expect(unit.getNameNormalized()).toBe('kilograma');
    expect(unit.getAllowsFraction()).toBe(true);
    expect(unit.getCreatedBy()).toBe('user-1');
  });

  it('should reject code with spaces or invalid characters', () => {
    expect(() => UnitOfMeasure.create({ ...baseProps, code: 'K G' })).toThrow(
      InvalidUnitCodeError
    );
    expect(() => UnitOfMeasure.create({ ...baseProps, code: 'KG-1' })).toThrow(
      InvalidUnitCodeError
    );
  });

  it('should reject invalid name length', () => {
    expect(() => UnitOfMeasure.create({ ...baseProps, name: 'K' })).toThrow(
      InvalidUnitNameError
    );
  });

  it('should reject invalid symbol length', () => {
    expect(() =>
      UnitOfMeasure.create({ ...baseProps, symbol: 'kilograms++' })
    ).toThrow(InvalidUnitSymbolError);
  });

  it('should update name and status with audit fields', () => {
    const unit = UnitOfMeasure.create(baseProps);

    unit.updateName('Quilograma', 'user-2');
    expect(unit.getName()).toBe('Quilograma');
    expect(unit.getNameNormalized()).toBe('quilograma');
    expect(unit.getUpdatedBy()).toBe('user-2');
    expect(unit.getUpdatedAt()).toBeInstanceOf(Date);

    unit.changeStatus(UnitStatus.INACTIVE, 'user-3');
    expect(unit.getStatus()).toBe(UnitStatus.INACTIVE);
    expect(unit.getUpdatedBy()).toBe('user-3');
    expect(unit.getUpdatedAt()).toBeInstanceOf(Date);
  });
});
