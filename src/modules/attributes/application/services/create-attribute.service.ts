import { CreateAttributeInput, CreateAttributeOutput } from '../dtos/create-attribute.dto';
import {
  Attribute,
  AttributeLimits,
  AttributeType,
  AttributeTypeValue,
} from '../../domain/entities/attribute.entity';
import { AllowedValue } from '../../domain/entities/allowed-value.entity';
import {
  AttributeCodeAlreadyExistsError,
  AttributeNameAlreadyExistsError,
  DefaultValueNotFoundError,
  InvalidDefaultValueError,
} from '../../domain/errors/attribute.errors';
import {
  AllowedValueNameAlreadyExistsError,
  AllowedValueValueAlreadyExistsError,
} from '../../domain/errors/allowed-value.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';

export class CreateAttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository
  ) {}

  async execute(input: CreateAttributeInput): Promise<CreateAttributeOutput> {
    const name = input.name.trim();
    const description = input.description.trim();
    const code = input.code;

    if (await this.attributeRepository.existsByName(name)) {
      throw new AttributeNameAlreadyExistsError(name);
    }

    if (await this.attributeRepository.existsByCode(code)) {
      throw new AttributeCodeAlreadyExistsError(code);
    }

    const type = AttributeType.create(input.type);
    const limits = AttributeLimits.create({
      type: type.value,
      ...(input.minValue !== undefined ? { minValue: input.minValue } : {}),
      ...(input.maxValue !== undefined ? { maxValue: input.maxValue } : {}),
    });

    const allowedValuesInput =
      type.value === 'option' ? input.allowedValues ?? [] : [];
    this.validateDefaultValue(input, type.value, allowedValuesInput);

    const defaultValueId = input.defaultValueId ?? null;
    const shouldDeferDefaultValue = defaultValueId !== null && allowedValuesInput.length > 0;

    const attribute = Attribute.create({
      name,
      code,
      description,
      type: type.value,
      isMultiValue: input.isMultiValue,
      isRequired: input.isRequired,
      minValue: limits.minValue,
      maxValue: limits.maxValue,
      defaultValueId: shouldDeferDefaultValue ? null : defaultValueId,
    });

    const allowedValues = this.buildAllowedValues(
      allowedValuesInput,
      attribute.getId().value,
      limits.minValue,
      limits.maxValue
    );

    await this.attributeRepository.save(attribute);

    if (allowedValues.length > 0) {
      await this.allowedValueRepository.saveAll(allowedValues);
      if (shouldDeferDefaultValue) {
        await this.attributeRepository.updateDefaultValue(
          attribute.getId().value,
          defaultValueId
        );
      }
    }

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
      defaultValueId,
      createdAt: attribute.getCreatedAt(),
    };
  }

  private buildAllowedValues(
    values: CreateAttributeInput['allowedValues'],
    attributeId: string,
    minLength: number,
    maxLength: number
  ): AllowedValue[] {
    if (!values || values.length === 0) {
      return [];
    }

    const nameRegistry = new Set<string>();
    const valueRegistry = new Set<string>();

    return values.map((item) => {
      const nameNormalized = item.name.trim().toLowerCase();
      if (nameRegistry.has(nameNormalized)) {
        throw new AllowedValueNameAlreadyExistsError(item.name);
      }
      nameRegistry.add(nameNormalized);

      const valueNormalized = item.value.trim().toLowerCase();
      if (valueRegistry.has(valueNormalized)) {
        throw new AllowedValueValueAlreadyExistsError(item.value);
      }
      valueRegistry.add(valueNormalized);

      const allowedValuePayload = {
        attributeId,
        name: item.name,
        value: item.value,
        description: item.description ?? null,
        minLength,
        maxLength,
      };

      return AllowedValue.create(
        item.id ? { ...allowedValuePayload, id: item.id } : allowedValuePayload
      );
    });
  }

  private validateDefaultValue(
    input: CreateAttributeInput,
    type: AttributeTypeValue,
    allowedValues: CreateAttributeInput['allowedValues']
  ): void {
    if (!input.defaultValueId) {
      return;
    }

    if (type !== 'option' || !input.isRequired || input.isMultiValue) {
      throw new InvalidDefaultValueError();
    }

    if (!allowedValues || allowedValues.length === 0) {
      throw new InvalidDefaultValueError();
    }

    const hasDefault = allowedValues.some(
      (value) => value.id === input.defaultValueId
    );

    if (!hasDefault) {
      throw new DefaultValueNotFoundError(input.defaultValueId);
    }
  }
}
