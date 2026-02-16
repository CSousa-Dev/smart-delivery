import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { Category } from '../../../domain/entities/category.entity';
import { InvalidCategoryChainError } from '../../../domain/errors/resolve.errors';
import { CategoryMapper } from './category.mapper';

type CategoryRecord = {
  id: string;
  verticalId: string;
  parentCategoryId: string | null;
  name: string;
  code: string;
  description: string;
  depth: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: CategoryMapper.toPersistence(category),
    });
  }

  async update(category: Category): Promise<void> {
    const { id, createdAt, ...data } = CategoryMapper.toPersistence(category);
    await this.prisma.category.update({
      where: { id: category.getId().value },
      data,
    });
  }

  async existsByNameAndVerticalId(
    name: string,
    verticalId: string,
    parentCategoryId: string | null
  ): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: { name, verticalId, parentCategoryId },
    });

    return count > 0;
  }

  async existsByCodeAndVerticalId(
    code: string,
    verticalId: string,
    parentCategoryId: string | null
  ): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: { code, verticalId, parentCategoryId },
    });

    return count > 0;
  }

  async existsByNameExcludingId(
    name: string,
    verticalId: string,
    parentCategoryId: string | null,
    excludeId: string
  ): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: {
        name,
        verticalId,
        parentCategoryId,
        id: { not: excludeId },
      },
    });

    return count > 0;
  }

  async existsByCodeExcludingId(
    code: string,
    verticalId: string,
    parentCategoryId: string | null,
    excludeId: string
  ): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: {
        code,
        verticalId,
        parentCategoryId,
        id: { not: excludeId },
      },
    });

    return count > 0;
  }

  async findById(id: string): Promise<Category | null> {
    const found = (await this.prisma.category.findUnique({
      where: { id },
    })) as CategoryRecord | null;

    if (!found) {
      return null;
    }

    return CategoryMapper.toDomain(found);
  }

  async listAll(): Promise<Category[]> {
    const items = (await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    })) as CategoryRecord[];

    return items.map((item) => CategoryMapper.toDomain(item));
  }

  async listByVerticalId(verticalId: string): Promise<Category[]> {
    const items = (await this.prisma.category.findMany({
      where: { verticalId },
      orderBy: { name: 'asc' },
    })) as CategoryRecord[];

    return items.map((item) => CategoryMapper.toDomain(item));
  }

  async getAncestry(id: string): Promise<Category[]> {
    const ancestors: Category[] = [];
    let currentId: string | null = id;

    while (currentId) {
      const current = (await this.prisma.category.findUnique({
        where: { id: currentId },
      })) as CategoryRecord | null;

      if (!current || !current.parentCategoryId) {
        break;
      }

      const parent = (await this.prisma.category.findUnique({
        where: { id: current.parentCategoryId },
      })) as CategoryRecord | null;

      if (!parent) {
        break;
      }

      ancestors.push(CategoryMapper.toDomain(parent));
      currentId = parent.id;
    }

    return ancestors;
  }

  async getInheritanceChain(id: string): Promise<Category[]> {
    return this.getAncestry(id);
  }

  async validateChain(verticalId: string, categoryIds: string[]): Promise<void> {
    if (categoryIds.length === 0) {
      return;
    }

    const categories: Array<{
      id: string;
      verticalId: string;
      parentCategoryId: string | null;
    }> = await this.prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: {
        id: true,
        verticalId: true,
        parentCategoryId: true,
      },
    });

    const byId = new Map(categories.map((category) => [category.id, category]));
    for (const categoryId of categoryIds) {
      const category = byId.get(categoryId);
      if (!category || category.verticalId !== verticalId) {
        throw new InvalidCategoryChainError();
      }
    }

    for (let index = 0; index < categoryIds.length - 1; index += 1) {
      const parentId = categoryIds[index];
      const childId = categoryIds[index + 1];
      if (!parentId || !childId) {
        throw new InvalidCategoryChainError();
      }
      const child = byId.get(childId);
      if (!child || child.parentCategoryId !== parentId) {
        throw new InvalidCategoryChainError();
      }
    }
  }
}
