import {
  LinkBusinessUnitVerticalInput,
  LinkBusinessUnitVerticalOutput,
} from '../dtos/link-business-unit-vertical.dto';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../domain/repositories/business-unit-vertical.repository';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import {
  BusinessUnitNotFoundError,
  UserNotOwnerError,
  VerticalNotInOrganizationError,
} from '../../domain/errors/business-unit.errors';
import { OrganizationNotFoundError } from '../../domain/errors/organization.errors';
import { BusinessUnitVerticalLink } from '../../domain/entities/business-unit-vertical-link.entity';

export class LinkBusinessUnitVerticalService {
  constructor(
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly businessUnitVerticalRepository: BusinessUnitVerticalRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository
  ) {}

  async execute(
    input: LinkBusinessUnitVerticalInput
  ): Promise<LinkBusinessUnitVerticalOutput> {
    const businessUnit = await this.businessUnitRepository.findById(input.businessUnitId);
    if (!businessUnit) {
      throw new BusinessUnitNotFoundError(input.businessUnitId);
    }

    const organization = await this.organizationRepository.findById(
      businessUnit.getOrganizationId()
    );
    if (!organization) {
      throw new OrganizationNotFoundError(businessUnit.getOrganizationId());
    }

    if (organization.getOwnerUserId() !== input.actorUserId) {
      throw new UserNotOwnerError(input.actorUserId, organization.getId().value);
    }

    const isActiveInOrganization =
      await this.organizationVerticalRepository.existsActiveByOrganizationAndVerticalId(
        organization.getId().value,
        input.verticalId
      );
    if (!isActiveInOrganization) {
      throw new VerticalNotInOrganizationError(organization.getId().value, input.verticalId);
    }

    const existing = await this.businessUnitVerticalRepository.findByBusinessUnitAndVerticalId(
      input.businessUnitId,
      input.verticalId
    );

    if (!existing) {
      const link = BusinessUnitVerticalLink.create({
        businessUnitId: input.businessUnitId,
        organizationId: organization.getId().value,
        verticalId: input.verticalId,
      });
      await this.businessUnitVerticalRepository.save(link);
    } else if (existing.getStatus() === 'INACTIVE') {
      await this.businessUnitVerticalRepository.updateStatus(
        input.businessUnitId,
        input.verticalId,
        'ACTIVE'
      );
    }

    return {
      businessUnitId: input.businessUnitId,
      organizationId: organization.getId().value,
      verticalId: input.verticalId,
      status: 'ACTIVE',
    };
  }
}
