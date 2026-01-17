import { Router } from 'express';
import { AttributeValueValidationController } from '../controllers/attribute-value-validation.controller';

export function createAttributeValueValidationRouter(
  controller: AttributeValueValidationController
): Router {
  const router = Router();

  router.post('/attributes/values/validate', (req, res, next) =>
    controller.validate(req, res, next)
  );

  return router;
}
