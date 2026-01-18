import { Router } from 'express';
import { BusinessUnitVerticalController } from '../controllers/business-unit-vertical.controller';

export function createBusinessUnitVerticalsRouter(
  controller: BusinessUnitVerticalController
): Router {
  const router = Router();

  router.post('/organization/business-units/:businessUnitId/verticals', (req, res, next) =>
    controller.link(req, res, next)
  );

  router.delete(
    '/organization/business-units/:businessUnitId/verticals/:verticalId',
    (req, res, next) => controller.unlink(req, res, next)
  );

  router.get('/organization/business-units/:businessUnitId/verticals', (req, res, next) =>
    controller.list(req, res, next)
  );

  return router;
}
