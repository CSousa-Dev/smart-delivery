import { DefaultValueScope } from '../../domain/entities/vertical-attribute.entity';

export interface UpdateVerticalAttributeAllowedValueInput {
  id?: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface UpdateVerticalAttributeInput {
  verticalId: string;
  attributeId: string;
  isRequired?: boolean | null;
  isMultiValue?: boolean | null;
  minValue?: number | null;
  maxValue?: number | null;
  defaultValueId?: string | null;
  allowedValueIds?: string[];
  additionalAllowedValues?: UpdateVerticalAttributeAllowedValueInput[];
}

export interface UpdateVerticalAttributeOutput {
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
  updatedAt: Date | null;
}
