import { Request, Response, NextFunction } from 'express';
import { OpenCartService } from '../../../application/service/open-cart.service';
import { AddCartItemService } from '../../../application/service/add-cart-item.service';
import { UpdateCartItemService } from '../../../application/service/update-cart-item.service';
import { RemoveCartItemService } from '../../../application/service/remove-cart-item.service';
import { ReadCartService } from '../../../application/service/read-cart.service';
import { SetCartAddressService } from '../../../application/service/set-cart-address.service';
import { SetCartPaymentPreferenceService } from '../../../application/service/set-cart-payment-preference.service';
import { CheckoutCartService } from '../../../application/service/checkout-cart.service';
import { ProcessCartPaymentService } from '../../../application/service/process-cart-payment.service';
import { FailCartPaymentService } from '../../../application/service/fail-cart-payment.service';
import { ReopenCartService } from '../../../application/service/reopen-cart.service';
import { AddCouponService } from '../../../application/service/add-coupon.service';
import { RemoveCouponService } from '../../../application/service/remove-coupon.service';
import { AppError } from '../../../../../shared/utils/AppError';
import { AuthenticateRequestService } from '../../../../auth/application/service/authenticate-request.service';

const ERROR_STATUS_BY_CODE: Record<
  string,
  (message: string, code: string, payload?: Record<string, unknown>) => AppError
> = {
  CART_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  CART_ALREADY_OPEN_FOR_CUSTOMER: (message, code) => AppError.conflict(message, code),
  CUSTOMER_CONTEXT_INVALID: (message, code) => AppError.badRequest(message, code),
  VERTICAL_CONTEXT_INVALID: (message, code) => AppError.badRequest(message, code),
  IMMUTABLE_CART_VIOLATION: (message, code) => AppError.badRequest(message, code),
  INVALID_BUSINESS_CONTEXT: (message, code) => AppError.badRequest(message, code),
  INVALID_CART_STATUS_TRANSITION: (message, code) => AppError.badRequest(message, code),
  PRODUCT_VALIDATION_ERRORS: (message, code, payload) =>
    AppError.badRequest(message, code, payload),
  ADD_CART_ITEM_OPERATIONS_VALIDATION: (message, code) => AppError.badRequest(message, code),
  ITEM_NOT_FOUND_IN_CART_VIOLATION: (message, code) => AppError.notFound(message, code),
  ITEM_QUANTITY_VIOLATION: (message, code) => AppError.badRequest(message, code),
  ADDRESS_ID_REQUIRED_FOR_VALIDATION: (message, code) => AppError.badRequest(message, code),
  ADDRESS_OUT_OF_RANGE_FOR_ORDER: (message, code) => AppError.badRequest(message, code),
  ADDRESS_VALIDATION_REQUIRED_FOR_ORDER: (message, code) => AppError.badRequest(message, code),
  MISSING_ADDRESS_FOR_ORDER: (message, code) => AppError.badRequest(message, code),
  PAYMENT_PREFERENCE_INVALID: (message, code) => AppError.badRequest(message, code),
  PAYMENT_PREFERENCE_REQUIRED_FOR_CHECKOUT: (message, code) => AppError.badRequest(message, code),
  DELIVERY_PLAN_REQUIRED_FOR_CHECKOUT: (message, code) => AppError.badRequest(message, code),
  CART_ITEMS_REQUIRED_FOR_CHECKOUT: (message, code) => AppError.badRequest(message, code),
  QUOTE_ID_REQUIRED_FOR_PAYMENT: (message, code) => AppError.badRequest(message, code),
  PAYMENT_REQUIRED_FOR_ORDER: (message, code) => AppError.badRequest(message, code),
  CART_ITEMS_REQUIRED_FOR_ORDER: (message, code) => AppError.badRequest(message, code),
  CART_ITEM_QUANTITY_INVALID_FOR_ORDER: (message, code) => AppError.badRequest(message, code),
  DUPLICATE_COUPON_VIOLATION: (message, code) => AppError.conflict(message, code),
  COUPON_CODE_MISSING: (message, code) => AppError.badRequest(message, code),
  AUTHENTICATION_FAILED: (message, code) => AppError.unauthorized(message, code),
  CART_OWNER_MISMATCH: (message, code) => AppError.forbidden(message, code),
};

export class CartController {
  constructor(
    private readonly openCartService: OpenCartService,
    private readonly addCartItemService: AddCartItemService,
    private readonly updateCartItemService: UpdateCartItemService,
    private readonly removeCartItemService: RemoveCartItemService,
    private readonly readCartService: ReadCartService,
    private readonly setCartAddressService: SetCartAddressService,
    private readonly setCartPaymentPreferenceService: SetCartPaymentPreferenceService,
    private readonly checkoutCartService: CheckoutCartService,
    private readonly processCartPaymentService: ProcessCartPaymentService,
    private readonly failCartPaymentService: FailCartPaymentService,
    private readonly reopenCartService: ReopenCartService,
    private readonly addCouponService: AddCouponService,
    private readonly removeCouponService: RemoveCouponService,
    private readonly authenticateRequestService: AuthenticateRequestService
  ) {}

  async openCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.openCartService.execute({ ...req.body, actorUserId });
      res.status(201).json({
        success: true,
        data: { cartId: output.cartId },
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async addCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.addCartItemService.execute({ ...req.body, actorUserId });
      res.status(201).json({
        success: true,
        data: { itemId: output.itemId },
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async updateCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      await this.updateCartItemService.execute({ ...req.body, actorUserId });
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async removeCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      await this.removeCartItemService.execute({ ...req.body, actorUserId });
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async readCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.readCartService.execute({ ...req.body, actorUserId });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async setCartAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.setCartAddressService.execute({ ...req.body, actorUserId });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async setCartPaymentPreference(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.setCartPaymentPreferenceService.execute({
        ...req.body,
        actorUserId,
      });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async checkoutCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.checkoutCartService.execute({ ...req.body, actorUserId });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async processCartPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      await this.processCartPaymentService.execute({ ...req.body, actorUserId });
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async failCartPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.failCartPaymentService.execute({ ...req.body });
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async reopenCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.reopenCartService.execute({ ...req.body, actorUserId });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async addCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.addCouponService.execute({ ...req.body, actorUserId });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async removeCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = await this.getActorUserId(req);
      const output = await this.removeCouponService.execute({ ...req.body, actorUserId });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  private async getActorUserId(req: Request): Promise<string> {
    const authorization = String(req.headers.authorization || '');
    const token = authorization.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length).trim()
      : '';
    const output = await this.authenticateRequestService.execute({ accessToken: token });
    return output.userId;
  }

  private mapError(error: unknown): Error {
    if (error && typeof error === 'object' && 'code' in error) {
      const err = error as { code: string; payload?: Record<string, unknown> };
      const code = String(err.code);
      const message = error instanceof Error ? error.message : 'Request error';
      const mapper = ERROR_STATUS_BY_CODE[code];
      if (mapper) {
        return mapper(message, code, err.payload);
      }
    }
    return AppError.internal();
  }
}
