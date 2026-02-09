import { DomainError } from '../../../../shared/errors/domain.error';

export class StockValidationRequiredForOrderError extends DomainError {
  constructor() {
    super('STOCK_VALIDATION_REQUIRED_FOR_ORDER');
  }
}
