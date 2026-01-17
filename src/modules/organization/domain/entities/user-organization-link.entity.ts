import { randomUUID } from 'crypto';

export class OrganizationId {
  private constructor(public readonly value: string) {}

  static create(value?: string): OrganizationId {
    return new OrganizationId(value ?? randomUUID());
  }
}

export class UserOrganizationLink {
  private constructor(
    private readonly userId: string,
    private readonly organizationId: OrganizationId,
    private readonly isOwner: boolean,
    private readonly createdAt: Date
  ) {}

  static create(props: { userId: string; organizationId: string }): UserOrganizationLink {
    return new UserOrganizationLink(
      props.userId,
      OrganizationId.create(props.organizationId),
      false,
      new Date()
    );
  }

  static createOwner(props: { userId: string; organizationId: string }): UserOrganizationLink {
    return new UserOrganizationLink(
      props.userId,
      OrganizationId.create(props.organizationId),
      true,
      new Date()
    );
  }

  static restore(props: {
    userId: string;
    organizationId: string;
    isOwner: boolean;
    createdAt: Date;
  }): UserOrganizationLink {
    return new UserOrganizationLink(
      props.userId,
      OrganizationId.create(props.organizationId),
      props.isOwner,
      props.createdAt
    );
  }

  getUserId(): string {
    return this.userId;
  }

  getOrganizationId(): string {
    return this.organizationId.value;
  }

  getIsOwner(): boolean {
    return this.isOwner;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
