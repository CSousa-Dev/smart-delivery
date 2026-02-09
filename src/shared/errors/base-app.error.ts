export type ErrorLayer = 'domain' | 'application' | 'infrastructure';

function normalizeErrorCode(code: string): string {
  const normalized = code
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return normalized || 'UNKNOWN_ERROR';
}

export class BaseAppError extends Error {
  public readonly code: string;
  public readonly args?: Record<string, unknown>;
  public readonly layer: ErrorLayer;

  constructor(code: string, layer: ErrorLayer, args?: Record<string, unknown>) {
    const normalizedCode = normalizeErrorCode(code);
    super(normalizedCode);
    this.name = normalizedCode;
    this.code = normalizedCode;
    this.layer = layer;
    if (args) {
      this.args = args;
    }
  }
}
