import { AttributeResolutionService } from '../../domain/services/attribute-resolution.service';
import { AttributeValueValidationService } from '../../domain/services/attribute-value-validation.service';
import { CreateAttributeService } from '../../application/services/create-attribute.service';
import { GetAttributeService } from '../../application/services/get-attribute.service';
import { ListAttributesService } from '../../application/services/list-attributes.service';
import { UpdateAttributeService } from '../../application/services/update-attribute.service';
import { DeleteAttributeService } from '../../application/services/delete-attribute.service';
import { CreateVerticalService } from '../../application/services/create-vertical.service';
import { CreateCategoryService } from '../../application/services/create-category.service';
import { UpdateCategoryService } from '../../application/services/update-category.service';
import { InactivateCategoryService } from '../../application/services/inactivate-category.service';
import { ActivateCategoryService } from '../../application/services/activate-category.service';
import { GetCategoryService } from '../../application/services/get-category.service';
import { ListCategoriesService } from '../../application/services/list-categories.service';
import { CreateAllowedValueService } from '../../application/services/create-allowed-value.service';
import { GetAllowedValueService } from '../../application/services/get-allowed-value.service';
import { ListAllowedValuesService } from '../../application/services/list-allowed-values.service';
import { UpdateAllowedValueService } from '../../application/services/update-allowed-value.service';
import { DeleteAllowedValueService } from '../../application/services/delete-allowed-value.service';
import { LinkAttributeToVerticalService } from '../../application/services/link-attribute-to-vertical.service';
import { LinkAttributeToCategoryService } from '../../application/services/link-attribute-to-category.service';
import { UpdateVerticalAttributeService } from '../../application/services/update-vertical-attribute.service';
import { UnlinkAttributeFromVerticalService } from '../../application/services/unlink-attribute-from-vertical.service';
import { UpdateCategoryAttributeService } from '../../application/services/update-category-attribute.service';
import { UnlinkAttributeFromCategoryService } from '../../application/services/unlink-attribute-from-category.service';
import { ListVerticalAttributesService } from '../../application/services/list-vertical-attributes.service';
import { ListCategoryAttributesService } from '../../application/services/list-category-attributes.service';
import { ResolveAttributeConfigurationService } from '../../application/services/resolve-attribute-configuration.service';
import { ValidateAttributeValuesService } from '../../application/services/validate-attribute-values.service';
import { UpdateVerticalService } from '../../application/services/update-vertical.service';
import { InactivateVerticalService } from '../../application/services/inactivate-vertical.service';
import { GetVerticalService } from '../../application/services/get-vertical.service';
import { ListVerticalsService } from '../../application/services/list-verticals.service';
import { ActivateVerticalService } from '../../application/services/activate-vertical.service';
import { CategoryHierarchyService } from '../../domain/services/category-hierarchy.service';
import { createAttributesRepositories } from './repositories';
import { createAttributesAdapters } from './adapters';

type Repositories = ReturnType<typeof createAttributesRepositories>;
type Adapters = ReturnType<typeof createAttributesAdapters>;

export function createAttributesDomainServices() {
  return {
    attributeResolutionService: new AttributeResolutionService(),
    attributeValueValidationService: new AttributeValueValidationService(),
    categoryHierarchyService: new CategoryHierarchyService(),
  };
}

export function createAttributesAppServices(
  repos: Repositories,
  domain: ReturnType<typeof createAttributesDomainServices>,
  adapters: Adapters
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
    getAttributeService: new GetAttributeService(repos.attributeRepository),
    listAttributesService: new ListAttributesService(repos.attributeRepository),
    updateAttributeService: new UpdateAttributeService(
      repos.attributeRepository,
      repos.allowedValueRepository
    ),
    deleteAttributeService: new DeleteAttributeService(
      repos.attributeRepository,
      repos.allowedValueRepository,
      repos.verticalAttributeRepository,
      repos.categoryAttributeRepository
    ),
    createVerticalService: new CreateVerticalService(repos.verticalRepository),
    updateVerticalService: new UpdateVerticalService(repos.verticalRepository),
    inactivateVerticalService: new InactivateVerticalService(
      repos.verticalRepository,
      adapters.verticalEventPublisher
    ),
    activateVerticalService: new ActivateVerticalService(
      repos.verticalRepository,
      adapters.verticalEventPublisher
    ),
    getVerticalService: new GetVerticalService(repos.verticalRepository),
    listVerticalsService: new ListVerticalsService(repos.verticalRepository),
    createCategoryService: new CreateCategoryService(
      repos.categoryRepository,
      repos.verticalRepository,
      domain.categoryHierarchyService
    ),
    updateCategoryService: new UpdateCategoryService(
      repos.categoryRepository,
      domain.categoryHierarchyService
    ),
    inactivateCategoryService: new InactivateCategoryService(repos.categoryRepository),
    activateCategoryService: new ActivateCategoryService(repos.categoryRepository),
    getCategoryService: new GetCategoryService(repos.categoryRepository),
    listCategoriesService: new ListCategoriesService(repos.categoryRepository),
    createAllowedValueService: new CreateAllowedValueService(
      repos.attributeRepository,
      repos.allowedValueRepository
    ),
    getAllowedValueService: new GetAllowedValueService(repos.allowedValueRepository),
    listAllowedValuesService: new ListAllowedValuesService(repos.allowedValueRepository),
    updateAllowedValueService: new UpdateAllowedValueService(
      repos.attributeRepository,
      repos.allowedValueRepository
    ),
    deleteAllowedValueService: new DeleteAllowedValueService(repos.allowedValueRepository),
    linkAttributeToVerticalService: new LinkAttributeToVerticalService(
      repos.verticalRepository,
      repos.attributeRepository,
      repos.allowedValueRepository,
      repos.verticalAttributeRepository,
      repos.verticalAllowedValueRepository
    ),
    listVerticalAttributesService: new ListVerticalAttributesService(
      repos.verticalRepository,
      repos.attributeRepository,
      repos.verticalAttributeRepository,
      repos.verticalAllowedValueRepository
    ),
    updateVerticalAttributeService: new UpdateVerticalAttributeService(
      repos.verticalRepository,
      repos.attributeRepository,
      repos.allowedValueRepository,
      repos.verticalAttributeRepository,
      repos.verticalAllowedValueRepository
    ),
    unlinkAttributeFromVerticalService: new UnlinkAttributeFromVerticalService(
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
    listCategoryAttributesService: new ListCategoryAttributesService(
      repos.categoryRepository,
      repos.attributeRepository,
      repos.categoryAttributeRepository,
      repos.categoryAllowedValueRepository
    ),
    updateCategoryAttributeService: new UpdateCategoryAttributeService(
      repos.categoryRepository,
      repos.categoryAttributeRepository,
      repos.categoryAllowedValueRepository,
      repos.attributeRepository,
      repos.verticalAttributeRepository,
      repos.allowedValueRepository,
      repos.verticalAllowedValueRepository
    ),
    unlinkAttributeFromCategoryService: new UnlinkAttributeFromCategoryService(
      repos.categoryAttributeRepository,
      repos.categoryAllowedValueRepository
    ),
    resolveAttributeConfigurationService,
    validateAttributeValuesService: new ValidateAttributeValuesService(
      resolveAttributeConfigurationService,
      domain.attributeValueValidationService
    ),
  };
}
