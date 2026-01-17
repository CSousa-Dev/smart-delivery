import { Router } from 'express';
import { BusinessUnitController } from '../controllers/business-unit.controller';
import { accessControlMiddleware } from '../middlewares/access-control.middleware';

export function createBusinessUnitsRouter(controller: BusinessUnitController): Router {
  const router = Router();

  router.post('/organization/business-units', (req, res, next) =>
    controller.create(req, res, next)
  );

  router.get('/organization/business-units', (req, res, next) =>
    controller.list(req, res, next)
  );

  router.get('/organization/business-units/:id', accessControlMiddleware, (req, res, next) =>
    controller.getById(req, res, next)
  );

  return router;
}
