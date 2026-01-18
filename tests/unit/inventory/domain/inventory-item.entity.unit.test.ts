import { InventoryItem } from '../../../../src/modules/inventory/domain/entities/inventory-item.entity';
import {
  InvalidInventoryItemNameError,
  InvalidInventoryItemTypeError,
  InvalidRequiresExpirationError,
  MissingRequiredFieldsError,
} from '../../../../src/modules/inventory/domain/errors/inventory-item.errors';

describe('InventoryItem Entity', () => {
  const baseProps = {
    organizationId: 'org-1',
    businessUnitId: 'bu-1',
    name: 'Acucar',
    type: 'INSUMO',
    unitOfMeasureId: 'uom-1',
    requiresExpiration: true,
    createdBy: 'user-1',
  };

  it('should create item with normalized name and type', () => {
    const item = InventoryItem.create(baseProps);

    expect(item.getName()).toBe('Acucar');
    expect(item.getNameNormalized()).toBe('acucar');
    expect(item.getType()).toBe('INSUMO');
    expect(item.getRequiresExpiration()).toBe(true);
  });

  it('should reject invalid name length', () => {
    expect(() => InventoryItem.create({ ...baseProps, name: 'A' })).toThrow(
      InvalidInventoryItemNameError
    );
  });

  it('should reject invalid type', () => {
    expect(() => InventoryItem.create({ ...baseProps, type: 'INVALID' })).toThrow(
      InvalidInventoryItemTypeError
    );
  });

  it('should reject when required fields are missing', () => {
    expect(() =>
      InventoryItem.create({ ...baseProps, name: '' })
    ).toThrow(MissingRequiredFieldsError);
  });

  it('should reject invalid requiresExpiration', () => {
    expect(() =>
      InventoryItem.create({ ...baseProps, requiresExpiration: 'yes' as any })
    ).toThrow(InvalidRequiresExpirationError);
  });
});
