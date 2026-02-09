import { AutoAbandonCartService } from '../service/auto-abandon-cart.service';

type AutoAbandonJobOptions = {
  batchSize?: number;
  hours?: number;
  referenceDate?: Date;
};

export class AutoAbandonCartsJob {
  static readonly DEFAULT_BATCH_SIZE = 200;
  static readonly DEFAULT_HOURS = 24;
  static readonly RUN_EVERY_HOURS = 6;

  constructor(private readonly autoAbandonCartService: AutoAbandonCartService) {}

  public async run(options: AutoAbandonJobOptions = {}): Promise<{
    processed: number;
    abandoned: number;
    batches: number;
  }> {
    const batchSize = options.batchSize ?? AutoAbandonCartsJob.DEFAULT_BATCH_SIZE;
    const hours = options.hours ?? AutoAbandonCartsJob.DEFAULT_HOURS;
    const referenceDate = options.referenceDate ?? new Date();

    let afterId: string | null = null;
    let processed = 0;
    let abandoned = 0;
    let batches = 0;

    while (true) {
      const result = await this.autoAbandonCartService.executeBatch({
        referenceDate,
        hours,
        batchSize,
        afterId,
      });

      batches += 1;
      processed += result.processed;
      abandoned += result.abandoned;
      afterId = result.lastId;

      if (result.processed === 0 || !afterId) {
        break;
      }
    }

    return { processed, abandoned, batches };
  }
}
