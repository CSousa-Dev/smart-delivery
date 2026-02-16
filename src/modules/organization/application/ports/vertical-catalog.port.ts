/**
 * Port for vertical catalog (source of truth: Attributes module).
 * Organization only references vertical by code; validation and listing come from this port.
 */
export interface VerticalCatalogPort {
  listAllActive(): Promise<Array<{ code: string; name: string; description: string }>>;
  validateCodes(codes: string[]): Promise<boolean>;
}
