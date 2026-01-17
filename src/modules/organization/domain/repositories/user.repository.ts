import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  existsByDocumentNumber(documentNumber: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByPhoneNumber(phoneNumber: string): Promise<boolean>;
  list(page: number, pageSize: number, sortDirection: 'asc' | 'desc'): Promise<User[]>;
  countAll(): Promise<number>;
  listByOrganizationId(organizationId: string): Promise<User[]>;
}
