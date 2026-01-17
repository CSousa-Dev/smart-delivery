export type ErrorLayer = 'domain' | 'application' | 'infrastructure';

export class BaseAppError extends Error {
  public readonly code: string;
  public readonly args?: Record<string, unknown>;
  public readonly layer: ErrorLayer;

  constructor(
    message: string,
    code: string,
    layer: ErrorLayer,
    args?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.layer = layer;
    if (args) {
      this.args = args;
    }
  }
}
