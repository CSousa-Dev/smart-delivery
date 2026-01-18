export interface BusinessUnitRepository {
  existsById(id: string): Promise<boolean>;
  existsByIdAndOrganizationId(businessUnitId: string, organizationId: string): Promise<boolean>;
}
