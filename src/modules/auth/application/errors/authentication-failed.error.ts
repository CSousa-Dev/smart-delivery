export class AuthenticationFailedError extends Error {
  public readonly code = 'AUTHENTICATION_FAILED';
  public readonly payload?: { reason?: string };

  constructor(reason?: string) {
    super('Authentication failed.');
    this.name = 'AuthenticationFailedError';
    if (reason) {
      this.payload = { reason };
    }
    Object.setPrototypeOf(this, AuthenticationFailedError.prototype);
  }
}
