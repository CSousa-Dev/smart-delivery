import { DefaultValueScope } from '../../domain/entities/vertical-attribute.entity';

export interface LinkAttributeToVerticalAllowedValueInput {
  id?: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface LinkAttributeToVerticalInput {
  verticalId: string;
  attributeId: string;
  isRequired?: boolean | null;
  isMultiValue?: boolean | null;
  minValue?: number | null;
  maxValue?: number | null;
  defaultValueId?: string | null;
  allowedValueIds?: string[];
  additionalAllowedValues?: LinkAttributeToVerticalAllowedValueInput[];
}

export interface LinkAttributeToVerticalOutput {
  id: string;
  verticalId: string;
  attributeId: string;
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: DefaultValueScope | null;
  createdAt: Date;
}
