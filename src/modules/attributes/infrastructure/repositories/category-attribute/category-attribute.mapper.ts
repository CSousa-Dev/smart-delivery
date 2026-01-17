import { CategoryAttribute } from '../../../domain/entities/category-attribute.entity';

export class CategoryAttributeMapper {
  static toPersistence(categoryAttribute: CategoryAttribute) {
    return {
      id: categoryAttribute.getId().value,
      categoryId: categoryAttribute.getCategoryId(),
      attributeId: categoryAttribute.getAttributeId(),
      isRequired: categoryAttribute.getIsRequired(),
      isMultiValue: categoryAttribute.getIsMultiValue(),
      minValue: categoryAttribute.getMinValue(),
      maxValue: categoryAttribute.getMaxValue(),
      defaultValueScope: categoryAttribute.getDefaultValueScope(),
      defaultValueId: categoryAttribute.getDefaultValueId(),
      createdAt: categoryAttribute.getCreatedAt(),
      updatedAt: categoryAttribute.getUpdatedAt(),
    };
  }
}
