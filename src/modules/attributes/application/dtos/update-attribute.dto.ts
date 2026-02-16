import { AttributeTypeValue } from '../../domain/entities/attribute.entity';

export interface UpdateAttributeInput {
  attributeId: string;
  name: string;
  code: string;
  description: string;
  type: string;
  isMultiValue: boolean;
  isRequired: boolean;
  minValue?: number;
  maxValue?: number;
  defaultValueId?: string | null;
}

export interface UpdateAttributeOutput {
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
  updatedAt: Date | null;
}
