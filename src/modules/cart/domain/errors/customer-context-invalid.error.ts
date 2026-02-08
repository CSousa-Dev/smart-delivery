import { DomainError } from '../../../../shared/errors/domain.error';

export class CustomerContextInvalidError extends DomainError {
  constructor(customerId: string, businessUnitId: string) {
    super(
      `Customer context is invalid for the given business unit.`,
      'CUSTOMER_CONTEXT_INVALID',
      { customerId, businessUnitId }
    );
  }
}
