import { DomainError } from '../../../../shared/errors/domain.error';

export class MissingDeliveryPlanForCheckoutError extends DomainError {
  constructor() {
    super('Delivery plan is required for checkout.', 'DELIVERY_PLAN_REQUIRED_FOR_CHECKOUT');
  }
}
