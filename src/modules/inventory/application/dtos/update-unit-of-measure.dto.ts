export interface UpdateUnitOfMeasureInput {
  unitOfMeasureId: string;
  name?: string;
  status?: string;
  updatedBy: string;
}

export interface UpdateUnitOfMeasureOutput {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  symbol: string;
  allowsFraction: boolean;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string | null;
  updatedAt: Date | null;
}
