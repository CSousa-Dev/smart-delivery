import { InactivateCategoryInput } from '../dtos/inactivate-category.dto';
import { CategoryNotFoundError } from '../../domain/errors/category.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class InactivateCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: InactivateCategoryInput): Promise<void> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }

    category.inactivate();
    await this.categoryRepository.update(category);
  }
}
