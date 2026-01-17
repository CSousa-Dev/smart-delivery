import { randomUUID } from 'crypto';
import {
  InvalidCountryError,
  InvalidPhoneNumberError,
  InvalidPostalCodeError,
  InvalidStateError,
} from '../errors/business-unit.errors';
import { InvalidEmailError } from '../errors/user.errors';

export type BusinessUnitStatusValue = 'PENDING_PRODUCTS' | 'ACTIVE';

const BRAZIL_STATES = new Set([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]);

export class BusinessUnitId {
  private constructor(public readonly value: string) {}

  static create(value?: string): BusinessUnitId {
    return new BusinessUnitId(value ?? randomUUID());
  }

  static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  }
}

export class BusinessUnitStatus {
  private constructor(public readonly value: BusinessUnitStatusValue) {}

  static create(value: BusinessUnitStatusValue): BusinessUnitStatus {
    return new BusinessUnitStatus(value);
  }
}

export class BusinessUnitPhoneNumber {
  private constructor(public readonly value: string) {}

  static create(value: string): BusinessUnitPhoneNumber {
    const normalized = value.replace(/\D/g, '');
    if (!normalized || normalized.length > 15) {
      throw new InvalidPhoneNumberError(value);
    }

    return new BusinessUnitPhoneNumber(normalized);
  }
}

export class BusinessUnitEmailAddress {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(public readonly value: string) {}

  static create(value: string): BusinessUnitEmailAddress {
    const normalized = value.trim().toLowerCase();
    if (!this.EMAIL_REGEX.test(normalized)) {
      throw new InvalidEmailError(value);
    }

    return new BusinessUnitEmailAddress(normalized);
  }
}

export class BusinessUnitAddress {
  private constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly complement: string | null,
    public readonly neighborhood: string,
    public readonly city: string,
    public readonly state: string,
    public readonly postalCode: string,
    public readonly country: string,
    public readonly referencePoint: string
  ) {}

  static create(props: {
    street: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    referencePoint: string;
  }): BusinessUnitAddress {
    const street = props.street.trim();
    const number = props.number.trim();
    const neighborhood = props.neighborhood.trim();
    const city = props.city.trim();
    const referencePoint = props.referencePoint.trim();
    const state = props.state.trim().toUpperCase();
    const country = props.country.trim().toUpperCase();
    const postalCode = props.postalCode.replace(/\D/g, '');

    if (postalCode.length !== 8) {
      throw new InvalidPostalCodeError(props.postalCode);
    }

    if (!BRAZIL_STATES.has(state)) {
      throw new InvalidStateError(props.state);
    }

    if (country !== 'BR') {
      throw new InvalidCountryError(props.country);
    }

    return new BusinessUnitAddress(
      street,
      number,
      props.complement?.trim() ?? null,
      neighborhood,
      city,
      state,
      postalCode,
      country,
      referencePoint
    );
  }
}

export interface CreateBusinessUnitProps {
  id?: string;
  organizationId: string;
  publicName: string;
  phoneNumber: string;
  phoneHasWhatsapp: boolean;
  email?: string | null;
  instagram?: string | null;
  website?: string | null;
  address: {
    street: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    referencePoint: string;
  };
  status: BusinessUnitStatusValue;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class BusinessUnit {
  private constructor(
    private readonly id: BusinessUnitId,
    private readonly organizationId: string,
    private readonly publicName: string,
    private readonly phoneNumber: BusinessUnitPhoneNumber,
    private readonly phoneHasWhatsapp: boolean,
    private readonly email: BusinessUnitEmailAddress | null,
    private readonly instagram: string | null,
    private readonly website: string | null,
    private readonly address: BusinessUnitAddress,
    private readonly status: BusinessUnitStatus,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateBusinessUnitProps): BusinessUnit {
    const publicName = props.publicName.trim();
    const phoneNumber = BusinessUnitPhoneNumber.create(props.phoneNumber);
    const email = props.email ? BusinessUnitEmailAddress.create(props.email) : null;
    const address = BusinessUnitAddress.create(props.address);

    return new BusinessUnit(
      BusinessUnitId.create(props.id),
      props.organizationId,
      publicName,
      phoneNumber,
      props.phoneHasWhatsapp,
      email,
      props.instagram?.trim() ?? null,
      props.website?.trim() ?? null,
      address,
      BusinessUnitStatus.create(props.status),
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): BusinessUnitId {
    return this.id;
  }

  getOrganizationId(): string {
    return this.organizationId;
  }

  getPublicName(): string {
    return this.publicName;
  }

  getPhoneNumber(): string {
    return this.phoneNumber.value;
  }

  getPhoneHasWhatsapp(): boolean {
    return this.phoneHasWhatsapp;
  }

  getEmail(): string | null {
    return this.email?.value ?? null;
  }

  getInstagram(): string | null {
    return this.instagram;
  }

  getWebsite(): string | null {
    return this.website;
  }

  getAddress(): BusinessUnitAddress {
    return this.address;
  }

  getStatus(): BusinessUnitStatusValue {
    return this.status.value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
