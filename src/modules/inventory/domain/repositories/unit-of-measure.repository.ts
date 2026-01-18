import { UnitOfMeasure } from '../entities/unit-of-measure.entity';

export interface UnitOfMeasureRepository {
  existsByCode(organizationId: string, codeNormalized: string): Promise<boolean>;
  existsByName(organizationId: string, nameNormalized: string): Promise<boolean>;
  findById(id: string): Promise<{
    id: string;
    organizationId: string;
    code: string;
    name: string;
    nameNormalized: string;
    symbol: string;
    allowsFraction: boolean;
    status: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date | null;
  } | null>;
  save(unit: UnitOfMeasure): Promise<void>;
}
