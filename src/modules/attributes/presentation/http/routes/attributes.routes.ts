import { Router } from 'express';
import { AttributeController } from '../controllers/attribute.controller';

export function createAttributesRouter(controller: AttributeController): Router {
  const router = Router();

  router.post('/attributes', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
