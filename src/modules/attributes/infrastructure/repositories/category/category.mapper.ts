import { Category } from '../../../domain/entities/category.entity';

export class CategoryMapper {
  static toPersistence(category: Category) {
    return {
      id: category.getId().value,
      verticalId: category.getVerticalId(),
      parentCategoryId: category.getParentCategoryId(),
      name: category.getName(),
      code: category.getCode(),
      description: category.getDescription(),
      depth: category.getDepth(),
      createdAt: category.getCreatedAt(),
      updatedAt: category.getUpdatedAt(),
    };
  }
}
