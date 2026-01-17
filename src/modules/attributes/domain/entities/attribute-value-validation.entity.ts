export interface AttributeValueValidationItem {
  attributeId: string;
  value?: string | number | boolean | null;
  values?: Array<string | number | boolean>;
  allowedValueId?: string | null;
  allowedValueIds?: string[];
}

export interface AttributeValueValidationError {
  attributeId: string;
  reason: string;
  value?: string | number | boolean | null;
}

export class AttributeValueValidationResult {
  constructor(
    public readonly isValid: boolean,
    public readonly errors: AttributeValueValidationError[]
  ) {}

  static build(errors: AttributeValueValidationError[]): AttributeValueValidationResult {
    return new AttributeValueValidationResult(errors.length === 0, errors);
  }
}
