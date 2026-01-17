import { randomUUID } from 'crypto';
import { MissingLegalNameError } from '../errors/organization.errors';
import { DocumentNumber, DocumentType } from './user.entity';

export type OrganizationStatusValue = 'PENDING_BUSINESS_UNIT' | 'ACTIVE';

export class OrganizationId {
  private constructor(public readonly value: string) {}

  static create(value?: string): OrganizationId {
    return new OrganizationId(value ?? randomUUID());
  }

  static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  }
}

export class VerticalId {
  private constructor(public readonly value: string) {}

  static create(value: string): VerticalId {
    return new VerticalId(value);
  }
}

export class OrganizationStatus {
  private constructor(public readonly value: OrganizationStatusValue) {}

  static create(value: OrganizationStatusValue): OrganizationStatus {
    return new OrganizationStatus(value);
  }
}

export interface CreateOrganizationProps {
  id?: string;
  tradeName: string;
  legalName?: string | null;
  documentType: string;
  documentNumber: string;
  ownerUserId: string;
  verticalIds: string[];
  status: OrganizationStatusValue;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Organization {
  private constructor(
    private readonly id: OrganizationId,
    private readonly tradeName: string,
    private readonly legalName: string | null,
    private readonly documentType: DocumentType,
    private readonly documentNumber: DocumentNumber,
    private readonly ownerUserId: string,
    private readonly verticalIds: VerticalId[],
    private readonly status: OrganizationStatus,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateOrganizationProps): Organization {
    const documentType = DocumentType.create(props.documentType);
    const documentNumber = DocumentNumber.create(props.documentNumber, documentType.value);
    const tradeName = props.tradeName.trim();
    const legalName = props.legalName?.trim() ?? null;

    if (documentType.value === 'CNPJ' && !legalName) {
      throw new MissingLegalNameError();
    }

    const verticalIds = props.verticalIds.map((id) => VerticalId.create(id));

    return new Organization(
      OrganizationId.create(props.id),
      tradeName,
      legalName,
      documentType,
      documentNumber,
      props.ownerUserId,
      verticalIds,
      OrganizationStatus.create(props.status),
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): OrganizationId {
    return this.id;
  }

  getTradeName(): string {
    return this.tradeName;
  }

  getLegalName(): string | null {
    return this.legalName;
  }

  getDocumentType(): string {
    return this.documentType.value;
  }

  getDocumentNumber(): string {
    return this.documentNumber.value;
  }

  getOwnerUserId(): string {
    return this.ownerUserId;
  }

  getVerticalIds(): string[] {
    return this.verticalIds.map((id) => id.value);
  }

  getStatus(): OrganizationStatusValue {
    return this.status.value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
