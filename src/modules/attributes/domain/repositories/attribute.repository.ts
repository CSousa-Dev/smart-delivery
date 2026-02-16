import { Attribute } from '../entities/attribute.entity';

export interface AttributeRepository {
  save(attribute: Attribute): Promise<void>;
  update(attribute: Attribute): Promise<void>;
  delete(id: string): Promise<void>;
  updateDefaultValue(attributeId: string, defaultValueId: string | null): Promise<void>;
  existsByName(name: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
  existsByNameExcludingId(name: string, excludeId: string): Promise<boolean>;
  existsByCodeExcludingId(code: string, excludeId: string): Promise<boolean>;
  findById(id: string): Promise<Attribute | null>;
  listGlobal(limit?: number, offset?: number): Promise<Attribute[]>;
  findByIds(ids: string[]): Promise<Attribute[]>;
}
