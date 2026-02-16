import {
  ListCategoryAttributesInput,
  ListCategoryAttributesOutput,
} from '../dtos/list-category-attributes.dto';
import { CategoryNotFoundError } from '../../domain/errors/category-attribute.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { CategoryAttributeRepository } from '../../domain/repositories/category-attribute.repository';
import { CategoryAllowedValueRepository } from '../../domain/repositories/category-allowed-value.repository';

export class ListCategoryAttributesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly categoryAttributeRepository: CategoryAttributeRepository,
    private readonly categoryAllowedValueRepository: CategoryAllowedValueRepository
  ) {}

  async execute(input: ListCategoryAttributesInput): Promise<ListCategoryAttributesOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }

    const links = await this.categoryAttributeRepository.listByCategories([input.categoryId]);
    if (links.length === 0) {
      return { items: [] };
    }

    const attributes = await this.attributeRepository.findByIds(
      links.map((link) => link.attributeId)
    );
    const attributeById = new Map(
      attributes.map((attribute) => [attribute.getId().value, attribute])
    );

    const ancestry = await this.categoryRepository.getInheritanceChain(input.categoryId);
    const categoryChain = [
      ...ancestry.map((ancestor) => ancestor.getId().value).reverse(),
      input.categoryId,
    ];

    const items = await Promise.all(
      links.map(async (link) => {
        const attribute = attributeById.get(link.attributeId);
        if (!attribute) {
          return null;
        }

        const allowedValueRefs = await this.categoryAttributeRepository.listSubsetLinks(link.id);
        const additionalAllowedValues =
          await this.categoryAllowedValueRepository.listByCategoryAttribute(link.id);

        const override = {
          isRequired: link.isRequired ?? null,
          isMultiValue: link.isMultiValue ?? null,
          minValue: link.minValue ?? null,
          maxValue: link.maxValue ?? null,
          defaultValueId: link.defaultValueId ?? null,
          defaultValueScope: link.defaultValueScope ?? null,
          allowedValueRefs,
          additionalAllowedValues: additionalAllowedValues.map((value) => ({
            id: value.id,
            name: value.name,
            value: value.value,
            description: value.description ?? null,
          })),
        };

        const hasOverride =
          override.isRequired !== null ||
          override.isMultiValue !== null ||
          override.minValue !== null ||
          override.maxValue !== null ||
          override.defaultValueId !== null ||
          override.allowedValueRefs.length > 0 ||
          override.additionalAllowedValues.length > 0;

        return {
          id: link.id,
          categoryId: input.categoryId,
          verticalId: category.getVerticalId(),
          categoryChain,
          attributeId: link.attributeId,
          attribute: {
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
          hasOverride,
          override,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt ?? null,
        };
      })
    );

    return { items: items.filter((item) => item !== null) as ListCategoryAttributesOutput['items'] };
  }
}
