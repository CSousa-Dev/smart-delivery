import { PrismaClient } from '../database/prisma/generated';
import { PrismaProductRepository } from '../repositories/product/product.repository.impl';

export function createProductsRepositories(prisma: PrismaClient) {
  return {
    productRepository: new PrismaProductRepository(prisma),
  };
}
