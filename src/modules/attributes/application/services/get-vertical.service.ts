import { GetVerticalInput, GetVerticalOutput } from '../dtos/get-vertical.dto';
import { VerticalNotFoundError } from '../../domain/errors/vertical.errors';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class GetVerticalService {
  constructor(private readonly verticalRepository: VerticalRepository) {}

  async execute(input: GetVerticalInput): Promise<GetVerticalOutput> {
    const vertical = await this.verticalRepository.findById(input.verticalId);
    if (!vertical) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    return {
      id: vertical.getId().value,
      name: vertical.getName(),
      code: vertical.getCode(),
      description: vertical.getDescription(),
      isActive: vertical.getIsActive(),
      createdAt: vertical.getCreatedAt(),
      updatedAt: vertical.getUpdatedAt(),
    };
  }
}
