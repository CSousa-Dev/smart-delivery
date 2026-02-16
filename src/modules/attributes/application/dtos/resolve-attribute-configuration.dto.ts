export interface ListResolvedAttributesInput {
  verticalId?: string;
  categoryIds?: string[];
  limit?: number;
  offset?: number;
}

export interface ResolvedAllowedValueOutput {
  id: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface ResolvedAttributeOutput {
  attributeId: string;
  name: string;
  code: string;
  description: string;
  type: string;
  isMultiValue: boolean;
  isRequired: boolean;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  allowedValues: ResolvedAllowedValueOutput[];
}

export interface ListResolvedAttributesOutput {
  items: ResolvedAttributeOutput[];
}

export interface GetResolvedAttributeInput {
  attributeId: string;
  verticalId?: string;
  categoryIds?: string[];
}

export interface GetResolvedAttributeOutput {
  item: ResolvedAttributeOutput;
}

export type AllowedValueScope = 'ATTRIBUTE' | 'VERTICAL' | 'CATEGORY';

export interface ResolvedAllowedValueWithScopeOutput extends ResolvedAllowedValueOutput {
  scope: AllowedValueScope;
}

export interface AttributeOverrideOutput {
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: string | null;
}

export interface CategoryOverrideDetail {
  categoryId: string;
  override: AttributeOverrideOutput;
}

export interface ResolvedAttributeCategoryOverridesOutput {
  categoryId: string;
  categoryChain: string[];
  resolved: ResolvedAttributeOutput;
  allowedValues: ResolvedAllowedValueWithScopeOutput[];
  overrides: {
    vertical: AttributeOverrideOutput;
    categories: CategoryOverrideDetail[];
  };
}

export interface GetResolvedAttributeWithCategoryOverridesOutput {
  item: ResolvedAttributeOutput;
  categories: ResolvedAttributeCategoryOverridesOutput[];
}
