import { AttributeResolutionService } from '../../../../src/modules/attributes/domain/services/attribute-resolution.service';

describe('AttributeResolutionService', () => {
  it('should resolve overrides with category precedence', () => {
    const service = new AttributeResolutionService();
    const resolved = service.resolve(
      {
        id: 'attr-1',
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isRequired: false,
        isMultiValue: false,
        minValue: 1,
        maxValue: 100,
        defaultValueId: 'value-1',
      },
      { isRequired: true, isMultiValue: null, minValue: null, maxValue: null, defaultValueId: null, defaultValueScope: null },
      [
        {
          isRequired: false,
          isMultiValue: true,
          minValue: 2,
          maxValue: 10,
          defaultValueId: null,
          defaultValueScope: null,
        },
      ],
      [
        { id: 'value-1', name: 'Grande', value: 'Large', scope: 'ATTRIBUTE' },
      ]
    );

    expect(resolved.isRequired).toBe(false);
    expect(resolved.isMultiValue).toBe(true);
    expect(resolved.minValue).toBe(2);
    expect(resolved.maxValue).toBe(10);
    expect(resolved.defaultValueId).toBeNull();
  });
});
