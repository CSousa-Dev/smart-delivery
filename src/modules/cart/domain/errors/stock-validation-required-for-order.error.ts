import { DomainError } from '../../../../shared/errors/domain.error';

export class StockValidationRequiredForOrderError extends DomainError {
  constructor() {
    super('Stock validation is required before ordering.', 'STOCK_VALIDATION_REQUIRED_FOR_ORDER');
  }
}
