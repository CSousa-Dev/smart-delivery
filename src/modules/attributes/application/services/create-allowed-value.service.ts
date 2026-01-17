import {
  CreateAllowedValueInput,
  CreateAllowedValueOutput,
} from '../dtos/create-allowed-value.dto';
import { AllowedValue } from '../../domain/entities/allowed-value.entity';
import {
  AllowedValueNameAlreadyExistsError,
  AllowedValueValueAlreadyExistsError,
} from '../../domain/errors/allowed-value.errors';
import {
  AttributeNotOptionTypeError,
  AttributeNotFoundError,
} from '../../domain/errors/attribute-lookup.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';

export class CreateAllowedValueService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository
  ) {}

  async execute(input: CreateAllowedValueInput): Promise<CreateAllowedValueOutput> {
    const attribute = await this.attributeRepository.findById(input.attributeId);

    if (!attribute) {
      throw new AttributeNotFoundError(input.attributeId);
    }

    if (attribute.getType() !== 'option') {
      throw new AttributeNotOptionTypeError(input.attributeId);
    }

    const name = input.name.trim();
    const value = input.value.trim();

    if (await this.allowedValueRepository.existsByName(input.attributeId, name)) {
      throw new AllowedValueNameAlreadyExistsError(name);
    }

    if (await this.allowedValueRepository.existsByValue(input.attributeId, value)) {
      throw new AllowedValueValueAlreadyExistsError(value);
    }

    const allowedValue = AllowedValue.create({
      attributeId: input.attributeId,
      name,
      value,
      description: input.description ?? null,
      minLength: attribute.getMinValue(),
      maxLength: attribute.getMaxValue(),
    });

    await this.allowedValueRepository.saveAll([allowedValue]);

    return {
      id: allowedValue.getId().value,
      attributeId: allowedValue.getAttributeId(),
      name: allowedValue.getName(),
      value: allowedValue.getValue(),
      description: allowedValue.getDescription(),
      createdAt: allowedValue.getCreatedAt(),
    };
  }
}
