/**
 * E2E tests for Open Cart.
 * Requires DATABASE_URL_CART_TEST (and cart DB running) for the happy-path test to pass.
 * Error-path tests (400/404) do not require the DB.
 */
import express from 'express';
import request from 'supertest';
import { config } from '../../../src/config/environment';
import { bootstrapCartModule } from '../../../src/modules/cart/infrastructure/di';
import { bootstrapAuthModule } from '../../../src/modules/auth/infrastructure/di';
import { errorHandler } from '../../../src/shared/middlewares/errorHandler';
import { notFoundHandler } from '../../../src/shared/middlewares/notFoundHandler';

const describeIf = process.env.DATABASE_URL_CART_TEST ? describe : describe.skip;

const basePath = config.apiPrefix;

function buildCartOnlyApp(): express.Application {
  const app = express();
  app.use(express.json());
  const { authenticateRequestService } = bootstrapAuthModule();
  const { router: cartRouter } = bootstrapCartModule({ authenticateRequestService });
  app.use(basePath, cartRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

function createTestJwt(userId: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ sub: userId })).toString('base64url');
  return `${header}.${payload}.signature`;
}

describeIf('E2E Open Cart – use case and error flows', () => {
  let app: express.Application;

  beforeAll(() => {
    process.env.DATABASE_URL_CART = process.env.DATABASE_URL_CART_TEST;
    app = buildCartOnlyApp();
  });

  it('should return 201 and cartId when body is valid (happy path)', async () => {
    const body = {
      customerId: `customer-e2e-happy-${Date.now()}`,
      verticalId: 'vertical-e2e-1',
      businessUnitId: 'business-unit-e2e-1',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.cartId).toBeDefined();
    expect(typeof response.body.data.cartId).toBe('string');
    expect(response.body.data.cartId.length).toBeGreaterThan(0);
  });

  it('should add item and read cart with items', async () => {
    const customerId = `customer-e2e-item-${Date.now()}`;
    const cartResponse = await request(app)
      .post(`${basePath}/carts/open`)
      .send({
        customerId,
        verticalId: 'vertical-e2e-1',
        businessUnitId: 'business-unit-e2e-1',
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(customerId)}`);

    expect(cartResponse.status).toBe(201);
    const cartId = cartResponse.body.data.cartId;

    const addItemResponse = await request(app)
      .post(`${basePath}/carts/${cartId}/items`)
      .send({
        item: {
          id: 'item-e2e-1',
          productCatalogId: 'product-e2e-1',
          sku: 'SKU-E2E-1',
          description: 'E2E Product',
          quantity: 1,
          businessUnitId: 'business-unit-e2e-1',
          verticalId: 'vertical-e2e-1',
          categories: ['cat-e2e-1'],
        },
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(customerId)}`);

    expect(addItemResponse.status).toBe(201);
    expect(addItemResponse.body.success).toBe(true);
    expect(addItemResponse.body.data?.itemId).toBe('item-e2e-1');

    const readResponse = await request(app)
      .get(`${basePath}/carts/${cartId}`)
      .set('Authorization', `Bearer ${createTestJwt(customerId)}`);

    expect(readResponse.status).toBe(200);
    expect(readResponse.body.success).toBe(true);
    expect(readResponse.body.data?.items?.length).toBe(1);
    expect(readResponse.body.data?.items?.[0]?.sku).toBe('SKU-E2E-1');
  });

  it('should return existing cartId when customer already has cart in flow', async () => {
    const body = {
      customerId: 'customer-e2e-conflict',
      verticalId: 'vertical-e2e-1',
      businessUnitId: 'business-unit-e2e-1',
    };

    const first = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    if (first.status !== 201) {
      return;
    }

    const second = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    expect(second.status).toBe(201);
    expect(second.body.success).toBe(true);
    expect(second.body.data?.cartId).toBeDefined();
    expect(second.body.data?.cartId).toBe(first.body.data?.cartId);
  });

  it('should return 400 when customerId is missing', async () => {
    const body = {
      verticalId: 'vertical-1',
      businessUnitId: 'business-unit-1',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt('actor-user')}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.code).toBe('INVALID_BUSINESS_CONTEXT');
    expect(response.body.error.message).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should return 400 when verticalId is missing', async () => {
    const body = {
      customerId: 'customer-1',
      businessUnitId: 'business-unit-1',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error?.code).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should return 400 when businessUnitId is missing', async () => {
    const body = {
      customerId: 'customer-1',
      verticalId: 'vertical-1',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error?.code).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should return 400 when customerId is empty string', async () => {
    const body = {
      customerId: '',
      verticalId: 'vertical-1',
      businessUnitId: 'business-unit-1',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt('actor-user')}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error?.code).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should return 400 when verticalId is empty string', async () => {
    const body = {
      customerId: 'customer-1',
      verticalId: '',
      businessUnitId: 'business-unit-1',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    expect(response.status).toBe(400);
    expect(response.body.error?.code).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should return 400 when businessUnitId is empty string', async () => {
    const body = {
      customerId: 'customer-1',
      verticalId: 'vertical-1',
      businessUnitId: '',
    };

    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt(body.customerId)}`);

    expect(response.status).toBe(400);
    expect(response.body.error?.code).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should return 404 for wrong route', async () => {
    const response = await request(app)
      .post(`${basePath}/carts/wrong`)
      .send({})
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt('actor-user')}`);

    expect(response.status).toBe(404);
  });

  it('should return 400 when body is empty object', async () => {
    const response = await request(app)
      .post(`${basePath}/carts/open`)
      .send({})
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${createTestJwt('actor-user')}`);

    expect(response.status).toBe(400);
    expect(response.body.error?.code).toBe('INVALID_BUSINESS_CONTEXT');
  });
});
