import { Router } from 'express';
import { AttributeController } from '../controllers/attribute.controller';

export function createAttributesRouter(controller: AttributeController): Router {
  const router = Router();

  router.post('/attributes', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.get('/attributes/definitions', (req, res, next) =>
    controller.list(req, res, next)
  );
  router.get('/attributes/definitions/:attributeId', (req, res, next) =>
    controller.get(req, res, next)
  );
  router.patch('/attributes/definitions/:attributeId', (req, res, next) =>
    controller.update(req, res, next)
  );
  router.delete('/attributes/definitions/:attributeId', (req, res, next) =>
    controller.delete(req, res, next)
  );

  return router;
}
