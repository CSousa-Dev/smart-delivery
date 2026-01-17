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
    attributeController: new AttributeController(services.createAttributeService),
    verticalController: new VerticalController(services.createVerticalService),
    categoryController: new CategoryController(services.createCategoryService),
    allowedValueController: new AllowedValueController(services.createAllowedValueService),
    verticalAttributeController: new VerticalAttributeController(
      services.linkAttributeToVerticalService
    ),
    categoryAttributeController: new CategoryAttributeController(
      services.linkAttributeToCategoryService
    ),
    resolvedAttributeController: new ResolvedAttributeController(
      services.resolveAttributeConfigurationService
    ),
    attributeValueValidationController: new AttributeValueValidationController(
      services.validateAttributeValuesService
    ),
  };
}
