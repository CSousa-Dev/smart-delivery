import { UserStatusValue } from '../../domain/entities/user.entity';

export interface ListUsersInput {
  page?: number;
  pageSize?: number;
  sortDirection?: string;
}

export interface ListUsersItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: UserStatusValue;
  organizationId: string | null;
  createdAt: Date;
}

export interface ListUsersOutput {
  items: ListUsersItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
