import {
  UpdateVerticalAttributeInput,
  UpdateVerticalAttributeOutput,
} from '../dtos/update-vertical-attribute.dto';
import { AttributeNotFoundError, AttributeNotOptionTypeError } from '../../domain/errors/attribute-lookup.errors';
import { DefaultValueNotFoundError, InvalidAttributeLimitsError, InvalidDefaultValueError } from '../../domain/errors/attribute.errors';
import { VerticalNotFoundError } from '../../domain/errors/category.errors';
import {
  AllowedValueConflictError,
  AllowedValueNotFoundError,
  VerticalAttributeNotFoundError,
} from '../../domain/errors/vertical-attribute.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { VerticalAttributeRepository } from '../../domain/repositories/vertical-attribute.repository';
import { VerticalAllowedValueRepository } from '../../domain/repositories/vertical-allowed-value.repository';
import { VerticalAttribute, DefaultValueScope } from '../../domain/entities/vertical-attribute.entity';
import { VerticalAllowedValue } from '../../domain/entities/vertical-allowed-value.entity';

export class UpdateVerticalAttributeService {
  constructor(
    private readonly verticalRepository: VerticalRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository,
    private readonly verticalAttributeRepository: VerticalAttributeRepository,
    private readonly verticalAllowedValueRepository: VerticalAllowedValueRepository
  ) {}

  async execute(
    input: UpdateVerticalAttributeInput
  ): Promise<UpdateVerticalAttributeOutput> {
    if (!(await this.verticalRepository.existsById(input.verticalId))) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    const attribute = await this.attributeRepository.findById(input.attributeId);
    if (!attribute) {
      throw new AttributeNotFoundError(input.attributeId);
    }

    const existing = await this.verticalAttributeRepository.findByVerticalAndAttribute(
      input.verticalId,
      input.attributeId
    );
    if (!existing) {
      throw new VerticalAttributeNotFoundError(input.verticalId, input.attributeId);
    }

    if (
      (input.allowedValueIds && input.allowedValueIds.length > 0) ||
      (input.additionalAllowedValues && input.additionalAllowedValues.length > 0)
    ) {
      if (attribute.getType() !== 'option') {
        throw new AttributeNotOptionTypeError(input.attributeId);
      }
    }

    if (
      input.minValue !== null &&
      input.minValue !== undefined &&
      input.maxValue !== null &&
      input.maxValue !== undefined &&
      input.minValue > input.maxValue
    ) {
      throw new InvalidAttributeLimitsError(input.minValue, input.maxValue);
    }

    const effectiveIsRequired = input.isRequired ?? existing.isRequired ?? attribute.getIsRequired();
    const effectiveIsMultiValue =
      input.isMultiValue ?? existing.isMultiValue ?? attribute.getIsMultiValue();
    const effectiveMinValue = input.minValue ?? existing.minValue ?? attribute.getMinValue();
    const effectiveMaxValue = input.maxValue ?? existing.maxValue ?? attribute.getMaxValue();

    let inheritedValues: Array<{ id: string; name: string; value: string }> = [];
    const subsetIds =
      input.allowedValueIds ??
      (await this.verticalAttributeRepository.listSubsetLinks(existing.id));
    if (attribute.getType() === 'option') {
      const globalValues = await this.allowedValueRepository.listByAttribute(
        attribute.getId().value
      );

      if (subsetIds.length > 0) {
        const byId = new Map(globalValues.map((value) => [value.id, value]));
        for (const allowedId of subsetIds) {
          if (!byId.has(allowedId)) {
            throw new AllowedValueNotFoundError(allowedId);
          }
        }
        inheritedValues = subsetIds.map((id) => byId.get(id)!);
      } else {
        inheritedValues = globalValues;
      }
    }

    const additionalValues =
      input.additionalAllowedValues ??
      (await this.verticalAllowedValueRepository.listByVerticalAttribute(existing.id));

    const inheritedNameRegistry = new Set(
      inheritedValues.map((value) => value.name.trim().toLowerCase())
    );
    const inheritedValueRegistry = new Set(
      inheritedValues.map((value) => value.value.trim().toLowerCase())
    );

    const additionalNameRegistry = new Set<string>();
    const additionalValueRegistry = new Set<string>();

    for (const additional of additionalValues) {
      const nameNormalized = additional.name.trim().toLowerCase();
      const valueNormalized = additional.value.trim().toLowerCase();

      if (inheritedNameRegistry.has(nameNormalized) || additionalNameRegistry.has(nameNormalized)) {
        throw new AllowedValueConflictError(additional.name);
      }

      if (
        inheritedValueRegistry.has(valueNormalized) ||
        additionalValueRegistry.has(valueNormalized)
      ) {
        throw new AllowedValueConflictError(additional.value);
      }

      additionalNameRegistry.add(nameNormalized);
      additionalValueRegistry.add(valueNormalized);
    }

    const defaultValueScope = this.resolveDefaultValueScope(
      input.defaultValueId ?? existing.defaultValueId ?? null,
      inheritedValues,
      additionalValues,
      attribute.getType(),
      effectiveIsRequired,
      effectiveIsMultiValue
    );

    const verticalAttribute = VerticalAttribute.create({
      id: existing.id,
      verticalId: input.verticalId,
      attributeId: input.attributeId,
      isRequired: input.isRequired ?? existing.isRequired ?? null,
      isMultiValue: input.isMultiValue ?? existing.isMultiValue ?? null,
      minValue: input.minValue ?? existing.minValue ?? null,
      maxValue: input.maxValue ?? existing.maxValue ?? null,
      defaultValueId: input.defaultValueId ?? existing.defaultValueId ?? null,
      defaultValueScope,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    });

    await this.verticalAttributeRepository.update(verticalAttribute);
    await this.verticalAttributeRepository.deleteSubsetLinks(existing.id);
    await this.verticalAllowedValueRepository.deleteByVerticalAttribute(existing.id);

    if (subsetIds.length > 0) {
      await this.verticalAttributeRepository.saveSubsetLinks(existing.id, subsetIds);
    }

    if (additionalValues.length > 0) {
      const verticalAllowedValues = additionalValues.map((value) => {
        const payload = {
          verticalAttributeId: existing.id,
          name: value.name,
          value: value.value,
          description: value.description ?? null,
          minLength: effectiveMinValue,
          maxLength: effectiveMaxValue,
        };

        return VerticalAllowedValue.create(
          value.id ? { ...payload, id: value.id } : payload
        );
      });

      await this.verticalAllowedValueRepository.saveAll(verticalAllowedValues);
    }

    return {
      id: verticalAttribute.getId().value,
      verticalId: verticalAttribute.getVerticalId(),
      attributeId: verticalAttribute.getAttributeId(),
      isRequired: verticalAttribute.getIsRequired(),
      isMultiValue: verticalAttribute.getIsMultiValue(),
      minValue: verticalAttribute.getMinValue(),
      maxValue: verticalAttribute.getMaxValue(),
      defaultValueId: verticalAttribute.getDefaultValueId(),
      defaultValueScope: verticalAttribute.getDefaultValueScope(),
      createdAt: verticalAttribute.getCreatedAt(),
      updatedAt: verticalAttribute.getUpdatedAt(),
    };
  }

  private resolveDefaultValueScope(
    defaultValueId: string | null,
    inheritedValues: Array<{ id: string; name: string; value: string }>,
    additionalValues: UpdateVerticalAttributeInput['additionalAllowedValues'],
    attributeType: string,
    isRequired: boolean,
    isMultiValue: boolean
  ): DefaultValueScope | null {
    if (!defaultValueId) {
      return null;
    }

    if (attributeType !== 'option' || !isRequired || isMultiValue) {
      throw new InvalidDefaultValueError();
    }

    const additionalMatch = (additionalValues ?? []).some(
      (value) => value.id === defaultValueId
    );
    if (additionalMatch) {
      return 'VERTICAL';
    }

    const inheritedMatch = inheritedValues.some((value) => value.id === defaultValueId);
    if (inheritedMatch) {
      return 'ATTRIBUTE';
    }

    throw new DefaultValueNotFoundError(defaultValueId);
  }
}
