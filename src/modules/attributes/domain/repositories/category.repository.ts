import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  existsByNameAndVerticalId(name: string, verticalId: string): Promise<boolean>;
  existsByCodeAndVerticalId(code: string, verticalId: string): Promise<boolean>;
  findById(id: string): Promise<Category | null>;
  getAncestry(id: string): Promise<Category[]>;
  getInheritanceChain(id: string): Promise<Category[]>;
  validateChain(verticalId: string, categoryIds: string[]): Promise<void>;
}
