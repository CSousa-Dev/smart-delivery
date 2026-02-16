import { GetCategoryInput, GetCategoryOutput } from '../dtos/get-category.dto';
import { CategoryNotFoundError } from '../../domain/errors/category.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class GetCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }

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
}
