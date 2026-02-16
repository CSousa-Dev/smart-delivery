import { AttributeTypeValue } from '../../domain/entities/attribute.entity';
import { CategoryAllowedValueLinkInput } from '../../domain/repositories/category-attribute.repository';

export interface ListCategoryAttributesInput {
  categoryId: string;
}

export interface CategoryAttributeOverrideOutput {
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: string | null;
  allowedValueRefs: CategoryAllowedValueLinkInput[];
  additionalAllowedValues: Array<{
    id: string;
    name: string;
    value: string;
    description: string | null;
  }>;
}

export interface ListCategoryAttributesOutput {
  items: Array<{
    id: string;
    categoryId: string;
    verticalId: string;
    categoryChain: string[];
    attributeId: string;
    attribute: {
      name: string;
      code: string;
      description: string;
      type: AttributeTypeValue;
      isRequired: boolean;
      isMultiValue: boolean;
      minValue: number;
      maxValue: number;
      defaultValueId: string | null;
    };
    hasOverride: boolean;
    override: CategoryAttributeOverrideOutput;
    createdAt: Date;
    updatedAt: Date | null;
  }>;
}
