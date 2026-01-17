import { Router } from 'express';
import { CategoryAttributeController } from '../controllers/category-attribute.controller';

export function createCategoryAttributesRouter(
  controller: CategoryAttributeController
): Router {
  const router = Router();

  router.post('/attributes/categories/:categoryId/attributes', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
