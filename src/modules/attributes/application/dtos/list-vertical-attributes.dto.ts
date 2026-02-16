import { AttributeTypeValue } from '../../domain/entities/attribute.entity';

export interface ListVerticalAttributesInput {
  verticalId: string;
}

export interface VerticalAttributeOverrideOutput {
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: string | null;
  allowedValueIds: string[];
  additionalAllowedValues: Array<{
    id: string;
    name: string;
    value: string;
    description: string | null;
  }>;
}

export interface ListVerticalAttributesOutput {
  items: Array<{
    id: string;
    verticalId: string;
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
    override: VerticalAttributeOverrideOutput;
    createdAt: Date;
    updatedAt: Date | null;
  }>;
}
