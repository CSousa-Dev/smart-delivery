export interface UnlinkOrganizationVerticalInput {
  organizationId: string;
  verticalId: string;
  actorUserId: string;
}

export interface UnlinkOrganizationVerticalOutput {
  organizationId: string;
  verticalId: string;
  status: string;
}
