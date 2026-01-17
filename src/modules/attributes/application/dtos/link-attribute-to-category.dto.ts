export interface LinkAttributeToCategoryAllowedValueRef {
  sourceScope: 'ATTRIBUTE' | 'VERTICAL' | 'CATEGORY';
  sourceValueId: string;
}

export interface LinkAttributeToCategoryAllowedValueInput {
  id?: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface LinkAttributeToCategoryInput {
  categoryId: string;
  attributeId: string;
  isRequired?: boolean | null;
  isMultiValue?: boolean | null;
  minValue?: number | null;
  maxValue?: number | null;
  defaultValueId?: string | null;
  allowedValueRefs?: LinkAttributeToCategoryAllowedValueRef[];
  additionalAllowedValues?: LinkAttributeToCategoryAllowedValueInput[];
}

export interface LinkAttributeToCategoryOutput {
  id: string;
  categoryId: string;
  attributeId: string;
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: string | null;
  createdAt: Date;
}
