import { PrismaClient } from '../database/prisma/generated';
import { PrismaCartRepository } from '../repositories/cart/cart.repository.impl';

export function createCartRepositories(prisma: PrismaClient) {
  return {
    cartRepository: new PrismaCartRepository(prisma),
  };
}
