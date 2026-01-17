import { GetUserInput, GetUserOutput } from '../dtos/get-user.dto';
import { UserId } from '../../domain/entities/user.entity';
import { UserNotFoundError, InvalidUserIdError } from '../../domain/errors/user.errors';
import { UserOrganizationLinkRepository } from '../../domain/repositories/user-organization-link.repository';
import { UserRepository } from '../../domain/repositories/user.repository';

export class GetUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userOrganizationLinkRepository: UserOrganizationLinkRepository
  ) {}

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    if (!UserId.isValid(input.userId)) {
      throw new InvalidUserIdError(input.userId);
    }

    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new UserNotFoundError(input.userId);
    }

    const link = await this.userOrganizationLinkRepository.findByUserId(input.userId);

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
      status: user.getStatus(),
      organizationId: link ? link.getOrganizationId() : null,
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
