import { DomainError } from '../../../../shared/errors/domain.error';

export class CustomerContextInvalidError extends DomainError {
  constructor(customerId: string, businessUnitId: string) {
    super('CUSTOMER_CONTEXT_INVALID', { customerId, businessUnitId });
  }
}
