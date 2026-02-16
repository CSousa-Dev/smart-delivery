import { Router } from 'express';
import { VerticalAttributeController } from '../controllers/vertical-attribute.controller';

export function createVerticalAttributesRouter(
  controller: VerticalAttributeController
): Router {
  const router = Router();

  router.get('/attributes/verticals/:verticalId/attributes', (req, res, next) =>
    controller.list(req, res, next)
  );
  router.post('/attributes/verticals/:verticalId/attributes', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.patch(
    '/attributes/verticals/:verticalId/attributes/:attributeId',
    (req, res, next) => controller.update(req, res, next)
  );
  router.delete(
    '/attributes/verticals/:verticalId/attributes/:attributeId',
    (req, res, next) => controller.delete(req, res, next)
  );

  return router;
}
