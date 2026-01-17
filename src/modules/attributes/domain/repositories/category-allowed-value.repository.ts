import { CategoryAllowedValue } from '../entities/category-allowed-value.entity';

export interface CategoryAllowedValueRepository {
  saveAll(values: CategoryAllowedValue[]): Promise<void>;
  listByCategoryAttribute(
    categoryAttributeId: string
  ): Promise<Array<{ id: string; name: string; value: string }>>;
}
