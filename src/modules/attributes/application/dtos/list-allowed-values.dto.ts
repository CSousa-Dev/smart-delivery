export interface ListAllowedValuesInput {
  attributeId: string;
}

export interface ListAllowedValuesOutput {
  items: Array<{
    id: string;
    attributeId: string;
    name: string;
    value: string;
    description: string | null;
  }>;
}
