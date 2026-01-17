import { CategoryAttribute } from '../entities/category-attribute.entity';

export interface CategoryAllowedValueLinkInput {
  sourceScope: 'ATTRIBUTE' | 'VERTICAL' | 'CATEGORY';
  sourceValueId: string;
}

export interface CategoryAttributeRepository {
  save(categoryAttribute: CategoryAttribute): Promise<void>;
  existsByCategoryAndAttribute(categoryId: string, attributeId: string): Promise<boolean>;
  saveSubsetLinks(categoryAttributeId: string, links: CategoryAllowedValueLinkInput[]): Promise<void>;
  listByCategories(categoryIds: string[]): Promise<
    Array<{
      id: string;
      categoryId: string;
      attributeId: string;
      isRequired: boolean | null;
      isMultiValue: boolean | null;
      minValue: number | null;
      maxValue: number | null;
      defaultValueId: string | null;
      defaultValueScope: string | null;
    }>
  >;
  listSubsetLinks(categoryAttributeId: string): Promise<CategoryAllowedValueLinkInput[]>;
}
