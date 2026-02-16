import { AttributeController } from '../../presentation/http/controllers/attribute.controller';
import { VerticalController } from '../../presentation/http/controllers/vertical.controller';
import { CategoryController } from '../../presentation/http/controllers/category.controller';
import { AllowedValueController } from '../../presentation/http/controllers/allowed-value.controller';
import { VerticalAttributeController } from '../../presentation/http/controllers/vertical-attribute.controller';
import { CategoryAttributeController } from '../../presentation/http/controllers/category-attribute.controller';
import { ResolvedAttributeController } from '../../presentation/http/controllers/resolved-attribute.controller';
import { AttributeValueValidationController } from '../../presentation/http/controllers/attribute-value-validation.controller';
import { createAttributesAppServices } from './services';

type AppServices = ReturnType<typeof createAttributesAppServices>;

export function createAttributesControllers(services: AppServices) {
  return {
    attributeController: new AttributeController(
      services.createAttributeService,
      services.getAttributeService,
      services.listAttributesService,
      services.updateAttributeService,
      services.deleteAttributeService
    ),
    verticalController: new VerticalController(
      services.createVerticalService,
      services.updateVerticalService,
      services.inactivateVerticalService,
      services.activateVerticalService,
      services.getVerticalService,
      services.listVerticalsService
    ),
    categoryController: new CategoryController(
      services.createCategoryService,
      services.updateCategoryService,
      services.inactivateCategoryService,
      services.activateCategoryService,
      services.getCategoryService,
      services.listCategoriesService
    ),
    allowedValueController: new AllowedValueController(
      services.createAllowedValueService,
      services.getAllowedValueService,
      services.listAllowedValuesService,
      services.updateAllowedValueService,
      services.deleteAllowedValueService
    ),
    verticalAttributeController: new VerticalAttributeController(
      services.linkAttributeToVerticalService,
      services.updateVerticalAttributeService,
      services.unlinkAttributeFromVerticalService,
      services.listVerticalAttributesService
    ),
    categoryAttributeController: new CategoryAttributeController(
      services.linkAttributeToCategoryService,
      services.updateCategoryAttributeService,
      services.unlinkAttributeFromCategoryService,
      services.listCategoryAttributesService
    ),
    resolvedAttributeController: new ResolvedAttributeController(
      services.resolveAttributeConfigurationService
    ),
    attributeValueValidationController: new AttributeValueValidationController(
      services.validateAttributeValuesService
    ),
  };
}
