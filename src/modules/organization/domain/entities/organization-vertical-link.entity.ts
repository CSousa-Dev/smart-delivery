export class OrganizationVerticalLink {
  private constructor(
    private readonly organizationId: string,
    private readonly verticalId: string,
    private readonly createdAt: Date
  ) {}

  static create(props: { organizationId: string; verticalId: string }): OrganizationVerticalLink {
    return new OrganizationVerticalLink(props.organizationId, props.verticalId, new Date());
  }

  static restore(props: {
    organizationId: string;
    verticalId: string;
    createdAt: Date;
  }): OrganizationVerticalLink {
    return new OrganizationVerticalLink(props.organizationId, props.verticalId, props.createdAt);
  }

  getOrganizationId(): string {
    return this.organizationId;
  }

  getVerticalId(): string {
    return this.verticalId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
