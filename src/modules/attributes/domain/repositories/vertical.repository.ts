import { Vertical } from '../entities/vertical.entity';

export interface VerticalRepository {
  save(vertical: Vertical): Promise<void>;
  update(vertical: Vertical): Promise<void>;
  existsByName(name: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
  existsByNameExcludingId(name: string, excludeId: string): Promise<boolean>;
  existsByCodeExcludingId(code: string, excludeId: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<Vertical | null>;
  listAll(): Promise<Vertical[]>;
}
