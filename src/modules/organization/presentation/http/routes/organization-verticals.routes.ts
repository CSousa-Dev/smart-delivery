import { Router } from 'express';
import { OrganizationVerticalController } from '../controllers/organization-vertical.controller';

export function createOrganizationVerticalsRouter(
  controller: OrganizationVerticalController
): Router {
  const router = Router();

  router.post('/organization/organizations/:organizationId/verticals', (req, res, next) =>
    controller.link(req, res, next)
  );

  router.delete(
    '/organization/organizations/:organizationId/verticals/:verticalCode',
    (req, res, next) => controller.unlink(req, res, next)
  );

  router.get('/organization/organizations/:organizationId/verticals', (req, res, next) =>
    controller.list(req, res, next)
  );

  return router;
}
