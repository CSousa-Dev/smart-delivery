import { createCartAppServices } from './services';
import { CartController } from '../../presentation/http/controllers/cart.controller';
import { AuthenticateRequestService } from '../../../auth/application/service/authenticate-request.service';

type AppServices = ReturnType<typeof createCartAppServices>;

export function createCartControllers(
  appServices: AppServices,
  authenticateRequestService: AuthenticateRequestService
) {
  return {
    cartController: new CartController(
      appServices.openCartService,
      appServices.addCartItemService,
      appServices.updateCartItemService,
      appServices.removeCartItemService,
      appServices.readCartService,
      appServices.setCartAddressService,
      appServices.setCartPaymentPreferenceService,
      appServices.checkoutCartService,
      appServices.startCartPaymentService,
      appServices.processCartPaymentService,
      appServices.retryCartPaymentService,
      appServices.failCartPaymentService,
      appServices.reopenCartService,
      appServices.addCouponService,
      appServices.removeCouponService,
      authenticateRequestService
    ),
  };
}
