import {
  LinkOrganizationVerticalInput,
  LinkOrganizationVerticalOutput,
} from '../dtos/link-organization-vertical.dto';
import { OrganizationNotFoundError, VerticalNotRegisteredError } from '../../domain/errors/organization.errors';
import { UserNotOwnerError } from '../../domain/errors/business-unit.errors';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { OrganizationVerticalLink } from '../../domain/entities/organization-vertical-link.entity';

export class LinkOrganizationVerticalService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly verticalRepository: VerticalRepository
  ) {}

  async execute(input: LinkOrganizationVerticalInput): Promise<LinkOrganizationVerticalOutput> {
    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    if (organization.getOwnerUserId() !== input.actorUserId) {
      throw new UserNotOwnerError(input.actorUserId, input.organizationId);
    }

    const verticals = await this.verticalRepository.listByIds([input.verticalId]);
    if (verticals.length === 0) {
      throw new VerticalNotRegisteredError([input.verticalId]);
    }

    const existing = await this.organizationVerticalRepository.findByOrganizationAndVerticalId(
      input.organizationId,
      input.verticalId
    );

    if (!existing) {
      const link = OrganizationVerticalLink.create({
        organizationId: input.organizationId,
        verticalId: input.verticalId,
      });
      await this.organizationVerticalRepository.save(link);
    } else if (existing.getStatus() === 'INACTIVE') {
      await this.organizationVerticalRepository.updateStatus(
        input.organizationId,
        input.verticalId,
        'ACTIVE'
      );
    }

    return {
      organizationId: input.organizationId,
      verticalId: input.verticalId,
      status: 'ACTIVE',
    };
  }
}
