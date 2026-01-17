import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { Category } from '../../../domain/entities/category.entity';
import { InvalidCategoryChainError } from '../../../domain/errors/resolve.errors';
import { CategoryMapper } from './category.mapper';

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: CategoryMapper.toPersistence(category),
    });
  }

  async existsByNameAndVerticalId(name: string, verticalId: string): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: { name, verticalId },
    });

    return count > 0;
  }

  async existsByCodeAndVerticalId(code: string, verticalId: string): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: { code, verticalId },
    });

    return count > 0;
  }

  async findById(id: string): Promise<Category | null> {
    const found = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return Category.create({
      id: found.id,
      verticalId: found.verticalId,
      parentCategoryId: found.parentCategoryId,
      name: found.name,
      code: found.code,
      description: found.description,
      depth: found.depth,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async getAncestry(id: string): Promise<Category[]> {
    const ancestors: Category[] = [];
    let currentId: string | null = id;

    while (currentId) {
      const current: {
        id: string;
        verticalId: string;
        parentCategoryId: string | null;
        name: string;
        code: string;
        description: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date | null;
      } | null = await this.prisma.category.findUnique({
        where: { id: currentId },
      });

      if (!current || !current.parentCategoryId) {
        break;
      }

      const parent: {
        id: string;
        verticalId: string;
        parentCategoryId: string | null;
        name: string;
        code: string;
        description: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date | null;
      } | null = await this.prisma.category.findUnique({
        where: { id: current.parentCategoryId },
      });

      if (!parent) {
        break;
      }

      ancestors.push(
        Category.create({
          id: parent.id,
          verticalId: parent.verticalId,
          parentCategoryId: parent.parentCategoryId,
          name: parent.name,
          code: parent.code,
          description: parent.description,
          depth: parent.depth,
          createdAt: parent.createdAt,
          updatedAt: parent.updatedAt,
        })
      );

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
