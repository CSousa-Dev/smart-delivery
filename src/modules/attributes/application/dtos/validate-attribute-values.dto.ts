import { AttributeValueValidationItem } from '../../domain/entities/attribute-value-validation.entity';

export interface ValidateAttributeValuesInput {
  verticalId?: string;
  categoryIds?: string[];
  items: AttributeValueValidationItem[];
}

export interface ValidateAttributeValuesOutput {
  isValid: boolean;
  errors: Array<{
    attributeId: string;
    reason: string;
    value?: string | number | boolean | null;
  }>;
}
