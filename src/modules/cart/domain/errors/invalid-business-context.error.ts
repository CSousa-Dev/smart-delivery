import { DomainError } from '../../../../shared/errors/domain.error';

export class InvalidBusinessContextError extends DomainError {
  constructor() {
    super('INVALID_BUSINESS_CONTEXT');
  }
}
