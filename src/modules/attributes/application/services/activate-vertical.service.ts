import { ActivateVerticalInput } from '../dtos/activate-vertical.dto';
import { VerticalNotFoundError } from '../../domain/errors/vertical.errors';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { VerticalEventPublisher } from '../ports/vertical-event.publisher';
import { Vertical } from '../../domain/entities/vertical.entity';

export class ActivateVerticalService {
  constructor(
    private readonly verticalRepository: VerticalRepository,
    private readonly eventPublisher: VerticalEventPublisher
  ) {}

  async execute(input: ActivateVerticalInput): Promise<void> {
    const vertical = await this.verticalRepository.findById(input.verticalId);
    if (!vertical) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    vertical.activate();
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
