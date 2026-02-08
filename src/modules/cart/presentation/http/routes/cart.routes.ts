import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

export function createCartRouter(controller: CartController): Router {
  const router = Router();

  router.post('/carts/open', (req, res, next) => controller.openCart(req, res, next));
  router.get('/carts/:cartId', (req, res, next) => {
    req.body = { cartId: req.params.cartId };
    return controller.readCart(req, res, next);
  });
  router.post('/carts/:cartId/items', (req, res, next) => {
    req.body = { ...req.body, cartId: req.params.cartId };
    return controller.addCartItem(req, res, next);
  });
  router.patch('/carts/:cartId/items/:itemId', (req, res, next) => {
    req.body = {
      cartId: req.params.cartId,
      item: { id: req.params.itemId, ...req.body },
    };
    return controller.updateCartItem(req, res, next);
  });
  router.delete('/carts/:cartId/items/:itemId', (req, res, next) => {
    req.body = {
      cartId: req.params.cartId,
      itemId: req.params.itemId,
    };
    return controller.removeCartItem(req, res, next);
  });
  router.post('/carts/:cartId/coupons', (req, res, next) => {
    req.body = {
      cartId: req.params.cartId,
      coupon: req.body,
    };
    return controller.addCoupon(req, res, next);
  });
  router.delete('/carts/:cartId/coupons/:couponCode', (req, res, next) => {
    req.body = {
      cartId: req.params.cartId,
      couponCode: req.params.couponCode,
    };
    return controller.removeCoupon(req, res, next);
  });
  router.patch('/carts/:cartId/address', (req, res, next) => {
    req.body = { cartId: req.params.cartId, addressId: req.body.addressId };
    return controller.setCartAddress(req, res, next);
  });
  router.patch('/carts/:cartId/payment-preference', (req, res, next) => {
    req.body = { cartId: req.params.cartId, paymentPreferenceId: req.body.paymentPreferenceId };
    return controller.setCartPaymentPreference(req, res, next);
  });
  router.post('/carts/:cartId/checkout', (req, res, next) => {
    req.body = { cartId: req.params.cartId };
    return controller.checkoutCart(req, res, next);
  });
  router.post('/carts/:cartId/payments/start', (req, res, next) => {
    req.body = { cartId: req.params.cartId };
    return controller.startCartPayment(req, res, next);
  });
  router.post('/carts/:cartId/payments/retry', (req, res, next) => {
    req.body = { cartId: req.params.cartId };
    return controller.retryCartPayment(req, res, next);
  });
  router.post('/carts/payments/confirm', (req, res, next) => {
    req.body = { quoteId: req.body.quoteId, paymentId: req.body.paymentId };
    return controller.processCartPayment(req, res, next);
  });
  router.post('/carts/payments/fail', (req, res, next) =>
    controller.failCartPayment(req, res, next)
  );
  router.post('/carts/:cartId/reopen', (req, res, next) => {
    req.body = { cartId: req.params.cartId };
    return controller.reopenCart(req, res, next);
  });

  return router;
}
