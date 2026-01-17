import { Product } from '../entities/product.entity';

export interface ProductRepository {
  existsByCodeAndOrganizationId(codeNormalized: string, organizationId: string): Promise<boolean>;
  existsByTitleAndBusinessUnitId(titleNormalized: string, businessUnitId: string): Promise<boolean>;
  save(product: Product): Promise<void>;
}
