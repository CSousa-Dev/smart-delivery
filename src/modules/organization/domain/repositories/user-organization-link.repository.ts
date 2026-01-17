import { UserOrganizationLink } from '../entities/user-organization-link.entity';

export interface UserOrganizationLinkRepository {
  save(link: UserOrganizationLink): Promise<void>;
  existsByUserId(userId: string): Promise<boolean>;
  findByUserId(userId: string): Promise<UserOrganizationLink | null>;
  listByUserIds(userIds: string[]): Promise<UserOrganizationLink[]>;
}
