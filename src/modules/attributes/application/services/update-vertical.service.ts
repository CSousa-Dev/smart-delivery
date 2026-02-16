import { UpdateVerticalInput, UpdateVerticalOutput } from '../dtos/update-vertical.dto';
import {
  VerticalCodeAlreadyExistsError,
  VerticalNameAlreadyExistsError,
  VerticalNotFoundError,
} from '../../domain/errors/vertical.errors';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class UpdateVerticalService {
  constructor(private readonly verticalRepository: VerticalRepository) {}

  async execute(input: UpdateVerticalInput): Promise<UpdateVerticalOutput> {
    const vertical = await this.verticalRepository.findById(input.verticalId);
    if (!vertical) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    const name = input.name.trim();
    const description = input.description.trim();
    const code = input.code;

    if (await this.verticalRepository.existsByNameExcludingId(name, vertical.getId().value)) {
      throw new VerticalNameAlreadyExistsError(name);
    }

    if (await this.verticalRepository.existsByCodeExcludingId(code, vertical.getId().value)) {
      throw new VerticalCodeAlreadyExistsError(code);
    }

    vertical.updateDetails(name, code, description);
    await this.verticalRepository.update(vertical);

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
