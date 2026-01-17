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
