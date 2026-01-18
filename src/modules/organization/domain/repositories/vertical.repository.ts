import { Vertical } from '../entities/vertical.entity';

export interface VerticalRepository {
  listByIds(ids: string[]): Promise<Vertical[]>;
}
