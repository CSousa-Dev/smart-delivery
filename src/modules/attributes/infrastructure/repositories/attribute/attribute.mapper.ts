import { Attribute } from '../../../domain/entities/attribute.entity';

export class AttributeMapper {
  static toPersistence(attribute: Attribute) {
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
