import { CreateCategoryInput, CreateCategoryOutput } from '../dtos/create-category.dto';
import { Category } from '../../domain/entities/category.entity';
import { CategoryHierarchyService } from '../../domain/services/category-hierarchy.service';
import {
  CategoryCodeAlreadyExistsError,
  CategoryNameAlreadyExistsError,
  ParentCategoryNotFoundError,
  VerticalNotFoundError,
} from '../../domain/errors/category.errors';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class CreateCategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly verticalRepository: VerticalRepository,
    private readonly hierarchyService: CategoryHierarchyService
  ) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const name = input.name.trim();
    const description = input.description.trim();
    const code = input.code;

    const verticalExists = await this.verticalRepository.existsById(
      input.verticalId
    );
    if (!verticalExists) {
      throw new VerticalNotFoundError(input.verticalId);
    }

    if (await this.categoryRepository.existsByNameAndVerticalId(name, input.verticalId)) {
      throw new CategoryNameAlreadyExistsError(name);
    }

    if (await this.categoryRepository.existsByCodeAndVerticalId(code, input.verticalId)) {
      throw new CategoryCodeAlreadyExistsError(code);
    }

    let depth = 1;
    let parentCategoryId: string | null = input.parentCategoryId ?? null;

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
        input.verticalId
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
        }))
      );
    }

    const category = Category.create({
      verticalId: input.verticalId,
      parentCategoryId,
      name,
      code,
      description,
      depth,
    });

    await this.categoryRepository.save(category);

    return {
      id: category.getId().value,
      verticalId: category.getVerticalId(),
      parentCategoryId: category.getParentCategoryId(),
      name: category.getName(),
      code: category.getCode(),
      description: category.getDescription(),
      depth: category.getDepth(),
      createdAt: category.getCreatedAt(),
    };
  }
}
