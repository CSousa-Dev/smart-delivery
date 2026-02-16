import { ActivateCategoryInput } from '../dtos/activate-category.dto';
import { CategoryNotFoundError } from '../../domain/errors/category.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class ActivateCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: ActivateCategoryInput): Promise<void> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }

    category.activate();
    await this.categoryRepository.update(category);
  }
}
