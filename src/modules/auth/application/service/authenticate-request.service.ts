import { AuthProviderPort } from '../ports/auth-provider.port';
import { AuthenticateRequestInputDTO } from '../dtos/authenticate-request.input.dto';
import { AuthenticateRequestOutputDTO } from '../dtos/authenticate-request.output.dto';
import { AuthenticationFailedError } from '../errors/authentication-failed.error';

export class AuthenticateRequestService {
  constructor(private readonly authProvider: AuthProviderPort) {}

  public async execute(
    input: AuthenticateRequestInputDTO
  ): Promise<AuthenticateRequestOutputDTO> {
    if (!input.accessToken) {
      throw new AuthenticationFailedError('Access token is missing.');
    }

    const verification = await this.authProvider.verifyAccessToken({
      token: input.accessToken,
    });

    if (!verification.isValid || !verification.userId) {
      throw new AuthenticationFailedError(verification.reason);
    }

    return {
      userId: verification.userId,
      ...(verification.roles ? { roles: verification.roles } : {}),
    };
  }
}
