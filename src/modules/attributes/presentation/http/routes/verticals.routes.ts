import { Router } from 'express';
import { VerticalController } from '../controllers/vertical.controller';

export function createVerticalsRouter(controller: VerticalController): Router {
  const router = Router();

  router.post('/attributes/verticals', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.get('/attributes/verticals', (req, res, next) =>
    controller.list(req, res, next)
  );
  router.get('/attributes/verticals/:verticalId', (req, res, next) => {
    req.body = { verticalId: req.params.verticalId };
    return controller.get(req, res, next);
  });
  router.patch('/attributes/verticals/:verticalId', (req, res, next) => {
    req.body = { ...req.body, verticalId: req.params.verticalId };
    return controller.update(req, res, next);
  });
  router.patch('/attributes/verticals/:verticalId/inactivate', (req, res, next) => {
    req.body = { verticalId: req.params.verticalId };
    return controller.inactivate(req, res, next);
  });
  router.patch('/attributes/verticals/:verticalId/activate', (req, res, next) => {
    req.body = { verticalId: req.params.verticalId };
    return controller.activate(req, res, next);
  });

  return router;
}
