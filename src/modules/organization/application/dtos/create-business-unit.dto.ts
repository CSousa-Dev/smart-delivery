import { BusinessUnitStatusValue } from '../../domain/entities/business-unit.entity';

export interface CreateBusinessUnitInput {
  organizationId: string;
  actorUserId: string;
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
}

export interface CreateBusinessUnitOutput {
  id: string;
  organizationId: string;
  publicName: string;
  phoneNumber: string;
  phoneHasWhatsapp: boolean;
  email: string | null;
  instagram: string | null;
  website: string | null;
  address: CreateBusinessUnitInput['address'];
  status: BusinessUnitStatusValue;
  createdAt: Date;
}
