import { UnlinkAttributeFromCategoryInput } from '../dtos/unlink-attribute-from-category.dto';
import { CategoryAttributeNotFoundError } from '../../domain/errors/category-attribute.errors';
import { CategoryAttributeRepository } from '../../domain/repositories/category-attribute.repository';
import { CategoryAllowedValueRepository } from '../../domain/repositories/category-allowed-value.repository';

export class UnlinkAttributeFromCategoryService {
  constructor(
    private readonly categoryAttributeRepository: CategoryAttributeRepository,
    private readonly categoryAllowedValueRepository: CategoryAllowedValueRepository
  ) {}

  async execute(input: UnlinkAttributeFromCategoryInput): Promise<void> {
    const existing = await this.categoryAttributeRepository.findByCategoryAndAttribute(
      input.categoryId,
      input.attributeId
    );
    if (!existing) {
      throw new CategoryAttributeNotFoundError(input.categoryId, input.attributeId);
    }

    await this.categoryAttributeRepository.deleteSubsetLinks(existing.id);
    await this.categoryAllowedValueRepository.deleteByCategoryAttribute(existing.id);
    await this.categoryAttributeRepository.delete(input.categoryId, input.attributeId);
  }
}
