import { BusinessContext } from '../../../../src/modules/cart/domain/value-objects/business-context.vo';
import { InvalidBusinessContextError } from '../../../../src/modules/cart/domain/errors/invalid-business-context.error';

describe('BusinessContext', () => {
  it('should create when all fields are non-empty', () => {
    const ctx = new BusinessContext('customer-1', 'vertical-1', 'business-unit-1');
    expect(ctx.customerId).toBe('customer-1');
    expect(ctx.verticalId).toBe('vertical-1');
    expect(ctx.businessUnitId).toBe('business-unit-1');
  });

  it('should throw InvalidBusinessContextError when customerId is empty', () => {
    expect(
      () => new BusinessContext('', 'vertical-1', 'business-unit-1')
    ).toThrow(InvalidBusinessContextError);
  });

  it('should throw InvalidBusinessContextError when verticalId is empty', () => {
    expect(
      () => new BusinessContext('customer-1', '', 'business-unit-1')
    ).toThrow(InvalidBusinessContextError);
  });

  it('should throw InvalidBusinessContextError when businessUnitId is empty', () => {
    expect(
      () => new BusinessContext('customer-1', 'vertical-1', '')
    ).toThrow(InvalidBusinessContextError);
  });
});
