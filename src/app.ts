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
  const { router: attributesRouter } = bootstrapAttributesModule();
  const { router: organizationRouter } = bootstrapOrganizationModule();
  const { router: productsRouter } = bootstrapProductsModule();
  app.use(`${config.apiPrefix}/${config.apiVersion}`, attributesRouter);
  app.use(`${config.apiPrefix}/${config.apiVersion}`, organizationRouter);
  app.use(`${config.apiPrefix}/${config.apiVersion}`, productsRouter);
  // ========================================

  // ========================================
  // Error Handlers (must be last)
  // ========================================
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export const app = createApp();

