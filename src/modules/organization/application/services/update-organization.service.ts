import {
  UpdateOrganizationInput,
  UpdateOrganizationOutput,
} from '../dtos/update-organization.dto';
import {
  MissingLegalNameError,
  OrganizationNotFoundError,
} from '../../domain/errors/organization.errors';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';

export class UpdateOrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository
  ) {}

  async execute(input: UpdateOrganizationInput): Promise<UpdateOrganizationOutput> {
    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    const tradeName =
      input.tradeName !== undefined ? input.tradeName.trim() : organization.getTradeName();
    const legalName =
      input.legalName !== undefined
        ? (input.legalName?.trim() ?? null)
        : organization.getLegalName();

    if (organization.getDocumentType() === 'CNPJ' && !legalName) {
      throw new MissingLegalNameError();
    }

    await this.organizationRepository.update(input.organizationId, {
      tradeName,
      legalName,
    });

    const updated = await this.organizationRepository.findById(input.organizationId);
    if (!updated) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    const verticalLinks = await this.organizationVerticalRepository.listByOrganizationId(
      input.organizationId
    );
    const verticalCodes = verticalLinks.map((link) => link.getVerticalCode());

    return {
      id: updated.getId().value,
      tradeName: updated.getTradeName(),
      legalName: updated.getLegalName(),
      documentType: updated.getDocumentType(),
      documentNumber: updated.getDocumentNumber(),
      ownerUserId: updated.getOwnerUserId(),
      verticalCodes,
      status: updated.getStatus(),
      createdAt: updated.getCreatedAt(),
      updatedAt: updated.getUpdatedAt(),
    };
  }
}
