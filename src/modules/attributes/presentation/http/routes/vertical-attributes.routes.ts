import { Router } from 'express';
import { VerticalAttributeController } from '../controllers/vertical-attribute.controller';

export function createVerticalAttributesRouter(
  controller: VerticalAttributeController
): Router {
  const router = Router();

  router.post('/attributes/verticals/:verticalId/attributes', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
