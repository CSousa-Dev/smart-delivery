export interface GetAllowedValueInput {
  allowedValueId: string;
}

export interface GetAllowedValueOutput {
  id: string;
  attributeId: string;
  name: string;
  value: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
