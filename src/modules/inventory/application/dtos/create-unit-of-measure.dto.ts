export interface CreateUnitOfMeasureInput {
  organizationId: string;
  code: string;
  name: string;
  symbol: string;
  allowsFraction: boolean;
  createdBy: string;
}

export interface CreateUnitOfMeasureOutput {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  symbol: string;
  allowsFraction: boolean;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date | null;
}
