export interface OrganizationRepository {
  existsById(id: string): Promise<boolean>;
}
