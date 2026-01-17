export interface GetBusinessUnitInput {
  businessUnitId: string;
  actorUserId: string;
}

export interface GetBusinessUnitOutput {
  id: string;
  organizationId: string;
  publicName: string;
  phoneNumber: string;
  phoneHasWhatsapp: boolean;
  email: string | null;
  instagram: string | null;
  website: string | null;
  status: string;
  address: {
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    referencePoint: string;
  };
  createdAt: Date;
  updatedAt: Date | null;
}
