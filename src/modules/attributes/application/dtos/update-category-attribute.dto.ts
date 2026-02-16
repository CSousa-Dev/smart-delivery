import { CategoryDefaultValueScope } from '../../domain/entities/category-attribute.entity';
import { CategoryAllowedValueLinkInput } from '../../domain/repositories/category-attribute.repository';

export interface UpdateCategoryAttributeAllowedValueInput {
  id?: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface UpdateCategoryAttributeInput {
  categoryId: string;
  attributeId: string;
  isRequired?: boolean | null;
  isMultiValue?: boolean | null;
  minValue?: number | null;
  maxValue?: number | null;
  defaultValueId?: string | null;
  allowedValueRefs?: CategoryAllowedValueLinkInput[];
  additionalAllowedValues?: UpdateCategoryAttributeAllowedValueInput[];
}

export interface UpdateCategoryAttributeOutput {
  id: string;
  categoryId: string;
  attributeId: string;
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: CategoryDefaultValueScope | null;
  createdAt: Date;
  updatedAt: Date | null;
}
