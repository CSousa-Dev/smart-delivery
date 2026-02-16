import {
  UpdateAllowedValueInput,
  UpdateAllowedValueOutput,
} from '../dtos/update-allowed-value.dto';
import {
  AllowedValueNameAlreadyExistsError,
  AllowedValueValueAlreadyExistsError,
  AllowedValueInUseError,
} from '../../domain/errors/allowed-value.errors';
import { AllowedValueNotFoundError } from '../../domain/errors/vertical-attribute.errors';
import { AttributeNotFoundError, AttributeNotOptionTypeError } from '../../domain/errors/attribute-lookup.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';
import { AllowedValue, AllowedValueName, AllowedValueValue } from '../../domain/entities/allowed-value.entity';

export class UpdateAllowedValueService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository
  ) {}

  async execute(input: UpdateAllowedValueInput): Promise<UpdateAllowedValueOutput> {
    const allowedValue = await this.allowedValueRepository.findById(input.allowedValueId);
    if (!allowedValue) {
      throw new AllowedValueNotFoundError(input.allowedValueId);
    }

    const attribute = await this.attributeRepository.findById(allowedValue.getAttributeId());
    if (!attribute) {
      throw new AttributeNotFoundError(allowedValue.getAttributeId());
    }

    if (attribute.getType() !== 'option') {
      throw new AttributeNotOptionTypeError(attribute.getId().value);
    }

    const name = input.name.trim();
    const value = input.value.trim();

    if (
      await this.allowedValueRepository.existsByNameExcludingId(
        allowedValue.getAttributeId(),
        name,
        allowedValue.getId().value
      )
    ) {
      throw new AllowedValueNameAlreadyExistsError(name);
    }

    if (
      await this.allowedValueRepository.existsByValueExcludingId(
        allowedValue.getAttributeId(),
        value,
        allowedValue.getId().value
      )
    ) {
      throw new AllowedValueValueAlreadyExistsError(value);
    }

    AllowedValueName.create(name);
    AllowedValueValue.create(value, attribute.getMinValue(), attribute.getMaxValue());

    if (await this.allowedValueRepository.isLinkedToUsage(allowedValue.getId().value)) {
      throw new AllowedValueInUseError(allowedValue.getId().value);
    }

    const updated = AllowedValue.restore({
      id: allowedValue.getId().value,
      attributeId: allowedValue.getAttributeId(),
      name,
      value,
      description: input.description ?? null,
      createdAt: allowedValue.getCreatedAt(),
      updatedAt: new Date(),
    });

    await this.allowedValueRepository.update(updated);

    return {
      id: updated.getId().value,
      attributeId: updated.getAttributeId(),
      name: updated.getName(),
      value: updated.getValue(),
      description: updated.getDescription(),
      createdAt: updated.getCreatedAt(),
      updatedAt: updated.getUpdatedAt(),
    };
  }
}
