import { UpdateAttributeInput, UpdateAttributeOutput } from '../dtos/update-attribute.dto';
import {
  Attribute,
  AttributeLimits,
  AttributeType,
  AttributeTypeValue,
} from '../../domain/entities/attribute.entity';
import {
  AttributeCodeAlreadyExistsError,
  AttributeNameAlreadyExistsError,
  InvalidDefaultValueError,
  DefaultValueNotFoundError,
} from '../../domain/errors/attribute.errors';
import { AttributeNotFoundError } from '../../domain/errors/attribute-lookup.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';

export class UpdateAttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository
  ) {}

  async execute(input: UpdateAttributeInput): Promise<UpdateAttributeOutput> {
    const existing = await this.attributeRepository.findById(input.attributeId);
    if (!existing) {
      throw new AttributeNotFoundError(input.attributeId);
    }

    const name = input.name.trim();
    const description = input.description.trim();
    const code = input.code;

    if (await this.attributeRepository.existsByNameExcludingId(name, existing.getId().value)) {
      throw new AttributeNameAlreadyExistsError(name);
    }

    if (await this.attributeRepository.existsByCodeExcludingId(code, existing.getId().value)) {
      throw new AttributeCodeAlreadyExistsError(code);
    }

    const type = AttributeType.create(input.type);
    const limits = AttributeLimits.create({
      type: type.value,
      ...(input.minValue !== undefined ? { minValue: input.minValue } : {}),
      ...(input.maxValue !== undefined ? { maxValue: input.maxValue } : {}),
    });

    const defaultValueId = input.defaultValueId ?? null;
    await this.validateDefaultValue(
      defaultValueId,
      type.value,
      input.isRequired,
      input.isMultiValue,
      existing.getId().value
    );

    const attribute = Attribute.create({
      id: existing.getId().value,
      name,
      code,
      description,
      type: type.value,
      isMultiValue: input.isMultiValue,
      isRequired: input.isRequired,
      minValue: limits.minValue,
      maxValue: limits.maxValue,
      defaultValueId,
      createdAt: existing.getCreatedAt(),
      updatedAt: new Date(),
    });

    await this.attributeRepository.update(attribute);

    return {
      id: attribute.getId().value,
      name: attribute.getName(),
      code: attribute.getCode(),
      description: attribute.getDescription(),
      type: attribute.getType(),
      isMultiValue: attribute.getIsMultiValue(),
      isRequired: attribute.getIsRequired(),
      minValue: attribute.getMinValue(),
      maxValue: attribute.getMaxValue(),
      defaultValueId: attribute.getDefaultValueId(),
      createdAt: attribute.getCreatedAt(),
      updatedAt: attribute.getUpdatedAt(),
    };
  }

  private async validateDefaultValue(
    defaultValueId: string | null,
    type: AttributeTypeValue,
    isRequired: boolean,
    isMultiValue: boolean,
    attributeId: string
  ): Promise<void> {
    if (!defaultValueId) {
      return;
    }

    if (type !== 'option' || !isRequired || isMultiValue) {
      throw new InvalidDefaultValueError();
    }

    const allowedValues = await this.allowedValueRepository.listByAttribute(attributeId);
    const hasDefault = allowedValues.some((value) => value.id === defaultValueId);
    if (!hasDefault) {
      throw new DefaultValueNotFoundError(defaultValueId);
    }
  }
}
