import { VerticalLinkStatus, VerticalLinkStatusValue } from './vertical-link-status';

export class OrganizationVerticalLink {
  private constructor(
    private readonly organizationId: string,
    private readonly verticalCode: string,
    private status: VerticalLinkStatus,
    private readonly createdAt: Date,
    private updatedAt: Date | null
  ) {}

  static create(props: { organizationId: string; verticalCode: string }): OrganizationVerticalLink {
    return new OrganizationVerticalLink(
      props.organizationId,
      props.verticalCode,
      VerticalLinkStatus.create('ACTIVE'),
      new Date(),
      null
    );
  }

  static restore(props: {
    organizationId: string;
    verticalCode: string;
    status: VerticalLinkStatusValue;
    createdAt: Date;
    updatedAt?: Date | null;
  }): OrganizationVerticalLink {
    return new OrganizationVerticalLink(
      props.organizationId,
      props.verticalCode,
      VerticalLinkStatus.create(props.status),
      props.createdAt,
      props.updatedAt ?? null
    );
  }

  getOrganizationId(): string {
    return this.organizationId;
  }

  getVerticalCode(): string {
    return this.verticalCode;
  }

  getStatus(): VerticalLinkStatusValue {
    return this.status.value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  updateStatus(status: VerticalLinkStatusValue, updatedAt?: Date): void {
    this.status = VerticalLinkStatus.create(status);
    this.updatedAt = updatedAt ?? new Date();
  }
}
