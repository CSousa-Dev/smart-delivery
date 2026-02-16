import { Router } from 'express';
import { AllowedValueController } from '../controllers/allowed-value.controller';

export function createAllowedValuesRouter(
  controller: AllowedValueController
): Router {
  const router = Router();

  router.post('/attributes/:attributeId/allowed-values', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.get('/attributes/:attributeId/allowed-values', (req, res, next) =>
    controller.list(req, res, next)
  );
  router.get(
    '/attributes/:attributeId/allowed-values/:allowedValueId',
    (req, res, next) => controller.get(req, res, next)
  );
  router.patch(
    '/attributes/:attributeId/allowed-values/:allowedValueId',
    (req, res, next) => controller.update(req, res, next)
  );
  router.delete(
    '/attributes/:attributeId/allowed-values/:allowedValueId',
    (req, res, next) => controller.delete(req, res, next)
  );

  return router;
}
