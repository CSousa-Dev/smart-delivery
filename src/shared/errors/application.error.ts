import { BaseAppError } from './base-app.error';

export type ApplicationErrorLayer = 'application';

export class ApplicationError extends BaseAppError {
  public readonly layer: ApplicationErrorLayer = 'application';

  constructor(
    codeOrMessage: string,
    codeOrArgs?: string | Record<string, unknown>,
    args?: Record<string, unknown>
  ) {
    if (typeof codeOrArgs === 'string') {
      super(codeOrArgs, 'application', args);
      return;
    }
    super(codeOrMessage, 'application', codeOrArgs);
  }
}
