import { InvalidBusinessContextError } from '../errors/invalid-business-context.error';

export class BusinessContext {
  constructor(
    public readonly customerId: string,
    public readonly verticalId: string,
    public readonly businessUnitId: string
  ) {
    if (!customerId || !verticalId || !businessUnitId) {
      throw new InvalidBusinessContextError();
    }
  }
}
