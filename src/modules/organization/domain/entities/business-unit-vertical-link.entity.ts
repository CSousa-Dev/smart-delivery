import { VerticalLinkStatus, VerticalLinkStatusValue } from './vertical-link-status';

export class BusinessUnitVerticalLink {
  private constructor(
    private readonly businessUnitId: string,
    private readonly organizationId: string,
    private readonly verticalCode: string,
    private status: VerticalLinkStatus,
    private readonly createdAt: Date,
    private updatedAt: Date | null
  ) {}

  static create(props: {
    businessUnitId: string;
    organizationId: string;
    verticalCode: string;
  }): BusinessUnitVerticalLink {
    return new BusinessUnitVerticalLink(
      props.businessUnitId,
      props.organizationId,
      props.verticalCode,
      VerticalLinkStatus.create('ACTIVE'),
      new Date(),
      null
    );
  }

  static restore(props: {
    businessUnitId: string;
    organizationId: string;
    verticalCode: string;
    status: VerticalLinkStatusValue;
    createdAt: Date;
    updatedAt?: Date | null;
  }): BusinessUnitVerticalLink {
    return new BusinessUnitVerticalLink(
      props.businessUnitId,
      props.organizationId,
      props.verticalCode,
      VerticalLinkStatus.create(props.status),
      props.createdAt,
      props.updatedAt ?? null
    );
  }

  getBusinessUnitId(): string {
    return this.businessUnitId;
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
