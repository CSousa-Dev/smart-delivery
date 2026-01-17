import { Attribute } from '../entities/attribute.entity';

export interface AttributeRepository {
  save(attribute: Attribute): Promise<void>;
  existsByName(name: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
  findById(id: string): Promise<Attribute | null>;
  listGlobal(limit?: number, offset?: number): Promise<Attribute[]>;
  findByIds(ids: string[]): Promise<Attribute[]>;
}
