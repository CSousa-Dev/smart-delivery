import {
  UpdateCategoryAttributeInput,
  UpdateCategoryAttributeOutput,
} from '../dtos/update-category-attribute.dto';
import { AttributeNotFoundError, AttributeNotOptionTypeError } from '../../domain/errors/attribute-lookup.errors';
import { DefaultValueNotFoundError, InvalidAttributeLimitsError, InvalidDefaultValueError } from '../../domain/errors/attribute.errors';
import { AllowedValueConflictError, AllowedValueNotFoundError } from '../../domain/errors/vertical-attribute.errors';
import { AttributeNotLinkedToVerticalError, CategoryAttributeNotFoundError, CategoryNotFoundError } from '../../domain/errors/category-attribute.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryAttributeRepository } from '../../domain/repositories/category-attribute.repository';
import { CategoryAllowedValueRepository } from '../../domain/repositories/category-allowed-value.repository';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { VerticalAttributeRepository } from '../../domain/repositories/vertical-attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';
import { VerticalAllowedValueRepository } from '../../domain/repositories/vertical-allowed-value.repository';
import { CategoryAttribute, CategoryDefaultValueScope } from '../../domain/entities/category-attribute.entity';
import { CategoryAllowedValue } from '../../domain/entities/category-allowed-value.entity';

interface InheritedAllowedValue {
  id: string;
  name: string;
  value: string;
  scope: 'ATTRIBUTE' | 'VERTICAL';
}

export class UpdateCategoryAttributeService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryAttributeRepository: CategoryAttributeRepository,
    private readonly categoryAllowedValueRepository: CategoryAllowedValueRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly verticalAttributeRepository: VerticalAttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository,
    private readonly verticalAllowedValueRepository: VerticalAllowedValueRepository
  ) {}

  async execute(
    input: UpdateCategoryAttributeInput
  ): Promise<UpdateCategoryAttributeOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }

    const attribute = await this.attributeRepository.findById(input.attributeId);
    if (!attribute) {
      throw new AttributeNotFoundError(input.attributeId);
    }

    const verticalAttribute = await this.verticalAttributeRepository.findByVerticalAndAttribute(
      category.getVerticalId(),
      input.attributeId
    );
    if (!verticalAttribute) {
      throw new AttributeNotLinkedToVerticalError(input.attributeId, category.getVerticalId());
    }

    const existing = await this.categoryAttributeRepository.findByCategoryAndAttribute(
      input.categoryId,
      input.attributeId
    );
    if (!existing) {
      throw new CategoryAttributeNotFoundError(input.categoryId, input.attributeId);
    }

    if (
      (input.allowedValueRefs && input.allowedValueRefs.length > 0) ||
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

    const effectiveIsRequired =
      input.isRequired ?? existing.isRequired ?? verticalAttribute.isRequired ?? attribute.getIsRequired();
    const effectiveIsMultiValue =
      input.isMultiValue ?? existing.isMultiValue ?? verticalAttribute.isMultiValue ?? attribute.getIsMultiValue();
    const effectiveMinValue =
      input.minValue ?? existing.minValue ?? verticalAttribute.minValue ?? attribute.getMinValue();
    const effectiveMaxValue =
      input.maxValue ?? existing.maxValue ?? verticalAttribute.maxValue ?? attribute.getMaxValue();

    const inheritedValues = await this.resolveInheritedAllowedValues(
      attribute.getId().value,
      verticalAttribute.id
    );

    const allowedRefs =
      input.allowedValueRefs ??
      (await this.categoryAttributeRepository.listSubsetLinks(existing.id));
    const selectedInherited = this.resolveSelectedInheritedValues(
      inheritedValues,
      allowedRefs
    );

    const additionalValues =
      input.additionalAllowedValues ??
      (await this.categoryAllowedValueRepository.listByCategoryAttribute(existing.id));

    this.ensureAdditionalConflicts(selectedInherited, additionalValues);

    const defaultValueScope = this.resolveDefaultValueScope(
      input.defaultValueId ?? existing.defaultValueId ?? null,
      selectedInherited,
      additionalValues,
      attribute.getType(),
      effectiveIsRequired,
      effectiveIsMultiValue
    );

    const categoryAttribute = CategoryAttribute.create({
      id: existing.id,
      categoryId: input.categoryId,
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

    await this.categoryAttributeRepository.update(categoryAttribute);
    await this.categoryAttributeRepository.deleteSubsetLinks(existing.id);
    await this.categoryAllowedValueRepository.deleteByCategoryAttribute(existing.id);

    if (allowedRefs.length > 0) {
      await this.categoryAttributeRepository.saveSubsetLinks(existing.id, allowedRefs);
    }

    if (additionalValues.length > 0) {
      const categoryAllowedValues = additionalValues.map((value) => {
        const payload = {
          categoryAttributeId: existing.id,
          name: value.name,
          value: value.value,
          description: value.description ?? null,
          minLength: effectiveMinValue,
          maxLength: effectiveMaxValue,
        };

        return CategoryAllowedValue.create(
          value.id ? { ...payload, id: value.id } : payload
        );
      });

      await this.categoryAllowedValueRepository.saveAll(categoryAllowedValues);
    }

    return {
      id: categoryAttribute.getId().value,
      categoryId: categoryAttribute.getCategoryId(),
      attributeId: categoryAttribute.getAttributeId(),
      isRequired: categoryAttribute.getIsRequired(),
      isMultiValue: categoryAttribute.getIsMultiValue(),
      minValue: categoryAttribute.getMinValue(),
      maxValue: categoryAttribute.getMaxValue(),
      defaultValueId: categoryAttribute.getDefaultValueId(),
      defaultValueScope: categoryAttribute.getDefaultValueScope(),
      createdAt: categoryAttribute.getCreatedAt(),
      updatedAt: categoryAttribute.getUpdatedAt(),
    };
  }

  private async resolveInheritedAllowedValues(
    attributeId: string,
    verticalAttributeId: string
  ): Promise<InheritedAllowedValue[]> {
    const globalValues = await this.allowedValueRepository.listByAttribute(attributeId);
    const subsetIds = await this.verticalAttributeRepository.listSubsetLinks(verticalAttributeId);
    const verticalValues = await this.verticalAllowedValueRepository.listByVerticalAttribute(
      verticalAttributeId
    );

    const selectedGlobal =
      subsetIds.length > 0
        ? globalValues.filter((value) => subsetIds.includes(value.id))
        : globalValues;

    return [
      ...selectedGlobal.map((value) => ({ ...value, scope: 'ATTRIBUTE' as const })),
      ...verticalValues.map((value) => ({ ...value, scope: 'VERTICAL' as const })),
    ];
  }

  private resolveSelectedInheritedValues(
    inheritedValues: InheritedAllowedValue[],
    allowedRefs: UpdateCategoryAttributeInput['allowedValueRefs']
  ): InheritedAllowedValue[] {
    if (!allowedRefs || allowedRefs.length === 0) {
      return inheritedValues;
    }

    const inheritedMap = new Map(
      inheritedValues.map((value) => [`${value.scope}:${value.id}`, value])
    );

    const selected: InheritedAllowedValue[] = [];
    for (const ref of allowedRefs) {
      const key = `${ref.sourceScope}:${ref.sourceValueId}`;
      const value = inheritedMap.get(key);
      if (!value) {
        throw new AllowedValueNotFoundError(ref.sourceValueId);
      }
      selected.push(value);
    }

    return selected;
  }

  private ensureAdditionalConflicts(
    inheritedValues: InheritedAllowedValue[],
    additionalValues: UpdateCategoryAttributeInput['additionalAllowedValues']
  ): void {
    const inheritedNameRegistry = new Set(
      inheritedValues.map((value) => value.name.trim().toLowerCase())
    );
    const inheritedValueRegistry = new Set(
      inheritedValues.map((value) => value.value.trim().toLowerCase())
    );

    const additionalNameRegistry = new Set<string>();
    const additionalValueRegistry = new Set<string>();

    for (const additional of additionalValues ?? []) {
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
  }

  private resolveDefaultValueScope(
    defaultValueId: string | null,
    inheritedValues: InheritedAllowedValue[],
    additionalValues: UpdateCategoryAttributeInput['additionalAllowedValues'],
    attributeType: string,
    isRequired: boolean,
    isMultiValue: boolean
  ): CategoryDefaultValueScope | null {
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
      return 'CATEGORY';
    }

    const inheritedMatch = inheritedValues.find((value) => value.id === defaultValueId);
    if (inheritedMatch) {
      return inheritedMatch.scope;
    }

    throw new DefaultValueNotFoundError(defaultValueId);
  }
}
