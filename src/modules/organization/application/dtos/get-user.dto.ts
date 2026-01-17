import { UserStatusValue } from '../../domain/entities/user.entity';

export interface GetUserInput {
  userId: string;
  actorUserId: string;
}

export interface GetUserOutput {
  id: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phoneNumber: string;
  emailOptIn: boolean;
  phoneOptIn: boolean;
  status: UserStatusValue;
  organizationId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
