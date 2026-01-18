import {
  UnlinkBusinessUnitVerticalInput,
  UnlinkBusinessUnitVerticalOutput,
} from '../dtos/unlink-business-unit-vertical.dto';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../domain/repositories/business-unit-vertical.repository';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import {
  BusinessUnitNotFoundError,
  BusinessUnitRequiresActiveVerticalError,
  BusinessUnitVerticalNotFoundError,
  UserNotOwnerError,
} from '../../domain/errors/business-unit.errors';
import { OrganizationNotFoundError } from '../../domain/errors/organization.errors';
import { OrganizationUnitOfWork } from '../../domain/repositories/organization-unit-of-work';

export class UnlinkBusinessUnitVerticalService {
  constructor(
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly businessUnitVerticalRepository: BusinessUnitVerticalRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly unitOfWork: OrganizationUnitOfWork
  ) {}

  async execute(
    input: UnlinkBusinessUnitVerticalInput
  ): Promise<UnlinkBusinessUnitVerticalOutput> {
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

    const activeLink =
      await this.businessUnitVerticalRepository.findActiveByBusinessUnitAndVerticalId(
        input.businessUnitId,
        input.verticalId
      );
    if (!activeLink) {
      throw new BusinessUnitVerticalNotFoundError(input.businessUnitId, input.verticalId);
    }

    await this.unitOfWork.withTransaction(async (repositories) => {
      const activeCount = await repositories.businessUnitVerticalRepository.countActiveByBusinessUnitId(
        input.businessUnitId
      );
      if (activeCount === 1) {
        throw new BusinessUnitRequiresActiveVerticalError(input.businessUnitId);
      }
      await repositories.businessUnitVerticalRepository.updateStatus(
        input.businessUnitId,
        input.verticalId,
        'INACTIVE'
      );
    });

    return {
      businessUnitId: input.businessUnitId,
      organizationId: organization.getId().value,
      verticalId: input.verticalId,
      status: 'INACTIVE',
    };
  }
}
