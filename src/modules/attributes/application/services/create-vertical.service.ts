import { CreateVerticalInput, CreateVerticalOutput } from '../dtos/create-vertical.dto';
import { Vertical } from '../../domain/entities/vertical.entity';
import {
  VerticalCodeAlreadyExistsError,
  VerticalNameAlreadyExistsError,
} from '../../domain/errors/vertical.errors';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class CreateVerticalService {
  constructor(private readonly verticalRepository: VerticalRepository) {}

  async execute(input: CreateVerticalInput): Promise<CreateVerticalOutput> {
    const name = input.name.trim();
    const description = input.description.trim();
    const code = input.code;

    if (await this.verticalRepository.existsByName(name)) {
      throw new VerticalNameAlreadyExistsError(name);
    }

    if (await this.verticalRepository.existsByCode(code)) {
      throw new VerticalCodeAlreadyExistsError(code);
    }

    const vertical = Vertical.create({
      name,
      code,
      description,
    });

    await this.verticalRepository.save(vertical);

    return {
      id: vertical.getId().value,
      name: vertical.getName(),
      code: vertical.getCode(),
      description: vertical.getDescription(),
      isActive: vertical.getIsActive(),
      createdAt: vertical.getCreatedAt(),
    };
  }
}
