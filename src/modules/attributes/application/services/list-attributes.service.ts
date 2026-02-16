import { ListAttributesInput, ListAttributesOutput } from '../dtos/list-attributes.dto';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';

export class ListAttributesService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  async execute(input: ListAttributesInput = {}): Promise<ListAttributesOutput> {
    const attributes = await this.attributeRepository.listGlobal(
      input.limit,
      input.offset
    );

    return {
      items: attributes.map((attribute) => ({
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
      })),
    };
  }
}
