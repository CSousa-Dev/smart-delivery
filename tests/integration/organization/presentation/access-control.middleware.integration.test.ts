import express from 'express';
import request from 'supertest';
import { accessControlMiddleware } from '../../../../src/modules/organization/presentation/http/middlewares/access-control.middleware';
import { errorHandler } from '../../../../src/shared/middlewares/errorHandler';

const buildApp = (route: string) => {
  const app = express();
  app.get(route, accessControlMiddleware, (_req, res) => {
    res.status(200).json({ success: true });
  });
  app.use(errorHandler);
  return app;
};

describe('AccessControlMiddleware integration', () => {
  it('should reject user route without actor user id', async () => {
    const app = buildApp('/organization/users/:id');

    const response = await request(app).get('/organization/users/user-1');

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.error?.code).toBe('FORBIDDEN');
  });

  it('should reject user route when actor user id differs', async () => {
    const app = buildApp('/organization/users/:id');

    const response = await request(app)
      .get('/organization/users/user-1')
      .set('x-actor-user-id', 'user-2');

    expect(response.status).toBe(403);
    expect(response.body.error?.code).toBe('FORBIDDEN');
  });

  it('should allow user route when actor user id matches', async () => {
    const app = buildApp('/organization/users/:id');

    const response = await request(app)
      .get('/organization/users/user-1')
      .set('x-actor-user-id', 'user-1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should reject business unit route without actor user id', async () => {
    const app = buildApp('/organization/business-units/:id');

    const response = await request(app).get('/organization/business-units/unit-1');

    expect(response.status).toBe(403);
    expect(response.body.error?.code).toBe('FORBIDDEN');
  });

  it('should allow business unit route with actor user id', async () => {
    const app = buildApp('/organization/business-units/:id');

    const response = await request(app)
      .get('/organization/business-units/unit-1')
      .set('x-actor-user-id', 'user-1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
