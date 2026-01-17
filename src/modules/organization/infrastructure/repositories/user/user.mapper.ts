import { User } from '../../../domain/entities/user.entity';

export class UserMapper {
  static toPersistence(user: User) {
    return {
      id: user.getId().value,
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      documentType: user.getDocumentType(),
      documentNumber: user.getDocumentNumber(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      emailOptIn: user.getEmailOptIn(),
      phoneOptIn: user.getPhoneOptIn(),
      statusId: user.getStatus(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
