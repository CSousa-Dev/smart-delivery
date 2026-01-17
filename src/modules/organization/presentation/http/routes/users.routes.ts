import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { accessControlMiddleware } from '../middlewares/access-control.middleware';

export function createUsersRouter(controller: UserController): Router {
  const router = Router();

  router.post('/organization/users', (req, res, next) =>
    controller.create(req, res, next)
  );

  router.get('/organization/users', (req, res, next) =>
    controller.list(req, res, next)
  );

  router.get('/organization/users/:id', accessControlMiddleware, (req, res, next) =>
    controller.getById(req, res, next)
  );

  return router;
}
