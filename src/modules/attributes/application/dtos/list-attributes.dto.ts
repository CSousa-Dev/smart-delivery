import { AttributeTypeValue } from '../../domain/entities/attribute.entity';

export interface ListAttributesInput {
  limit?: number;
  offset?: number;
}

export interface ListAttributesOutput {
  items: Array<{
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
  }>;
}
