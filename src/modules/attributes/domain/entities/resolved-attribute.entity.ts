export interface ResolvedAllowedValue {
  id: string;
  name: string;
  value: string;
  description?: string | null;
}

export class ResolvedAttribute {
  constructor(
    public readonly attributeId: string,
    public readonly name: string,
    public readonly code: string,
    public readonly description: string,
    public readonly type: string,
    public readonly isMultiValue: boolean,
    public readonly isRequired: boolean,
    public readonly minValue: number | null,
    public readonly maxValue: number | null,
    public readonly defaultValueId: string | null,
    public readonly allowedValues: ResolvedAllowedValue[]
  ) {}
}
