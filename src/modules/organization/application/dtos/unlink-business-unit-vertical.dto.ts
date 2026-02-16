export interface UnlinkBusinessUnitVerticalInput {
  businessUnitId: string;
  verticalCode: string;
  actorUserId: string;
}

export interface UnlinkBusinessUnitVerticalOutput {
  businessUnitId: string;
  organizationId: string;
  verticalCode: string;
  status: string;
}
