import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

export function createCategoriesRouter(controller: CategoryController): Router {
  const router = Router();

  router.post('/attributes/categories', (req, res, next) =>
    controller.create(req, res, next)
  );

  return router;
}
