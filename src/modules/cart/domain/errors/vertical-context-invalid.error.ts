import { DomainError } from '../../../../shared/errors/domain.error';

export class VerticalContextInvalidError extends DomainError {
  constructor(verticalId: string, businessUnitId: string) {
    super('VERTICAL_CONTEXT_INVALID', {
      verticalId,
      businessUnitId,
    });
  }
}
