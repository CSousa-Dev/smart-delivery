import { ListCategoriesInput, ListCategoriesOutput } from '../dtos/list-categories.dto';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class ListCategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: ListCategoriesInput = {}): Promise<ListCategoriesOutput> {
    const categories = input.verticalId
      ? await this.categoryRepository.listByVerticalId(input.verticalId)
      : await this.categoryRepository.listAll();

    return {
      items: categories.map((category) => ({
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
      })),
    };
  }
}
