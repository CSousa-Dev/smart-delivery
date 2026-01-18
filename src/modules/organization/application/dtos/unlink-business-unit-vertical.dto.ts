export interface UnlinkBusinessUnitVerticalInput {
  businessUnitId: string;
  verticalId: string;
  actorUserId: string;
}

export interface UnlinkBusinessUnitVerticalOutput {
  businessUnitId: string;
  organizationId: string;
  verticalId: string;
  status: string;
}
