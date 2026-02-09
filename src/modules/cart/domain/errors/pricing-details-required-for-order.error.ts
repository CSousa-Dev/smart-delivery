import { DomainError } from '../../../../shared/errors/domain.error';

export class PricingDetailsRequiredForOrderError extends DomainError {
  constructor() {
    super('PRICING_DETAILS_REQUIRED_FOR_ORDER');
  }
}
