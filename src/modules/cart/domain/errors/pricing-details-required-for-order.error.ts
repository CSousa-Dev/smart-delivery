import { DomainError } from '../../../../shared/errors/domain.error';

export class PricingDetailsRequiredForOrderError extends DomainError {
  constructor() {
    super('Pricing details are required before ordering.', 'PRICING_DETAILS_REQUIRED_FOR_ORDER');
  }
}
