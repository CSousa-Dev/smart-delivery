import { VerticalCatalogPort } from '../../../src/modules/organization/application/ports/vertical-catalog.port';

/**
 * Stub for tests. Valid codes are the ones provided; listAllActive returns them with name/description.
 */
export function createVerticalCatalogStub(validCodes: string[]): VerticalCatalogPort {
  const items = validCodes.map((code) => ({
    code,
    name: code,
    description: `${code} description`,
  }));

  return {
    async listAllActive() {
      return items;
    },
    async validateCodes(codes: string[]) {
      if (codes.length === 0) return false;
      const set = new Set(validCodes);
      return codes.every((c) => set.has(c));
    },
  };
}
