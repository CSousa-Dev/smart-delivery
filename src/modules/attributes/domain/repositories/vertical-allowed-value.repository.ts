import { VerticalAllowedValue } from '../entities/vertical-allowed-value.entity';

export interface VerticalAllowedValueRepository {
  saveAll(values: VerticalAllowedValue[]): Promise<void>;
  listByVerticalAttribute(
    verticalAttributeId: string
  ): Promise<Array<{ id: string; name: string; value: string }>>;
}
