import { Router } from 'express';
import { UnitOfMeasureController } from '../controllers/unit-of-measure.controller';

export function createUnitsOfMeasureRouter(controller: UnitOfMeasureController): Router {
  const router = Router();

  router.post('/inventory/units-of-measure', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.patch('/inventory/units-of-measure/:id', (req, res, next) =>
    controller.update(req, res, next)
  );

  return router;
}
