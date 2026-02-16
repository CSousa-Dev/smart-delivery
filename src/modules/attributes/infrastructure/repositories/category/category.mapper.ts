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
      isActive: category.getIsActive(),
      createdAt: category.getCreatedAt(),
      updatedAt: category.getUpdatedAt(),
    };
  }

  static toDomain(raw: {
    id: string;
    verticalId: string;
    parentCategoryId: string | null;
    name: string;
    code: string;
    description: string;
    depth: number;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }): Category {
    return Category.create({
      id: raw.id,
      verticalId: raw.verticalId,
      parentCategoryId: raw.parentCategoryId,
      name: raw.name,
      code: raw.code,
      description: raw.description,
      depth: raw.depth,
      isActive: raw.isActive ?? true,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
