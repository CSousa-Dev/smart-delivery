import { AllowedValue } from '../entities/allowed-value.entity';

export interface AllowedValueRepository {
  saveAll(values: AllowedValue[]): Promise<void>;
  existsByName(attributeId: string, name: string): Promise<boolean>;
  existsByValue(attributeId: string, value: string): Promise<boolean>;
  listByAttribute(attributeId: string): Promise<Array<{ id: string; name: string; value: string }>>;
}
