/**
 * Application Configuration
 * Configura o Express e registra módulos
 */

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/environment';
import { requestLogger } from './shared/middlewares/requestLogger';
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';
import { bootstrapAttributesModule } from './modules/attributes/infrastructure/di';
import { bootstrapOrganizationModule } from './modules/organization/infrastructure/di';
import { bootstrapProductsModule } from './modules/products/infrastructure/di';
import { bootstrapInventoryModule } from './modules/inventory/infrastructure/di';
import { bootstrapCartModule } from './modules/cart/infrastructure/di';
import { bootstrapAuthModule } from './modules/auth/infrastructure/di';

/**
 * Cria e configura a aplicação Express
 */
function createApp(): Application {
  const app = express();

  // ========================================
  // Security & Parsing Middlewares
  // ========================================
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ========================================
  // Custom Middlewares
  // ========================================
  app.use(requestLogger);

  // ========================================
  // Health Check Route
  // ========================================
  app.get('/health', (req, res) => {
    res.json({
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
    });
  });

  // ========================================
  // Load Modules Here
  const attributesModule = bootstrapAttributesModule();
  const { router: organizationRouter } = bootstrapOrganizationModule({
    listVerticalsFromCatalog: () =>
      attributesModule.appServices.listVerticalsService.execute().then((r) => ({
        items: r.items.map((i) => ({
          code: i.code,
          name: i.name,
          description: i.description,
          isActive: i.isActive,
        })),
      })),
  });
  const { router: productsRouter } = bootstrapProductsModule();
  const { router: inventoryRouter } = bootstrapInventoryModule();
  const { authenticateRequestService } = bootstrapAuthModule();
  const { router: cartRouter } = bootstrapCartModule({ authenticateRequestService });
  app.use(config.apiPrefix, attributesModule.router);
  app.use(config.apiPrefix, organizationRouter);
  app.use(config.apiPrefix, productsRouter);
  app.use(config.apiPrefix, inventoryRouter);
  app.use(config.apiPrefix, cartRouter);
  // ========================================

  // ========================================
  // Error Handlers (must be last)
  // ========================================
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export const app = createApp();

