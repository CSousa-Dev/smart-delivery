import { PrismaClient } from '@prisma/client';
import { createAttributesRepositories } from '../../../attributes/infrastructure/di/repositories';
import {
  createAttributesAppServices,
  createAttributesDomainServices,
} from '../../../attributes/infrastructure/di/services';
import { createAttributesAdapters } from '../../../attributes/infrastructure/di/adapters';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';
import { AttributesCategoryAdapter } from '../external/attributes-category.adapter';
import { AttributeValueValidationAdapter } from '../external/attribute-value-validation.adapter';
import { OrganizationBusinessUnitAdapter } from '../external/organization-business-unit.adapter';
import { OrganizationOwnerAdapter } from '../external/organization-owner.adapter';

export function createProductsAdapters(params: {
  organizationPrisma: OrganizationDbClient;
  attributesPrisma: PrismaClient;
}) {
  const { organizationPrisma, attributesPrisma } = params;

  const attributeRepos = createAttributesRepositories(attributesPrisma);
  const attributeDomain = createAttributesDomainServices();
  const attributeAdapters = createAttributesAdapters();
  const attributeApp = createAttributesAppServices(
    attributeRepos,
    attributeDomain,
    attributeAdapters
  );

  return {
    businessUnitRepository: new OrganizationBusinessUnitAdapter(organizationPrisma),
    categoryRepository: new AttributesCategoryAdapter(attributesPrisma),
    attributeValueValidationPort: new AttributeValueValidationAdapter(
      attributeApp.resolveAttributeConfigurationService,
      attributeDomain.attributeValueValidationService
    ),
    organizationRepository: new OrganizationOwnerAdapter(organizationPrisma),
  };
}
