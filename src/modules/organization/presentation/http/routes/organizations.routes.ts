import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';

export function createOrganizationsRouter(controller: OrganizationController): Router {
  const router = Router();

  router.post('/organization/organizations', (req, res, next) =>
    controller.create(req, res, next)
  );

  router.get('/organization/organizations', (req, res, next) =>
    controller.list(req, res, next)
  );

  router.get('/organization/organizations/:id', (req, res, next) =>
    controller.getById(req, res, next)
  );

  router.put('/organization/organizations/:id', (req, res, next) =>
    controller.update(req, res, next)
  );

  return router;
}
