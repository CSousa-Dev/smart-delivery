import {
  LinkOrganizationVerticalInput,
  LinkOrganizationVerticalOutput,
} from '../dtos/link-organization-vertical.dto';
import {
  OrganizationNotFoundError,
  VerticalNotRegisteredError,
} from '../../domain/errors/organization.errors';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { VerticalCatalogPort } from '../ports/vertical-catalog.port';
import { OrganizationVerticalLink } from '../../domain/entities/organization-vertical-link.entity';

export class LinkOrganizationVerticalService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly verticalCatalog: VerticalCatalogPort
  ) {}

  async execute(input: LinkOrganizationVerticalInput): Promise<LinkOrganizationVerticalOutput> {
    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    const codesValid = await this.verticalCatalog.validateCodes([input.verticalCode]);
    if (!codesValid) {
      throw new VerticalNotRegisteredError([input.verticalCode]);
    }

    const existing = await this.organizationVerticalRepository.findByOrganizationAndVerticalCode(
      input.organizationId,
      input.verticalCode
    );

    if (!existing) {
      const link = OrganizationVerticalLink.create({
        organizationId: input.organizationId,
        verticalCode: input.verticalCode,
      });
      await this.organizationVerticalRepository.save(link);
    } else if (existing.getStatus() === 'INACTIVE') {
      await this.organizationVerticalRepository.updateStatus(
        input.organizationId,
        input.verticalCode,
        'ACTIVE'
      );
    }

    return {
      organizationId: input.organizationId,
      verticalCode: input.verticalCode,
      status: 'ACTIVE',
    };
  }
}
