import {
  GetResolvedAttributeInput,
  GetResolvedAttributeOutput,
  ListResolvedAttributesInput,
  ListResolvedAttributesOutput,
  ResolvedAttributeOutput,
} from '../dtos/resolve-attribute-configuration.dto';
import {
  AttributeResolutionService,
  ResolutionAllowedValue,
  ResolutionOverrideData,
} from '../../domain/services/attribute-resolution.service';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { VerticalAttributeRepository } from '../../domain/repositories/vertical-attribute.repository';
import { CategoryAttributeRepository } from '../../domain/repositories/category-attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';
import { VerticalAllowedValueRepository } from '../../domain/repositories/vertical-allowed-value.repository';
import { CategoryAllowedValueRepository } from '../../domain/repositories/category-allowed-value.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { AttributeNotFoundError } from '../../domain/errors/attribute-lookup.errors';
import {
  AttributeNotInVerticalError,
  InvalidCategoryChainError,
  NoAttributesForContextError,
} from '../../domain/errors/resolve.errors';
import { VerticalNotFoundError } from '../../domain/errors/category.errors';

export class ResolveAttributeConfigurationService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly verticalAttributeRepository: VerticalAttributeRepository,
    private readonly categoryAttributeRepository: CategoryAttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository,
    private readonly verticalAllowedValueRepository: VerticalAllowedValueRepository,
    private readonly categoryAllowedValueRepository: CategoryAllowedValueRepository,
    private readonly verticalRepository: VerticalRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly resolutionService: AttributeResolutionService
  ) {}

  async list(input: ListResolvedAttributesInput): Promise<ListResolvedAttributesOutput> {
    if (!input.verticalId && input.categoryIds && input.categoryIds.length > 0) {
      throw new InvalidCategoryChainError();
    }

    if (!input.verticalId) {
      const attributes = await this.attributeRepository.listGlobal(
        input.limit,
        input.offset
      );

      const items = await Promise.all(
        attributes.map((attribute) => this.resolveGlobalFromAttribute(attribute))
      );

      return { items };
    }

    const verticalId = input.verticalId;
    if (!(await this.verticalRepository.existsById(verticalId))) {
      throw new VerticalNotFoundError(verticalId);
    }

    if (input.categoryIds && input.categoryIds.length > 0) {
      await this.categoryRepository.validateChain(verticalId, input.categoryIds);
    }

    const verticalLinks = await this.verticalAttributeRepository.listByVertical(verticalId);
    if (verticalLinks.length === 0) {
      throw new NoAttributesForContextError();
    }

    const attributeIds = verticalLinks.map((link) => link.attributeId);
    const attributes = await this.attributeRepository.findByIds(attributeIds);
    if (attributes.length === 0) {
      throw new NoAttributesForContextError();
    }

    const categoryLinks = await this.categoryAttributeRepository.listByCategories(
      input.categoryIds ?? []
    );

    const items = await Promise.all(
      attributes.map((attribute) =>
        this.resolveForContext(
          attribute,
          verticalLinks,
          categoryLinks,
          input.categoryIds ?? [],
          verticalId
        )
      )
    );

    return { items: items.sort((a, b) => a.code.localeCompare(b.code)) };
  }

  async get(input: GetResolvedAttributeInput): Promise<GetResolvedAttributeOutput> {
    const attribute = await this.attributeRepository.findById(input.attributeId);
    if (!attribute) {
      throw new AttributeNotFoundError(input.attributeId);
    }

    if (!input.verticalId) {
      return { item: await this.resolveGlobal(attribute.getId().value) };
    }

    const verticalId = input.verticalId;
    if (!(await this.verticalRepository.existsById(verticalId))) {
      throw new VerticalNotFoundError(verticalId);
    }

    if (input.categoryIds && input.categoryIds.length > 0) {
      await this.categoryRepository.validateChain(verticalId, input.categoryIds);
    }

    const verticalLink = await this.verticalAttributeRepository.findByVerticalAndAttribute(
      verticalId,
      input.attributeId
    );
    if (!verticalLink) {
      throw new AttributeNotInVerticalError(input.attributeId, input.verticalId);
    }

    const categoryLinks = await this.categoryAttributeRepository.listByCategories(
      input.categoryIds ?? []
    );

    const item = await this.resolveForContext(
      attribute,
      [{ ...verticalLink, attributeId: input.attributeId }],
      categoryLinks,
      input.categoryIds ?? [],
      verticalId
    );

    return { item };
  }

  private async resolveGlobal(attributeId: string): Promise<ResolvedAttributeOutput> {
    const attribute = await this.attributeRepository.findById(attributeId);
    if (!attribute) {
      throw new AttributeNotFoundError(attributeId);
    }

    return this.resolveGlobalFromAttribute(attribute);
  }

  private async resolveGlobalFromAttribute(
    attribute: {
      getId: () => { value: string };
      getName: () => string;
      getCode: () => string;
      getDescription: () => string;
      getType: () => string;
      getIsRequired: () => boolean;
      getIsMultiValue: () => boolean;
      getMinValue: () => number;
      getMaxValue: () => number;
      getDefaultValueId: () => string | null;
    }
  ): Promise<ResolvedAttributeOutput> {
    const attributeId = attribute.getId().value;
    const allowedValues =
      attribute.getType() === 'option'
        ? await this.allowedValueRepository.listByAttribute(attributeId)
        : [];

    const resolved = this.resolutionService.resolve(
      {
        id: attributeId,
        name: attribute.getName(),
        code: attribute.getCode(),
        description: attribute.getDescription(),
        type: attribute.getType(),
        isRequired: attribute.getIsRequired(),
        isMultiValue: attribute.getIsMultiValue(),
        minValue: attribute.getMinValue(),
        maxValue: attribute.getMaxValue(),
        defaultValueId: attribute.getDefaultValueId(),
      },
      null,
      [],
      allowedValues.map((value) => ({ ...value, scope: 'ATTRIBUTE' as const }))
    );

    return this.toOutput(resolved);
  }

  private async resolveForContext(
    attribute: {
      getId: () => { value: string };
      getName: () => string;
      getCode: () => string;
      getDescription: () => string;
      getType: () => string;
      getIsRequired: () => boolean;
      getIsMultiValue: () => boolean;
      getMinValue: () => number;
      getMaxValue: () => number;
      getDefaultValueId: () => string | null;
    },
    verticalLinks: Array<{
      id: string;
      attributeId: string;
      isRequired: boolean | null;
      isMultiValue: boolean | null;
      minValue: number | null;
      maxValue: number | null;
      defaultValueId: string | null;
      defaultValueScope: string | null;
    }>,
    categoryLinks: Array<{
      id: string;
      categoryId: string;
      attributeId: string;
      isRequired: boolean | null;
      isMultiValue: boolean | null;
      minValue: number | null;
      maxValue: number | null;
      defaultValueId: string | null;
      defaultValueScope: string | null;
    }>,
    categoryIds: string[],
    verticalId: string
  ): Promise<ResolvedAttributeOutput> {
    const verticalLink = verticalLinks.find((link) => link.attributeId === attribute.getId().value);
    if (!verticalLink) {
      throw new AttributeNotInVerticalError(attribute.getId().value, verticalId);
    }

    const categoryOverrides: ResolutionOverrideData[] = [];
    if (categoryIds.length > 0) {
      const byCategory = new Map(
        categoryLinks
          .filter((link) => link.attributeId === attribute.getId().value)
          .map((link) => [link.categoryId, link])
      );

      for (let index = categoryIds.length - 1; index >= 0; index -= 1) {
        const categoryId = categoryIds[index];
        if (!categoryId) {
          continue;
        }
        const link = byCategory.get(categoryId);
        if (link) {
          categoryOverrides.push({
            isRequired: link.isRequired ?? null,
            isMultiValue: link.isMultiValue ?? null,
            minValue: link.minValue ?? null,
            maxValue: link.maxValue ?? null,
            defaultValueId: link.defaultValueId ?? null,
            defaultValueScope: link.defaultValueScope ?? null,
          });
        }
      }
    }

    const allowedValues = await this.resolveAllowedValues(
      attribute.getId().value,
      verticalLink,
      categoryIds,
      categoryLinks
    );

    const resolved = this.resolutionService.resolve(
      {
        id: attribute.getId().value,
        name: attribute.getName(),
        code: attribute.getCode(),
        description: attribute.getDescription(),
        type: attribute.getType(),
        isRequired: attribute.getIsRequired(),
        isMultiValue: attribute.getIsMultiValue(),
        minValue: attribute.getMinValue(),
        maxValue: attribute.getMaxValue(),
        defaultValueId: attribute.getDefaultValueId(),
      },
      verticalLink
        ? {
            isRequired: verticalLink.isRequired ?? null,
            isMultiValue: verticalLink.isMultiValue ?? null,
            minValue: verticalLink.minValue ?? null,
            maxValue: verticalLink.maxValue ?? null,
            defaultValueId: verticalLink.defaultValueId ?? null,
            defaultValueScope: verticalLink.defaultValueScope ?? null,
          }
        : null,
      categoryOverrides,
      allowedValues
    );

    return this.toOutput(resolved);
  }

  private async resolveAllowedValues(
    attributeId: string,
    verticalLink: { id: string },
    categoryIds: string[],
    categoryLinks: Array<{
      id: string;
      categoryId: string;
      attributeId: string;
    }>
  ): Promise<ResolutionAllowedValue[]> {
    const globalValues = await this.allowedValueRepository.listByAttribute(attributeId);
    const subsetIds = await this.verticalAttributeRepository.listSubsetLinks(verticalLink.id);
    const verticalAdditional = await this.verticalAllowedValueRepository.listByVerticalAttribute(
      verticalLink.id
    );

    const selectedGlobal =
      subsetIds.length > 0
        ? globalValues.filter((value) => subsetIds.includes(value.id))
        : globalValues;

    let effective: ResolutionAllowedValue[] = [
      ...selectedGlobal.map((value) => ({ ...value, scope: 'ATTRIBUTE' as const })),
      ...verticalAdditional.map((value) => ({ ...value, scope: 'VERTICAL' as const })),
    ];

    if (categoryIds.length === 0) {
      return effective;
    }

    const byCategory = new Map(
      categoryLinks
        .filter((link) => link.attributeId === attributeId)
        .map((link) => [link.categoryId, link])
    );

    for (const categoryId of categoryIds) {
      const link = byCategory.get(categoryId);
      if (!link) {
        continue;
      }

      const subsetRefs = await this.categoryAttributeRepository.listSubsetLinks(link.id);
      if (subsetRefs.length > 0) {
        const keys = new Set(
          subsetRefs.map((ref) => `${ref.sourceScope}:${ref.sourceValueId}`)
        );
        effective = effective.filter((value) => keys.has(`${value.scope}:${value.id}`));
      }

      const additions = await this.categoryAllowedValueRepository.listByCategoryAttribute(
        link.id
      );
      effective = [
        ...effective,
        ...additions.map((value) => ({ ...value, scope: 'CATEGORY' as const })),
      ];
    }

    return effective;
  }

  private toOutput(
    resolved: import('../../domain/entities/resolved-attribute.entity').ResolvedAttribute
  ): ResolvedAttributeOutput {
    return {
      attributeId: resolved.attributeId,
      name: resolved.name,
      code: resolved.code,
      description: resolved.description,
      type: resolved.type,
      isMultiValue: resolved.isMultiValue,
      isRequired: resolved.isRequired,
      minValue: resolved.minValue,
      maxValue: resolved.maxValue,
      defaultValueId: resolved.defaultValueId,
      allowedValues: resolved.allowedValues,
    };
  }
}
