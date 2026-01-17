import { CategoryAllowedValue } from '../../../domain/entities/category-allowed-value.entity';

export class CategoryAllowedValueMapper {
  static toPersistence(value: CategoryAllowedValue) {
    const name = value.getName();
    const rawValue = value.getValue();

    return {
      id: value.getId().value,
      categoryAttributeId: value.getCategoryAttributeId(),
      name,
      value: rawValue,
      nameNormalized: name.toLowerCase(),
      valueNormalized: rawValue.toLowerCase(),
      description: value.getDescription(),
      createdAt: value.getCreatedAt(),
      updatedAt: value.getUpdatedAt(),
    };
  }
}
