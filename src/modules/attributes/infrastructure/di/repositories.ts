import { PrismaClient } from '@prisma/client';
import { PrismaAttributeRepository } from '../repositories/attribute/attribute.repository.impl';
import { PrismaAllowedValueRepository } from '../repositories/allowed-value/allowed-value.repository.impl';
import { PrismaVerticalRepository } from '../repositories/vertical/vertical.repository.impl';
import { PrismaCategoryRepository } from '../repositories/category/category.repository.impl';
import { PrismaVerticalAttributeRepository } from '../repositories/vertical-attribute/vertical-attribute.repository.impl';
import { PrismaVerticalAllowedValueRepository } from '../repositories/vertical-allowed-value/vertical-allowed-value.repository.impl';
import { PrismaCategoryAttributeRepository } from '../repositories/category-attribute/category-attribute.repository.impl';
import { PrismaCategoryAllowedValueRepository } from '../repositories/category-allowed-value/category-allowed-value.repository.impl';

export function createAttributesRepositories(db: PrismaClient) {
  return {
    attributeRepository: new PrismaAttributeRepository(db),
    allowedValueRepository: new PrismaAllowedValueRepository(db),
    verticalRepository: new PrismaVerticalRepository(db),
    categoryRepository: new PrismaCategoryRepository(db),
    verticalAttributeRepository: new PrismaVerticalAttributeRepository(db),
    verticalAllowedValueRepository: new PrismaVerticalAllowedValueRepository(db),
    categoryAttributeRepository: new PrismaCategoryAttributeRepository(db),
    categoryAllowedValueRepository: new PrismaCategoryAllowedValueRepository(db),
  };
}
