export interface UpdateAllowedValueInput {
  allowedValueId: string;
  name: string;
  value: string;
  description?: string | null;
}

export interface UpdateAllowedValueOutput {
  id: string;
  attributeId: string;
  name: string;
  value: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
