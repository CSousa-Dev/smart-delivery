import { Router } from 'express';
import { VerticalController } from '../controllers/vertical.controller';

export function createVerticalsRouter(controller: VerticalController): Router {
  const router = Router();

  router.post('/attributes/verticals', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
