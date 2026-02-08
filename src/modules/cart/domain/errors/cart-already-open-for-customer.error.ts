import { DomainError } from '../../../../shared/errors/domain.error';

export class CartAlreadyOpenForCustomerError extends DomainError {
  constructor(customerId: string) {
    super(
      `There is already an open cart in purchase flow for this customer. Only one active cart per customer is allowed.`,
      'CART_ALREADY_OPEN_FOR_CUSTOMER',
      { customerId }
    );
  }
}
