export interface LinkOrganizationVerticalInput {
  organizationId: string;
  verticalId: string;
  actorUserId: string;
}

export interface LinkOrganizationVerticalOutput {
  organizationId: string;
  verticalId: string;
  status: string;
}
