export interface OrganizationRepository {
  findById(id: string): Promise<{
    id: string;
    ownerUserId: string;
  } | null>;
}
