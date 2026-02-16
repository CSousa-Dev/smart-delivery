import { VerticalCatalogPort } from '../../application/ports/vertical-catalog.port';

/**
 * Provider type to avoid organization module depending on attributes module types.
 * The app wires this with attributes ListVerticalsService output.
 */
export type ListVerticalsProvider = () => Promise<{
  items: Array<{ code: string; name: string; description: string; isActive: boolean }>;
}>;

export class AttributesVerticalCatalogAdapter implements VerticalCatalogPort {
  constructor(private readonly listVerticals: ListVerticalsProvider) {}

  async listAllActive(): Promise<Array<{ code: string; name: string; description: string }>> {
    const result = await this.listVerticals();
    return result.items
      .filter((item) => item.isActive)
      .map((item) => ({ code: item.code, name: item.name, description: item.description }));
  }

  async validateCodes(codes: string[]): Promise<boolean> {
    if (codes.length === 0) return false;
    const result = await this.listVerticals();
    const activeCodes = new Set(
      result.items.filter((item) => item.isActive).map((item) => item.code)
    );
    return codes.every((code) => activeCodes.has(code));
  }
}
