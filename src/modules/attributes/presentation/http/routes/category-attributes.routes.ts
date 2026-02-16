import { Router } from 'express';
import { CategoryAttributeController } from '../controllers/category-attribute.controller';

export function createCategoryAttributesRouter(
  controller: CategoryAttributeController
): Router {
  const router = Router();

  router.get('/attributes/categories/:categoryId/attributes', (req, res, next) =>
    controller.list(req, res, next)
  );
  router.post('/attributes/categories/:categoryId/attributes', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.patch(
    '/attributes/categories/:categoryId/attributes/:attributeId',
    (req, res, next) => controller.update(req, res, next)
  );
  router.delete(
    '/attributes/categories/:categoryId/attributes/:attributeId',
    (req, res, next) => controller.delete(req, res, next)
  );

  return router;
}
