import { Vertical } from '../entities/vertical.entity';

export interface VerticalRepository {
  save(vertical: Vertical): Promise<void>;
  existsByName(name: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
}
