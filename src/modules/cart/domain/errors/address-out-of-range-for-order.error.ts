import { DomainError } from '../../../../shared/errors/domain.error';

export class AddressOutOfRangeForOrderError extends DomainError {
  constructor(addressId: string, reason?: string) {
    super('ADDRESS_OUT_OF_RANGE_FOR_ORDER', {
      addressId,
      reason,
    });
  }
}
