import {
  CreateBusinessUnitInput,
  CreateBusinessUnitOutput,
} from '../dtos/create-business-unit.dto';
import { BusinessUnit } from '../../domain/entities/business-unit.entity';
import { OrganizationNotFoundError } from '../../domain/errors/organization.errors';
import {
  UserNotOwnerError,
  VerticalNotInOrganizationError,
  VerticalRequiredError,
} from '../../domain/errors/business-unit.errors';
import { BusinessUnitVerticalLink } from '../../domain/entities/business-unit-vertical-link.entity';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../domain/repositories/business-unit-vertical.repository';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { OrganizationUnitOfWork } from '../../domain/repositories/organization-unit-of-work';

export class CreateBusinessUnitService {
  constructor(
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly businessUnitVerticalRepository: BusinessUnitVerticalRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly unitOfWork: OrganizationUnitOfWork
  ) {}

  async execute(input: CreateBusinessUnitInput): Promise<CreateBusinessUnitOutput> {
    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    if (organization.getOwnerUserId() !== input.actorUserId) {
      throw new UserNotOwnerError(input.actorUserId, input.organizationId);
    }

    if (!input.verticalIds.length) {
      throw new VerticalRequiredError();
    }

    const activeLinks = await this.organizationVerticalRepository.listActiveByOrganizationId(
      input.organizationId
    );
    const activeVerticalIds = new Set(activeLinks.map((link) => link.getVerticalId()));
    const invalidVertical = input.verticalIds.find((verticalId) => !activeVerticalIds.has(verticalId));
    if (invalidVertical) {
      throw new VerticalNotInOrganizationError(input.organizationId, invalidVertical);
    }

    const unitCount = await this.businessUnitRepository.countByOrganizationId(
      input.organizationId
    );

    const unit = BusinessUnit.create({
      organizationId: input.organizationId,
      publicName: input.publicName,
      phoneNumber: input.phoneNumber,
      phoneHasWhatsapp: input.phoneHasWhatsapp,
      email: input.email ?? null,
      instagram: input.instagram ?? null,
      website: input.website ?? null,
      address: input.address,
      status: 'PENDING_PRODUCTS',
    });

    const verticalLinks = input.verticalIds.map((verticalId) =>
      BusinessUnitVerticalLink.create({
        businessUnitId: unit.getId().value,
        organizationId: input.organizationId,
        verticalId,
      })
    );

    await this.unitOfWork.withTransaction(async (repositories) => {
      await repositories.businessUnitRepository.save(unit);
      await repositories.businessUnitVerticalRepository.saveMany(verticalLinks);
      if (unitCount === 0) {
        await repositories.organizationRepository.updateStatus(
          input.organizationId,
          'ACTIVE'
        );
      }
    });

    return {
      id: unit.getId().value,
      organizationId: unit.getOrganizationId(),
      verticalIds: input.verticalIds,
      publicName: unit.getPublicName(),
      phoneNumber: unit.getPhoneNumber(),
      phoneHasWhatsapp: unit.getPhoneHasWhatsapp(),
      email: unit.getEmail(),
      instagram: unit.getInstagram(),
      website: unit.getWebsite(),
      address: {
        street: unit.getAddress().street,
        number: unit.getAddress().number,
        complement: unit.getAddress().complement,
        neighborhood: unit.getAddress().neighborhood,
        city: unit.getAddress().city,
        state: unit.getAddress().state,
        postalCode: unit.getAddress().postalCode,
        country: unit.getAddress().country,
        referencePoint: unit.getAddress().referencePoint,
      },
      status: unit.getStatus(),
      createdAt: unit.getCreatedAt(),
    };
  }
}
