import { DocumentTypeValue, UserStatusValue } from '../../domain/entities/user.entity';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phoneNumber: string;
  emailOptIn: boolean;
  phoneOptIn: boolean;
  organizationId: string;
}

export interface CreateUserOutput {
  id: string;
  firstName: string;
  lastName: string;
  documentType: DocumentTypeValue;
  documentNumber: string;
  email: string;
  phoneNumber: string;
  emailOptIn: boolean;
  phoneOptIn: boolean;
  status: UserStatusValue;
  organizationId: string;
  createdAt: Date;
}
