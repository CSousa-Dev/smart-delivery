import { Router } from 'express';
import { createAttributesRouter } from './attributes.routes';
import { createVerticalsRouter } from './verticals.routes';
import { createCategoriesRouter } from './categories.routes';
import { createAllowedValuesRouter } from './allowed-values.routes';
import { createVerticalAttributesRouter } from './vertical-attributes.routes';
import { createCategoryAttributesRouter } from './category-attributes.routes';
import { createResolvedAttributesRouter } from './resolved-attributes.routes';
import { createAttributeValueValidationRouter } from './attribute-value-validation.routes';
import { AttributeController } from '../controllers/attribute.controller';
import { VerticalController } from '../controllers/vertical.controller';
import { CategoryController } from '../controllers/category.controller';
import { AllowedValueController } from '../controllers/allowed-value.controller';
import { VerticalAttributeController } from '../controllers/vertical-attribute.controller';
import { CategoryAttributeController } from '../controllers/category-attribute.controller';
import { ResolvedAttributeController } from '../controllers/resolved-attribute.controller';
import { AttributeValueValidationController } from '../controllers/attribute-value-validation.controller';

export interface AttributesControllers {
  attributeController: AttributeController;
  verticalController: VerticalController;
  categoryController: CategoryController;
  allowedValueController: AllowedValueController;
  verticalAttributeController: VerticalAttributeController;
  categoryAttributeController: CategoryAttributeController;
  resolvedAttributeController: ResolvedAttributeController;
  attributeValueValidationController: AttributeValueValidationController;
}

export function createAttributesHttpRouter(controllers: AttributesControllers): Router {
  const router = Router();

  router.use(createAttributesRouter(controllers.attributeController));
  router.use(createVerticalsRouter(controllers.verticalController));
  router.use(createCategoriesRouter(controllers.categoryController));
  router.use(createAllowedValuesRouter(controllers.allowedValueController));
  router.use(createVerticalAttributesRouter(controllers.verticalAttributeController));
  router.use(createCategoryAttributesRouter(controllers.categoryAttributeController));
  router.use(createResolvedAttributesRouter(controllers.resolvedAttributeController));
  router.use(createAttributeValueValidationRouter(controllers.attributeValueValidationController));

  return router;
}
