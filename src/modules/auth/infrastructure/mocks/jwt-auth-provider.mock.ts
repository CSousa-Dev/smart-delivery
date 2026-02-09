import { AuthProviderPort } from '../../application/ports/auth-provider.port';

type JwtPayload = {
  sub?: string;
  userId?: string;
};

export class JwtAuthProviderMock implements AuthProviderPort {
  async verifyAccessToken(input: { token: string }): Promise<{
    isValid: boolean;
    userId?: string;
    reason?: string;
  }> {
    const payload = this.decodePayload(input.token);
    if (!payload) {
      return { isValid: false, reason: 'Invalid token format.' };
    }

    const userId = payload.sub || payload.userId;
    if (!userId) {
      return { isValid: false, reason: 'Token missing user id.' };
    }

    return { isValid: true, userId };
  }

  private decodePayload(token: string): JwtPayload | null {
    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }

    try {
      const payloadPart = parts[1];
      if (!payloadPart) {
        return null;
      }
      const payload = Buffer.from(payloadPart, 'base64url').toString('utf8');
      return JSON.parse(payload) as JwtPayload;
    } catch {
      return null;
    }
  }
}
