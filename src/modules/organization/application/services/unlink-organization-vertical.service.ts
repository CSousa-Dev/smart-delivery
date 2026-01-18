import {
  UnlinkOrganizationVerticalInput,
  UnlinkOrganizationVerticalOutput,
} from '../dtos/unlink-organization-vertical.dto';
import {
  OrganizationNotFoundError,
  OrganizationRequiresActiveVerticalError,
  OrganizationVerticalNotFoundError,
} from '../../domain/errors/organization.errors';
import { UserNotOwnerError } from '../../domain/errors/business-unit.errors';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationUnitOfWork } from '../../domain/repositories/organization-unit-of-work';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';

export class UnlinkOrganizationVerticalService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly unitOfWork: OrganizationUnitOfWork
  ) {}

  async execute(
    input: UnlinkOrganizationVerticalInput
  ): Promise<UnlinkOrganizationVerticalOutput> {
    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    if (organization.getOwnerUserId() !== input.actorUserId) {
      throw new UserNotOwnerError(input.actorUserId, input.organizationId);
    }

    const activeLink =
      await this.organizationVerticalRepository.findActiveByOrganizationAndVerticalId(
        input.organizationId,
        input.verticalId
      );
    if (!activeLink) {
      throw new OrganizationVerticalNotFoundError(input.organizationId, input.verticalId);
    }

    await this.unitOfWork.withTransaction(async (repositories) => {
      const activeCount = await repositories.organizationVerticalRepository.countActiveByOrganizationId(
        input.organizationId
      );
      if (activeCount === 1) {
        throw new OrganizationRequiresActiveVerticalError(input.organizationId);
      }
      await repositories.organizationVerticalRepository.updateStatus(
        input.organizationId,
        input.verticalId,
        'INACTIVE'
      );
    });

    return {
      organizationId: input.organizationId,
      verticalId: input.verticalId,
      status: 'INACTIVE',
    };
  }
}
