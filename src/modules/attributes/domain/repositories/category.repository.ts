import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  update(category: Category): Promise<void>;
  existsByNameAndVerticalId(
    name: string,
    verticalId: string,
    parentCategoryId: string | null
  ): Promise<boolean>;
  existsByCodeAndVerticalId(
    code: string,
    verticalId: string,
    parentCategoryId: string | null
  ): Promise<boolean>;
  existsByNameExcludingId(
    name: string,
    verticalId: string,
    parentCategoryId: string | null,
    excludeId: string
  ): Promise<boolean>;
  existsByCodeExcludingId(
    code: string,
    verticalId: string,
    parentCategoryId: string | null,
    excludeId: string
  ): Promise<boolean>;
  findById(id: string): Promise<Category | null>;
  listAll(): Promise<Category[]>;
  listByVerticalId(verticalId: string): Promise<Category[]>;
  getAncestry(id: string): Promise<Category[]>;
  getInheritanceChain(id: string): Promise<Category[]>;
  validateChain(verticalId: string, categoryIds: string[]): Promise<void>;
}
