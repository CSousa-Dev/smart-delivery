export interface LinkBusinessUnitVerticalInput {
  businessUnitId: string;
  verticalId: string;
  actorUserId: string;
}

export interface LinkBusinessUnitVerticalOutput {
  businessUnitId: string;
  organizationId: string;
  verticalId: string;
  status: string;
}
