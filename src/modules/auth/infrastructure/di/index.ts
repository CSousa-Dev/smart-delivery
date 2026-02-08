import { JwtAuthProviderMock } from '../mocks/jwt-auth-provider.mock';
import { AuthenticateRequestService } from '../../application/service/authenticate-request.service';

export function bootstrapAuthModule() {
  const authProvider = new JwtAuthProviderMock();
  const authenticateRequestService = new AuthenticateRequestService(authProvider);

  return {
    authProvider,
    authenticateRequestService,
  };
}
