export interface CreateAllowedValueInput {
  attributeId: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface CreateAllowedValueOutput {
  id: string;
  attributeId: string;
  name: string;
  value: string;
  description: string | null;
  createdAt: Date;
}
