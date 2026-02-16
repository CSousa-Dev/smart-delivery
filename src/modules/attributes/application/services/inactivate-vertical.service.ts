import { InactivateVerticalInput } from '../dtos/inactivate-vertical.dto';
import { VerticalNotFoundError } from '../../domain/errors/vertical.errors';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { VerticalEventPublisher } from '../ports/vertical-event.publisher';
import { Vertical } from '../../domain/entities/vertical.entity';

export class InactivateVerticalService {
  constructor(
    private readonly verticalRepository: VerticalRepository,
    private readonly eventPublisher: VerticalEventPublisher
  ) {}

  async execute(input: InactivateVerticalInput): Promise<void> {
    const vertical = await this.verticalRepository.findById(input.verticalId);
    if (!vertical) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    vertical.inactivate();
    await this.verticalRepository.update(vertical);
    await this.publishVerticalEvents(vertical);
  }

  private async publishVerticalEvents(vertical: Vertical): Promise<void> {
    const events = vertical.pullDomainEvents();
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }
}
