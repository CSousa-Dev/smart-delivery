import { CartRepository } from '../../domain/repository/cart.repository';
import { CartStatus } from '../../domain/entities/cart-status.enum';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { Cart } from '../../domain/entities/cart.entity';

export type AutoAbandonBatchInput = {
  referenceDate?: Date;
  hours?: number;
  batchSize: number;
  afterId?: string | null;
};

export type AutoAbandonBatchResult = {
  processed: number;
  abandoned: number;
  lastId: string | null;
};

export class AutoAbandonCartService {
  private static readonly DEFAULT_HOURS = 24;

  constructor(
    private readonly cartRepository: CartRepository,
    private readonly eventPublisher: CartEventPublisher
  ) {}

  public async executeBatch(input: AutoAbandonBatchInput): Promise<AutoAbandonBatchResult> {
    const referenceDate = this.resolveReferenceDate(input.referenceDate);
    const hours = this.resolveHours(input.hours);
    const carts = await this.fetchInactiveBatch(referenceDate, hours, input);

    this.applyAutoAbandon(carts, referenceDate, hours);

    const abandoned = this.getAbandonedCarts(carts);
    await this.persistAndPublish(abandoned);

    return this.toBatchResult(carts, abandoned);
  }

  private resolveReferenceDate(referenceDate?: Date): Date {
    return referenceDate ?? new Date();
  }

  private resolveHours(hours?: number): number {
    return hours ?? AutoAbandonCartService.DEFAULT_HOURS;
  }

  private async fetchInactiveBatch(
    referenceDate: Date,
    hours: number,
    input: AutoAbandonBatchInput
  ): Promise<Cart[]> {
    const cutoffDate = new Date(referenceDate.getTime() - hours * 60 * 60 * 1000);
    return this.cartRepository.findInactiveInProgressBatch(
      cutoffDate,
      input.batchSize,
      input.afterId ?? undefined
    );
  }

  private applyAutoAbandon(carts: Cart[], referenceDate: Date, hours: number): void {
    for (const cart of carts) {
      cart.abandonIfInactive(referenceDate, hours);
    }
  }

  private getAbandonedCarts(carts: Cart[]): Cart[] {
    return carts.filter((cart) => cart.status === CartStatus.ABANDONED);
  }

  private async persistAndPublish(carts: Cart[]): Promise<void> {
    if (carts.length === 0) return;
    await this.cartRepository.saveMany(carts);
    const events = carts.flatMap((cart) => cart.pullDomainEvents());
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }

  private toBatchResult(processed: Cart[], abandoned: Cart[]): AutoAbandonBatchResult {
    const lastCart = processed.at(-1);
    const lastId = lastCart ? lastCart.id.get() : null;
    return {
      processed: processed.length,
      abandoned: abandoned.length,
      lastId,
    };
  }
}
