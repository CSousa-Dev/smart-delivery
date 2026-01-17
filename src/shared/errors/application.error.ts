import { BaseAppError } from './base-app.error';

export type ApplicationErrorLayer = 'application';

export class ApplicationError extends BaseAppError {
  public readonly layer: ApplicationErrorLayer = 'application';

  constructor(message: string, code: string, args?: Record<string, unknown>) {
    super(message, code, 'application', args);
  }
}
