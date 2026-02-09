import { AutoAbandonCartService } from '../../../../src/modules/cart/application/service/auto-abandon-cart.service';
import { CartBuilder } from '../../../../src/modules/cart/domain/entities/cart.builder';
import { CartStatus } from '../../../../src/modules/cart/domain/entities/cart-status.enum';

describe('AutoAbandonCartService', () => {
  const buildCart = (id: string, lastMovementAt: Date) =>
    CartBuilder.openCart('customer-1', 'vertical-1', 'bu-1')
      .withCartId(id)
      .withOpenedAt(new Date(lastMovementAt.getTime() - 1000))
      .withLastMovementAt(lastMovementAt)
      .withStatus(CartStatus.OPEN)
      .build();

  it('should abandon inactive carts and publish events', async () => {
    const referenceDate = new Date('2026-02-08T12:00:00.000Z');
    const staleCart = buildCart('cart-stale', new Date('2026-02-06T08:00:00.000Z'));
    const freshCart = buildCart('cart-fresh', new Date('2026-02-08T11:30:00.000Z'));

    const cartRepository = {
      findInactiveInProgressBatch: jest.fn().mockResolvedValue([staleCart, freshCart]),
      saveMany: jest.fn().mockResolvedValue(undefined),
    } as any;

    const eventPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    } as any;

    const service = new AutoAbandonCartService(cartRepository, eventPublisher);

    const result = await service.executeBatch({ batchSize: 10, referenceDate, hours: 24 });

    expect(result).toEqual({
      processed: 2,
      abandoned: 1,
      lastId: freshCart.id.get(),
    });
    expect(cartRepository.saveMany).toHaveBeenCalledTimes(1);
    expect(cartRepository.saveMany).toHaveBeenCalledWith([staleCart]);
    expect(eventPublisher.publish).toHaveBeenCalledTimes(1);
    const [events] = (eventPublisher.publish as jest.Mock).mock.calls[0];
    const abandonedEvents = events.filter((event: { name?: string }) => event.name === 'CartAbandoned');
    expect(abandonedEvents).toHaveLength(1);
  });

  it('should skip persistence when no carts are abandoned', async () => {
    const referenceDate = new Date('2026-02-08T12:00:00.000Z');
    const freshCart = buildCart('cart-fresh', new Date('2026-02-08T11:30:00.000Z'));

    const cartRepository = {
      findInactiveInProgressBatch: jest.fn().mockResolvedValue([freshCart]),
      saveMany: jest.fn().mockResolvedValue(undefined),
    } as any;

    const eventPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    } as any;

    const service = new AutoAbandonCartService(cartRepository, eventPublisher);

    const result = await service.executeBatch({ batchSize: 5, referenceDate, hours: 24 });

    expect(result).toEqual({
      processed: 1,
      abandoned: 0,
      lastId: freshCart.id.get(),
    });
    expect(cartRepository.saveMany).not.toHaveBeenCalled();
    expect(eventPublisher.publish).not.toHaveBeenCalled();
  });
});
