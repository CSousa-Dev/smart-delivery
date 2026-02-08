import { DomainError } from '../../../../shared/errors/domain.error';

export class InvalidBusinessContextError extends DomainError {
  constructor(message: string = 'CustomerId, verticalId and businessUnitId are required for BusinessContext.') {
    super(message, 'INVALID_BUSINESS_CONTEXT');
  }
}
