import { AttributeTypeValue } from '../../domain/entities/attribute.entity';

export interface GetAttributeInput {
  attributeId: string;
}

export interface GetAttributeOutput {
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
