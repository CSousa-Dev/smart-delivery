import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import {
  DocumentNumber,
  DocumentType,
  EmailAddress,
  PhoneNumber,
  User,
} from '../../domain/entities/user.entity';
import { UserOrganizationLink } from '../../domain/entities/user-organization-link.entity';
import { OrganizationNotFoundError } from '../../domain/errors/organization.errors';
import {
  DocumentAlreadyExistsError,
  EmailAlreadyExistsError,
  PhoneAlreadyExistsError,
} from '../../domain/errors/user.errors';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationUnitOfWork } from '../../domain/repositories/organization-unit-of-work';
import { UserRepository } from '../../domain/repositories/user.repository';

export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly unitOfWork: OrganizationUnitOfWork
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const documentType = DocumentType.create(input.documentType);
    const documentNumber = DocumentNumber.create(input.documentNumber, documentType.value);
    const email = EmailAddress.create(input.email);
    const phoneNumber = PhoneNumber.create(input.phoneNumber);

    if (await this.userRepository.existsByDocumentNumber(documentNumber.value)) {
      throw new DocumentAlreadyExistsError(documentNumber.value);
    }

    if (await this.organizationRepository.existsByDocumentNumber(documentNumber.value)) {
      throw new DocumentAlreadyExistsError(documentNumber.value);
    }

    if (await this.userRepository.existsByEmail(email.value)) {
      throw new EmailAlreadyExistsError(email.value);
    }

    if (await this.userRepository.existsByPhoneNumber(phoneNumber.value)) {
      throw new PhoneAlreadyExistsError(phoneNumber.value);
    }

    if (input.organizationId) {
      const exists = await this.organizationRepository.existsById(input.organizationId);
      if (!exists) {
        throw new OrganizationNotFoundError(input.organizationId);
      }
    }

    const status = input.organizationId ? 'ORG_LINKED' : 'PENDING_ORG_LINK';
    const user = User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      documentType: documentType.value,
      documentNumber: documentNumber.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      emailOptIn: input.emailOptIn,
      phoneOptIn: input.phoneOptIn,
      status,
    });

    const link = input.organizationId
      ? UserOrganizationLink.create({
          userId: user.getId().value,
          organizationId: input.organizationId,
        })
      : null;

    await this.unitOfWork.withTransaction(async (repositories) => {
      await repositories.userRepository.save(user);
      if (link) {
        await repositories.userOrganizationLinkRepository.save(link);
      }
    });

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
      organizationId: input.organizationId ?? null,
      createdAt: user.getCreatedAt(),
    };
  }
}
