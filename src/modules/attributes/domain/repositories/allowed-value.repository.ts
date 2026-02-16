import { AllowedValue } from '../entities/allowed-value.entity';

export interface AllowedValueRepository {
  saveAll(values: AllowedValue[]): Promise<void>;
  existsByName(attributeId: string, name: string): Promise<boolean>;
  existsByValue(attributeId: string, value: string): Promise<boolean>;
  existsByNameExcludingId(
    attributeId: string,
    name: string,
    excludeId: string
  ): Promise<boolean>;
  existsByValueExcludingId(
    attributeId: string,
    value: string,
    excludeId: string
  ): Promise<boolean>;
  findById(id: string): Promise<AllowedValue | null>;
  update(value: AllowedValue): Promise<void>;
  delete(id: string): Promise<void>;
  isLinkedToUsage(id: string): Promise<boolean>;
  listByAttribute(
    attributeId: string
  ): Promise<Array<{ id: string; name: string; value: string; description: string | null }>>;
}
