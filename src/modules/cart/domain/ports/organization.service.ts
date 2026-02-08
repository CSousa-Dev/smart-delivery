/**
 * Port for Organization API: validates if a vertical is valid/enabled for a business unit.
 */
export interface OrganizationService {
  isVerticalValidForBusinessUnit(
    verticalId: string,
    businessUnitId: string
  ): Promise<boolean>;
}
