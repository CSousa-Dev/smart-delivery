import { Organization } from '../entities/organization.entity';

export interface OrganizationRepository {
  save(organization: Organization): Promise<void>;
  existsById(id: string): Promise<boolean>;
  existsByDocumentNumber(documentNumber: string): Promise<boolean>;
  findById(id: string): Promise<Organization | null>;
  updateStatus(id: string, status: string): Promise<void>;
  list(page: number, pageSize: number, sortDirection: 'asc' | 'desc'): Promise<Organization[]>;
  countAll(): Promise<number>;
}
