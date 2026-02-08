export interface AuthProviderPort {
  verifyAccessToken(input: { token: string }): Promise<{
    isValid: boolean;
    userId?: string;
    roles?: string[];
    reason?: string;
  }>;
}
