export interface GetVerticalInput {
  verticalId: string;
}

export interface GetVerticalOutput {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
