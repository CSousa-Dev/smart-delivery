import { OpenCartService } from '../../application/service/open-cart.service';
import { AddCartItemService } from '../../application/service/add-cart-item.service';
import { UpdateCartItemService } from '../../application/service/update-cart-item.service';
import { RemoveCartItemService } from '../../application/service/remove-cart-item.service';
import { ValidateCartItemService } from '../../application/service/validate-cart-item.service';
import { ReadCartService } from '../../application/service/read-cart.service';
import { SetCartAddressService } from '../../application/service/set-cart-address.service';
import { SetCartPaymentPreferenceService } from '../../application/service/set-cart-payment-preference.service';
import { CheckoutCartService } from '../../application/service/checkout-cart.service';
import { ProcessCartPaymentService } from '../../application/service/process-cart-payment.service';
import { ReopenCartService } from '../../application/service/reopen-cart.service';
import { FailCartPaymentService } from '../../application/service/fail-cart-payment.service';
import { AddCouponService } from '../../application/service/add-coupon.service';
import { RemoveCouponService } from '../../application/service/remove-coupon.service';
import { AutoAbandonCartService } from '../../application/service/auto-abandon-cart.service';
import { createCartRepositories } from './repositories';
import { createCartAdapters } from './adapters';

type Repositories = ReturnType<typeof createCartRepositories>;
type Adapters = ReturnType<typeof createCartAdapters>;

export function createCartAppServices(repos: Repositories, adapters: Adapters) {
  const validateCartItemService = new ValidateCartItemService(
    adapters.productService,
    adapters.operationsService
  );

  return {
    openCartService: new OpenCartService(
      repos.cartRepository,
      adapters.cartEventPublisher,
      adapters.customerService,
      adapters.organizationService
    ),
    readCartService: new ReadCartService(repos.cartRepository),
    addCartItemService: new AddCartItemService(
      repos.cartRepository,
      adapters.cartEventPublisher,
      validateCartItemService
    ),
    updateCartItemService: new UpdateCartItemService(
      repos.cartRepository,
      validateCartItemService,
      adapters.cartEventPublisher
    ),
    removeCartItemService: new RemoveCartItemService(
      repos.cartRepository,
      adapters.cartEventPublisher
    ),
    setCartAddressService: new SetCartAddressService(
      repos.cartRepository,
      adapters.addressValidationService
    ),
    setCartPaymentPreferenceService: new SetCartPaymentPreferenceService(
      repos.cartRepository,
      adapters.paymentService
    ),
    checkoutCartService: new CheckoutCartService(
      repos.cartRepository,
      adapters.fulfillmentService,
      adapters.paymentService,
      adapters.orderService
    ),
    processCartPaymentService: new ProcessCartPaymentService(
      repos.cartRepository,
      adapters.paymentService,
      adapters.cartEventPublisher,
      adapters.orderService
    ),
    failCartPaymentService: new FailCartPaymentService(
      repos.cartRepository,
      adapters.cartEventPublisher
    ),
    reopenCartService: new ReopenCartService(repos.cartRepository, adapters.paymentService),
    addCouponService: new AddCouponService(repos.cartRepository, adapters.pricingService),
    removeCouponService: new RemoveCouponService(repos.cartRepository),
    autoAbandonCartService: new AutoAbandonCartService(
      repos.cartRepository,
      adapters.cartEventPublisher
    ),
  };
}
