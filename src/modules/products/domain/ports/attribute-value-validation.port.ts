export interface AttributeValueValidationPort {
  validate(input: {
    categoryId: string;
    verticalId: string;
    attributes: Array<{
      attributeId: string;
      value: string;
    }>;
  }): Promise<{
    isValid: boolean;
    errors: Array<{
      attributeId: string;
      reason: string;
      value?: string | number | boolean | null;
    }>;
  }>;
}
