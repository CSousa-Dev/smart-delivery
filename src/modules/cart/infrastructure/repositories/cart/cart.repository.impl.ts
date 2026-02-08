import { PrismaClient, Prisma } from '../../database/prisma/generated';
import { CartRepository } from '../../../domain/repository/cart.repository';
import { Cart } from '../../../domain/entities/cart.entity';
import { CartMapper } from './cart.mapper';
import { CART_STATUSES_IN_PROGRESS } from '../../../domain/cart-status-in-progress';
import { CartAlreadyOpenForCustomerError } from '../../../domain/errors/cart-already-open-for-customer.error';

/** P2002 on Cart create is the unique_active_cart_per_customer constraint (one active cart per customer). */
function isUniqueActiveCartViolation(err: unknown): boolean {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) return false;
  return err.code === 'P2002';
}

export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async existsOpenCartForCustomer(customerId: string): Promise<boolean> {
    const count = await this.prisma.cart.count({
      where: {
        customerId,
        status: { in: CART_STATUSES_IN_PROGRESS },
      },
    });
    return count > 0;
  }

  async findOpenCartForCustomer(customerId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        customerId,
        status: { in: CART_STATUSES_IN_PROGRESS },
      },
      orderBy: { lastMovementAt: 'desc' },
      include: {
        statusHistory: { orderBy: { changedAt: 'asc' } },
      },
    });
    if (!cart) return null;
    return CartMapper.fromPersistence({
      id: cart.id,
      customerId: cart.customerId,
      verticalId: cart.verticalId,
      businessUnitId: cart.businessUnitId,
      status: cart.status,
      openedAt: cart.openedAt,
      lastMovementAt: cart.lastMovementAt,
      closedAt: cart.closedAt,
      paymentMethod: cart.paymentMethod ?? null,
      paymentId: cart.paymentId ?? null,
      paymentObservation: cart.paymentObservation ?? null,
      paymentPreferenceId: cart.paymentPreferenceId ?? null,
      quoteId: cart.quoteId ?? null,
      deliveryPlanId: cart.deliveryPlanId ?? null,
      deliveryAddressId: cart.deliveryAddressId ?? null,
      deliveryPrice: cart.deliveryPrice ?? null,
      items: (cart.items as unknown as any[]) ?? null,
      coupons: (cart.coupons as unknown as any[]) ?? null,
      statusHistory: cart.statusHistory.map((entry) => ({
        status: entry.status,
        changedAt: entry.changedAt,
        durationMs: entry.durationMs,
      })),
    });
  }

  async insertCartEnforcingOneActivePerCustomer(cart: Cart): Promise<string> {
    const data = CartMapper.toPersistence(cart);
    try {
      await this.prisma.cart.create({
        data: {
          id: data.id,
          customerId: data.customerId,
          verticalId: data.verticalId,
          businessUnitId: data.businessUnitId,
          status: data.status,
          openedAt: data.openedAt,
          lastMovementAt: data.lastMovementAt,
          closedAt: data.closedAt,
          paymentMethod: data.paymentMethod,
          paymentId: data.paymentId,
          paymentObservation: data.paymentObservation,
          paymentPreferenceId: data.paymentPreferenceId,
          quoteId: data.quoteId,
          deliveryPlanId: data.deliveryPlanId,
          deliveryAddressId: data.deliveryAddressId,
          deliveryPrice: data.deliveryPrice,
          ...(data.items != null && { items: data.items }),
          ...(data.coupons != null && { coupons: data.coupons }),
          ...(data.statusHistory?.length && {
            statusHistory: {
              createMany: {
                data: data.statusHistory.map((entry) => ({
                  status: entry.status,
                  changedAt: entry.changedAt,
                  durationMs: entry.durationMs ?? null,
                })),
              },
            },
          }),
        },
      });
      return data.id;
    } catch (err) {
      if (isUniqueActiveCartViolation(err)) {
        throw new CartAlreadyOpenForCustomerError(cart.customerId);
      }
      throw err;
    }
  }

  async findById(_cartId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: _cartId },
      include: {
        statusHistory: { orderBy: { changedAt: 'asc' } },
      },
    });
    if (!cart) return null;
    return CartMapper.fromPersistence({
      id: cart.id,
      customerId: cart.customerId,
      verticalId: cart.verticalId,
      businessUnitId: cart.businessUnitId,
      status: cart.status,
      openedAt: cart.openedAt,
      lastMovementAt: cart.lastMovementAt,
      closedAt: cart.closedAt,
      paymentMethod: cart.paymentMethod ?? null,
      paymentId: cart.paymentId ?? null,
      paymentObservation: cart.paymentObservation ?? null,
      paymentPreferenceId: cart.paymentPreferenceId ?? null,
      quoteId: cart.quoteId ?? null,
      deliveryPlanId: cart.deliveryPlanId ?? null,
      deliveryAddressId: cart.deliveryAddressId ?? null,
      deliveryPrice: cart.deliveryPrice ?? null,
      items: (cart.items as unknown as any[]) ?? null,
      coupons: (cart.coupons as unknown as any[]) ?? null,
      statusHistory: cart.statusHistory.map((entry) => ({
        status: entry.status,
        changedAt: entry.changedAt,
        durationMs: entry.durationMs,
      })),
    });
  }

  async findByQuoteId(quoteId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findFirst({
      where: { quoteId },
      include: {
        statusHistory: { orderBy: { changedAt: 'asc' } },
      },
    });
    if (!cart) return null;
    return CartMapper.fromPersistence({
      id: cart.id,
      customerId: cart.customerId,
      verticalId: cart.verticalId,
      businessUnitId: cart.businessUnitId,
      status: cart.status,
      openedAt: cart.openedAt,
      lastMovementAt: cart.lastMovementAt,
      closedAt: cart.closedAt,
      paymentMethod: cart.paymentMethod ?? null,
      paymentId: cart.paymentId ?? null,
      paymentObservation: cart.paymentObservation ?? null,
      paymentPreferenceId: cart.paymentPreferenceId ?? null,
      quoteId: cart.quoteId ?? null,
      deliveryPlanId: cart.deliveryPlanId ?? null,
      deliveryAddressId: cart.deliveryAddressId ?? null,
      deliveryPrice: cart.deliveryPrice ?? null,
      items: (cart.items as unknown as any[]) ?? null,
      coupons: (cart.coupons as unknown as any[]) ?? null,
      statusHistory: cart.statusHistory.map((entry) => ({
        status: entry.status,
        changedAt: entry.changedAt,
        durationMs: entry.durationMs,
      })),
    });
  }

  async save(cart: Cart): Promise<void> {
    const data = CartMapper.toPersistence(cart);
    const statusHistoryData = data.statusHistory ?? [];
    await this.prisma.$transaction([
      this.prisma.cart.update({
        where: { id: data.id },
        data: {
          status: data.status,
          lastMovementAt: data.lastMovementAt,
          closedAt: data.closedAt,
          paymentMethod: data.paymentMethod,
          paymentId: data.paymentId,
          paymentObservation: data.paymentObservation,
          paymentPreferenceId: data.paymentPreferenceId,
          quoteId: data.quoteId,
          deliveryPlanId: data.deliveryPlanId,
          deliveryAddressId: data.deliveryAddressId,
          deliveryPrice: data.deliveryPrice,
          items: data.items,
          coupons: data.coupons,
        },
      }),
      this.prisma.cartStatusHistory.deleteMany({ where: { cartId: data.id } }),
      ...(statusHistoryData.length
        ? [
            this.prisma.cartStatusHistory.createMany({
              data: statusHistoryData.map((entry) => ({
                cartId: data.id,
                status: entry.status,
                changedAt: entry.changedAt,
                durationMs: entry.durationMs ?? null,
              })),
            }),
          ]
        : []),
    ]);
  }
}
