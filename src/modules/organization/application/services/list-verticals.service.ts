import { ListVerticalsOutput } from '../dtos/list-verticals.dto';
import { VerticalCatalogPort } from '../ports/vertical-catalog.port';

/**
 * Lists active verticals from the catalog (Attributes module).
 * Organization only references vertical by code; the catalog is the source of truth.
 */
export class ListVerticalsService {
  constructor(private readonly verticalCatalog: VerticalCatalogPort) {}

  async execute(): Promise<ListVerticalsOutput> {
    const items = await this.verticalCatalog.listAllActive();
    return {
      items: items.map((v) => ({
        code: v.code,
        name: v.name,
        description: v.description,
      })),
    };
  }
}
