import {
  CreateOrganizationInput,
  CreateOrganizationOutput,
} from '../dtos/create-organization.dto';
import { Organization } from '../../domain/entities/organization.entity';
import { OrganizationVerticalLink } from '../../domain/entities/organization-vertical-link.entity';
import { DocumentNumber, DocumentType } from '../../domain/entities/user.entity';
import { UserOrganizationLink } from '../../domain/entities/user-organization-link.entity';
import {
  OwnerUserNotFoundError,
  UserAlreadyLinkedError,
  VerticalNotRegisteredError,
} from '../../domain/errors/organization.errors';
import { DocumentAlreadyExistsError } from '../../domain/errors/user.errors';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationUnitOfWork } from '../../domain/repositories/organization-unit-of-work';
import { UserOrganizationLinkRepository } from '../../domain/repositories/user-organization-link.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class CreateOrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly userRepository: UserRepository,
    private readonly userOrganizationLinkRepository: UserOrganizationLinkRepository,
    private readonly verticalRepository: VerticalRepository,
    private readonly unitOfWork: OrganizationUnitOfWork
  ) {}

  async execute(input: CreateOrganizationInput): Promise<CreateOrganizationOutput> {
    const documentType = DocumentType.create(input.documentType);
    const documentNumber = DocumentNumber.create(input.documentNumber, documentType.value);

    const ownerUser = await this.userRepository.findById(input.ownerUserId);
    if (!ownerUser) {
      throw new OwnerUserNotFoundError(input.ownerUserId);
    }

    if (await this.userOrganizationLinkRepository.existsByUserId(input.ownerUserId)) {
      throw new UserAlreadyLinkedError(input.ownerUserId);
    }

    if (await this.userRepository.existsByDocumentNumber(documentNumber.value)) {
      throw new DocumentAlreadyExistsError(documentNumber.value);
    }

    if (await this.organizationRepository.existsByDocumentNumber(documentNumber.value)) {
      throw new DocumentAlreadyExistsError(documentNumber.value);
    }

    if (!input.verticalIds.length) {
      throw new VerticalNotRegisteredError(input.verticalIds);
    }

    const verticalsRegistered = await this.verticalRepository.listByIds(input.verticalIds);
    if (verticalsRegistered.length !== input.verticalIds.length) {
      throw new VerticalNotRegisteredError(input.verticalIds);
    }

    const organization = Organization.create({
      tradeName: input.tradeName,
      legalName: input.legalName ?? null,
      documentType: documentType.value,
      documentNumber: documentNumber.value,
      ownerUserId: input.ownerUserId,
      verticalIds: input.verticalIds,
      status: 'PENDING_BUSINESS_UNIT',
    });

    const ownerUserActivated = ownerUser.activate();
    const ownerLink = UserOrganizationLink.createOwner({
      userId: ownerUserActivated.getId().value,
      organizationId: organization.getId().value,
    });

    const verticalLinks = input.verticalIds.map((verticalId) =>
      OrganizationVerticalLink.create({
        organizationId: organization.getId().value,
        verticalId,
      })
    );

    await this.unitOfWork.withTransaction(async (repositories) => {
      await repositories.organizationRepository.save(organization);
      await repositories.userRepository.save(ownerUserActivated);
      await repositories.userOrganizationLinkRepository.save(ownerLink);
      await repositories.organizationVerticalRepository.saveMany(verticalLinks);
    });

    return {
      id: organization.getId().value,
      tradeName: organization.getTradeName(),
      legalName: organization.getLegalName(),
      documentType: organization.getDocumentType(),
      documentNumber: organization.getDocumentNumber(),
      ownerUserId: organization.getOwnerUserId(),
      verticalIds: organization.getVerticalIds(),
      status: organization.getStatus(),
      createdAt: organization.getCreatedAt(),
    };
  }
}
