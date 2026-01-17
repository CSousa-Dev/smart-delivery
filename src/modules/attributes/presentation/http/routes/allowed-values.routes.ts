import { Router } from 'express';
import { AllowedValueController } from '../controllers/allowed-value.controller';

export function createAllowedValuesRouter(
  controller: AllowedValueController
): Router {
  const router = Router();

  router.post('/attributes/:attributeId/allowed-values', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
