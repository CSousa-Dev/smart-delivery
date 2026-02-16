import { Router } from 'express';
import { VerticalController } from '../controllers/vertical.controller';

export function createVerticalsRouter(controller: VerticalController): Router {
  const router = Router();

  router.get('/organization/verticals', (req, res, next) => controller.list(req, res, next));

  return router;
}
