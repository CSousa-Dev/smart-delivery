import { UpdateCategoryInput, UpdateCategoryOutput } from '../dtos/update-category.dto';
import {
  CategoryCodeAlreadyExistsError,
  CategoryNameAlreadyExistsError,
  CategoryNotFoundError,
  InvalidCategoryHierarchyError,
  ParentCategoryNotFoundError,
} from '../../domain/errors/category.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryHierarchyService } from '../../domain/services/category-hierarchy.service';
import { Category } from '../../domain/entities/category.entity';

export class UpdateCategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly hierarchyService: CategoryHierarchyService
  ) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }

    const name = input.name.trim();
    const description = input.description.trim();
    const code = input.code;
    const verticalId = category.getVerticalId();

    const parentCategoryId =
      input.parentCategoryId !== undefined
        ? input.parentCategoryId ?? null
        : category.getParentCategoryId();

    if (parentCategoryId === category.getId().value) {
      throw new InvalidCategoryHierarchyError();
    }

    if (
      await this.categoryRepository.existsByNameExcludingId(
        name,
        verticalId,
        parentCategoryId,
        category.getId().value
      )
    ) {
      throw new CategoryNameAlreadyExistsError(name);
    }

    if (
      await this.categoryRepository.existsByCodeExcludingId(
        code,
        verticalId,
        parentCategoryId,
        category.getId().value
      )
    ) {
      throw new CategoryCodeAlreadyExistsError(code);
    }

    let depth = category.getDepth();
    if (input.parentCategoryId !== undefined && !parentCategoryId) {
      depth = 1;
    }

    if (parentCategoryId) {
      const parent = await this.categoryRepository.findById(parentCategoryId);
      if (!parent) {
        throw new ParentCategoryNotFoundError(parentCategoryId);
      }

      this.hierarchyService.validateParent(
        {
          id: parent.getId().value,
          verticalId: parent.getVerticalId(),
          parentCategoryId: parent.getParentCategoryId(),
          depth: parent.getDepth(),
        },
        verticalId
      );

      const ancestors = await this.categoryRepository.getAncestry(parentCategoryId);
      depth = this.hierarchyService.validateHierarchy(
        {
          id: parent.getId().value,
          verticalId: parent.getVerticalId(),
          parentCategoryId: parent.getParentCategoryId(),
          depth: parent.getDepth(),
        },
        ancestors.map((ancestor) => ({
          id: ancestor.getId().value,
          verticalId: ancestor.getVerticalId(),
          parentCategoryId: ancestor.getParentCategoryId(),
          depth: ancestor.getDepth(),
        })),
        category.getId().value
      );
    }

    category.updateDetails(name, code, description, parentCategoryId, depth);
    await this.categoryRepository.update(category);

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
