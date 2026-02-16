import { GetAttributeInput, GetAttributeOutput } from '../dtos/get-attribute.dto';
import { AttributeNotFoundError } from '../../domain/errors/attribute-lookup.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';

export class GetAttributeService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  async execute(input: GetAttributeInput): Promise<GetAttributeOutput> {
    const attribute = await this.attributeRepository.findById(input.attributeId);
    if (!attribute) {
      throw new AttributeNotFoundError(input.attributeId);
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
      defaultValueId: attribute.getDefaultValueId(),
      createdAt: attribute.getCreatedAt(),
      updatedAt: attribute.getUpdatedAt(),
    };
  }
}
