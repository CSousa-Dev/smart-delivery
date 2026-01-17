import { BaseAppError } from './base-app.error';

export type DomainErrorLayer = 'domain';

export class DomainError extends BaseAppError {
  public readonly layer: DomainErrorLayer = 'domain';

  constructor(message: string, code: string, args?: Record<string, unknown>) {
    super(message, code, 'domain', args);
  }
}
