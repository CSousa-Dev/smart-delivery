import { AttributeResolutionService } from '../../domain/services/attribute-resolution.service';
import { AttributeValueValidationService } from '../../domain/services/attribute-value-validation.service';
import { CreateAttributeService } from '../../application/services/create-attribute.service';
import { CreateVerticalService } from '../../application/services/create-vertical.service';
import { CreateCategoryService } from '../../application/services/create-category.service';
import { CreateAllowedValueService } from '../../application/services/create-allowed-value.service';
import { LinkAttributeToVerticalService } from '../../application/services/link-attribute-to-vertical.service';
import { LinkAttributeToCategoryService } from '../../application/services/link-attribute-to-category.service';
import { ResolveAttributeConfigurationService } from '../../application/services/resolve-attribute-configuration.service';
import { ValidateAttributeValuesService } from '../../application/services/validate-attribute-values.service';
import { CategoryHierarchyService } from '../../domain/services/category-hierarchy.service';
import { createAttributesRepositories } from './repositories';

type Repositories = ReturnType<typeof createAttributesRepositories>;

export function createAttributesDomainServices() {
  return {
    attributeResolutionService: new AttributeResolutionService(),
    attributeValueValidationService: new AttributeValueValidationService(),
    categoryHierarchyService: new CategoryHierarchyService(),
  };
}

export function createAttributesAppServices(
  repos: Repositories,
  domain: ReturnType<typeof createAttributesDomainServices>
) {
  const resolveAttributeConfigurationService = new ResolveAttributeConfigurationService(
    repos.attributeRepository,
    repos.verticalAttributeRepository,
    repos.categoryAttributeRepository,
    repos.allowedValueRepository,
    repos.verticalAllowedValueRepository,
    repos.categoryAllowedValueRepository,
    repos.verticalRepository,
    repos.categoryRepository,
    domain.attributeResolutionService
  );

  return {
    createAttributeService: new CreateAttributeService(
      repos.attributeRepository,
      repos.allowedValueRepository
    ),
    createVerticalService: new CreateVerticalService(repos.verticalRepository),
    createCategoryService: new CreateCategoryService(
      repos.categoryRepository,
      repos.verticalRepository,
      domain.categoryHierarchyService
    ),
    createAllowedValueService: new CreateAllowedValueService(
      repos.attributeRepository,
      repos.allowedValueRepository
    ),
    linkAttributeToVerticalService: new LinkAttributeToVerticalService(
      repos.verticalRepository,
      repos.attributeRepository,
      repos.allowedValueRepository,
      repos.verticalAttributeRepository,
      repos.verticalAllowedValueRepository
    ),
    linkAttributeToCategoryService: new LinkAttributeToCategoryService(
      repos.categoryRepository,
      repos.categoryAttributeRepository,
      repos.categoryAllowedValueRepository,
      repos.attributeRepository,
      repos.verticalAttributeRepository,
      repos.allowedValueRepository,
      repos.verticalAllowedValueRepository
    ),
    resolveAttributeConfigurationService,
    validateAttributeValuesService: new ValidateAttributeValuesService(
      resolveAttributeConfigurationService,
      domain.attributeValueValidationService
    ),
  };
}
