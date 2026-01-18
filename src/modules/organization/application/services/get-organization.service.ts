import {
  BusinessUnitSummary,
  GetOrganizationInput,
  GetOrganizationOutput,
  OrganizationUserSummary,
  VerticalSummary,
} from '../dtos/get-organization.dto';
import { OrganizationId } from '../../domain/entities/organization.entity';
import {
  InvalidOrganizationIdError,
  OrganizationNotFoundError,
} from '../../domain/errors/organization.errors';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class GetOrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly userRepository: UserRepository,
    private readonly verticalRepository: VerticalRepository
  ) {}

  async execute(input: GetOrganizationInput): Promise<GetOrganizationOutput> {
    if (!OrganizationId.isValid(input.organizationId)) {
      throw new InvalidOrganizationIdError(input.organizationId);
    }

    const includeSet = new Set(
      (input.include ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    );

    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    const verticalLinks = await this.organizationVerticalRepository.listByOrganizationId(
      input.organizationId
    );
    const verticalIds = verticalLinks.map((link) => link.getVerticalId());
    const verticals = await this.verticalRepository.listByIds(verticalIds);
    const verticalsById = new Map(verticals.map((vertical) => [vertical.getId(), vertical]));
    const verticalSummaries: VerticalSummary[] = verticalLinks
      .map((link) => verticalsById.get(link.getVerticalId()))
      .filter((vertical): vertical is NonNullable<typeof vertical> => Boolean(vertical))
      .map((vertical) => ({
        id: vertical.getId(),
        name: vertical.getName(),
        code: vertical.getCode(),
        description: vertical.getDescription(),
      }));

    let businessUnits: BusinessUnitSummary[] | undefined;
    if (includeSet.has('businessUnits')) {
      const units = await this.businessUnitRepository.listByOrganizationId(input.organizationId);
      businessUnits = units.map((unit) => ({
        id: unit.getId().value,
        organizationId: unit.getOrganizationId(),
        publicName: unit.getPublicName(),
        phoneNumber: unit.getPhoneNumber(),
        phoneHasWhatsapp: unit.getPhoneHasWhatsapp(),
        status: unit.getStatus(),
      }));
    }

    let users: OrganizationUserSummary[] | undefined;
    if (includeSet.has('users')) {
      const orgUsers = await this.userRepository.listByOrganizationId(input.organizationId);
      users = orgUsers.map((user) => ({
        id: user.getId().value,
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        phoneNumber: user.getPhoneNumber(),
        status: user.getStatus(),
      }));
    }

    return {
      id: organization.getId().value,
      tradeName: organization.getTradeName(),
      legalName: organization.getLegalName(),
      documentType: organization.getDocumentType(),
      documentNumber: organization.getDocumentNumber(),
      verticals: verticalSummaries,
      ownerUserId: organization.getOwnerUserId(),
      status: organization.getStatus(),
      createdAt: organization.getCreatedAt(),
      updatedAt: organization.getUpdatedAt(),
      ...(businessUnits !== undefined ? { businessUnits } : {}),
      ...(users !== undefined ? { users } : {}),
    };
  }
}
