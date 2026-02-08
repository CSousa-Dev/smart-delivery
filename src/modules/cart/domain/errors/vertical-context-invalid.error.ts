import { DomainError } from '../../../../shared/errors/domain.error';

export class VerticalContextInvalidError extends DomainError {
  constructor(verticalId: string, businessUnitId: string) {
    super(
      `Vertical context is invalid for the given business unit.`,
      'VERTICAL_CONTEXT_INVALID',
      { verticalId, businessUnitId }
    );
  }
}
