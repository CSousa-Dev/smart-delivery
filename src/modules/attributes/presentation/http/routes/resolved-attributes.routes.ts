import { Router } from 'express';
import { ResolvedAttributeController } from '../controllers/resolved-attribute.controller';

export function createResolvedAttributesRouter(
  controller: ResolvedAttributeController
): Router {
  const router = Router();

  router.get('/attributes', (req, res, next) => controller.list(req, res, next));
  router.get('/attributes/:attributeId', (req, res, next) =>
    controller.get(req, res, next)
  );

  return router;
}
