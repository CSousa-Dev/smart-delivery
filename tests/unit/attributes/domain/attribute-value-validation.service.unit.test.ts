import { AttributeValueValidationService } from '../../../../src/modules/attributes/domain/services/attribute-value-validation.service';
import { ResolvedAttribute } from '../../../../src/modules/attributes/domain/entities/resolved-attribute.entity';

describe('AttributeValueValidationService', () => {
  const buildResolved = (overrides: Partial<ResolvedAttribute> = {}) =>
    new ResolvedAttribute(
      overrides.attributeId ?? 'attribute-1',
      overrides.name ?? 'Peso',
      overrides.code ?? 'WEIGHT',
      overrides.description ?? 'Peso',
      overrides.type ?? 'number',
      overrides.isMultiValue ?? false,
      overrides.isRequired ?? true,
      overrides.minValue ?? 0,
      overrides.maxValue ?? 10,
      overrides.defaultValueId ?? null,
      overrides.allowedValues ?? []
    );

  it('should flag missing required value', () => {
    const service = new AttributeValueValidationService();
    const resolved = buildResolved();

    const result = service.validate(
      [{ attributeId: resolved.attributeId }],
      new Map([[resolved.attributeId, resolved]])
    );

    expect(result.isValid).toBe(false);
    expect(result.errors[0]?.reason).toBe('REQUIRED_VALUE_MISSING');
  });

  it('should reject invalid option value', () => {
    const service = new AttributeValueValidationService();
    const resolved = buildResolved({
      type: 'option',
      allowedValues: [{ id: 'value-1', name: 'Grande', value: 'Large' }],
    });

    const result = service.validate(
      [{ attributeId: resolved.attributeId, allowedValueId: 'value-2' }],
      new Map([[resolved.attributeId, resolved]])
    );

    expect(result.isValid).toBe(false);
    expect(result.errors[0]?.reason).toBe('INVALID_ALLOWED_VALUE');
  });
});
