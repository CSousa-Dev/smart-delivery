import {
  ListVerticalAttributesInput,
  ListVerticalAttributesOutput,
} from '../dtos/list-vertical-attributes.dto';
import { VerticalNotFoundError } from '../../domain/errors/category.errors';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { VerticalAttributeRepository } from '../../domain/repositories/vertical-attribute.repository';
import { VerticalAllowedValueRepository } from '../../domain/repositories/vertical-allowed-value.repository';

export class ListVerticalAttributesService {
  constructor(
    private readonly verticalRepository: VerticalRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly verticalAttributeRepository: VerticalAttributeRepository,
    private readonly verticalAllowedValueRepository: VerticalAllowedValueRepository
  ) {}

  async execute(input: ListVerticalAttributesInput): Promise<ListVerticalAttributesOutput> {
    if (!(await this.verticalRepository.existsById(input.verticalId))) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    const links = await this.verticalAttributeRepository.listByVertical(input.verticalId);
    if (links.length === 0) {
      return { items: [] };
    }

    const attributes = await this.attributeRepository.findByIds(
      links.map((link) => link.attributeId)
    );
    const attributeById = new Map(
      attributes.map((attribute) => [attribute.getId().value, attribute])
    );

    const items = await Promise.all(
      links.map(async (link) => {
        const attribute = attributeById.get(link.attributeId);
        if (!attribute) {
          return null;
        }

        const allowedValueIds = await this.verticalAttributeRepository.listSubsetLinks(link.id);
        const additionalAllowedValues =
          await this.verticalAllowedValueRepository.listByVerticalAttribute(link.id);

        const override = {
          isRequired: link.isRequired ?? null,
          isMultiValue: link.isMultiValue ?? null,
          minValue: link.minValue ?? null,
          maxValue: link.maxValue ?? null,
          defaultValueId: link.defaultValueId ?? null,
          defaultValueScope: link.defaultValueScope ?? null,
          allowedValueIds,
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
          override.allowedValueIds.length > 0 ||
          override.additionalAllowedValues.length > 0;

        return {
          id: link.id,
          verticalId: input.verticalId,
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

    return { items: items.filter((item) => item !== null) as ListVerticalAttributesOutput['items'] };
  }
}
