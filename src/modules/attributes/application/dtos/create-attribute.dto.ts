import { AttributeTypeValue } from '../../domain/entities/attribute.entity';

export interface CreateAttributeAllowedValueInput {
  id?: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface CreateAttributeInput {
  name: string;
  code: string;
  description: string;
  type: string;
  isMultiValue: boolean;
  isRequired: boolean;
  minValue?: number;
  maxValue?: number;
  defaultValueId?: string | null;
  allowedValues?: CreateAttributeAllowedValueInput[];
}

export interface CreateAttributeOutput {
  id: string;
  name: string;
  code: string;
  description: string;
  type: AttributeTypeValue;
  isMultiValue: boolean;
  isRequired: boolean;
  minValue: number;
  maxValue: number;
  defaultValueId: string | null;
  createdAt: Date;
}
