export interface BusinessUnitRepository {
  findById(id: string): Promise<{
    id: string;
    organizationId: string;
    activeVerticalIds: string[];
  } | null>;
}
