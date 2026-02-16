export interface LinkBusinessUnitVerticalInput {
  businessUnitId: string;
  verticalCode: string;
  actorUserId: string;
}

export interface LinkBusinessUnitVerticalOutput {
  businessUnitId: string;
  organizationId: string;
  verticalCode: string;
  status: string;
}
