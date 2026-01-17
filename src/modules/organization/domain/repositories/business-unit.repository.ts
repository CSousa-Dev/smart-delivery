import { BusinessUnit } from '../entities/business-unit.entity';

export interface BusinessUnitRepository {
  save(unit: BusinessUnit): Promise<void>;
  countByOrganizationId(organizationId: string): Promise<number>;
  listByOrganizationId(organizationId: string): Promise<BusinessUnit[]>;
  findById(id: string): Promise<BusinessUnit | null>;
  list(page: number, pageSize: number, sortDirection: 'asc' | 'desc'): Promise<BusinessUnit[]>;
  countAll(): Promise<number>;
}
