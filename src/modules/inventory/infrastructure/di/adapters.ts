import { ProductsDbClient } from '../../../products/infrastructure/database/prisma';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';
import { ProductCatalogAdapter } from '../external/product-catalog.adapter';
import { OrganizationRepositoryAdapter } from '../external/organization.repository.adapter';
import { OrganizationBusinessUnitAdapter } from '../external/organization-business-unit.adapter';

export function createInventoryAdapters(params: {
  productsPrisma: ProductsDbClient;
  organizationPrisma: OrganizationDbClient;
}) {
  const { productsPrisma, organizationPrisma } = params;

  return {
    productRepository: new ProductCatalogAdapter(productsPrisma),
    organizationRepository: new OrganizationRepositoryAdapter(organizationPrisma),
    businessUnitRepository: new OrganizationBusinessUnitAdapter(organizationPrisma),
  };
}
