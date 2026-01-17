import { VerticalAttribute } from '../../../domain/entities/vertical-attribute.entity';

export class VerticalAttributeMapper {
  static toPersistence(verticalAttribute: VerticalAttribute) {
    return {
      id: verticalAttribute.getId().value,
      verticalId: verticalAttribute.getVerticalId(),
      attributeId: verticalAttribute.getAttributeId(),
      isRequired: verticalAttribute.getIsRequired(),
      isMultiValue: verticalAttribute.getIsMultiValue(),
      minValue: verticalAttribute.getMinValue(),
      maxValue: verticalAttribute.getMaxValue(),
      defaultValueScope: verticalAttribute.getDefaultValueScope(),
      defaultValueId: verticalAttribute.getDefaultValueId(),
      createdAt: verticalAttribute.getCreatedAt(),
      updatedAt: verticalAttribute.getUpdatedAt(),
    };
  }
}
