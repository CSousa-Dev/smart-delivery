import { DomainError } from '../../../../shared/errors/domain.error';

export class MissingDeliveryPlanForCheckoutError extends DomainError {
  constructor() {
    super('DELIVERY_PLAN_REQUIRED_FOR_CHECKOUT');
  }
}
