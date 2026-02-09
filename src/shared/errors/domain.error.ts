import { BaseAppError } from './base-app.error';

export type DomainErrorLayer = 'domain';

export class DomainError extends BaseAppError {
  public readonly layer: DomainErrorLayer = 'domain';

  constructor(codeOrMessage: string, codeOrArgs?: string | Record<string, unknown>, args?: Record<string, unknown>) {
    const payload =
      typeof codeOrArgs === 'string'
        ? { message: codeOrArgs, meta: args }
        : { message: codeOrMessage, meta: codeOrArgs };
    super(payload.message, 'domain', payload.meta);
  }
}
