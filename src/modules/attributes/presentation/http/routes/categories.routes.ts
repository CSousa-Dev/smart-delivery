import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

export function createCategoriesRouter(controller: CategoryController): Router {
  const router = Router();

  router.post('/attributes/categories', (req, res, next) =>
    controller.create(req, res, next)
  );
  router.get('/attributes/categories', (req, res, next) =>
    controller.list(req, res, next)
  );
  router.get('/attributes/categories/:categoryId', (req, res, next) => {
    req.body = { categoryId: req.params.categoryId };
    return controller.get(req, res, next);
  });
  router.patch('/attributes/categories/:categoryId', (req, res, next) => {
    req.body = { ...req.body, categoryId: req.params.categoryId };
    return controller.update(req, res, next);
  });
  router.patch('/attributes/categories/:categoryId/inactivate', (req, res, next) => {
    req.body = { categoryId: req.params.categoryId };
    return controller.inactivate(req, res, next);
  });
  router.patch('/attributes/categories/:categoryId/activate', (req, res, next) => {
    req.body = { categoryId: req.params.categoryId };
    return controller.activate(req, res, next);
  });

  return router;
}
