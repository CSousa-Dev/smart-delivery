export interface UpdateVerticalInput {
  verticalId: string;
  name: string;
  code: string;
  description: string;
}

export interface UpdateVerticalOutput {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
