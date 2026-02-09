import { DomainError } from '../../../../shared/errors/domain.error';

export class CartAlreadyOpenForCustomerError extends DomainError {
  constructor(customerId: string) {
    super('CART_ALREADY_OPEN_FOR_CUSTOMER', { customerId });
  }
}
