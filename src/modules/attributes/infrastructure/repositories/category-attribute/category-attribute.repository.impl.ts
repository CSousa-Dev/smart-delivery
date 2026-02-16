import { PrismaClient } from '@prisma/client';
import {
  CategoryAllowedValueLinkInput,
  CategoryAttributeRepository,
} from '../../../domain/repositories/category-attribute.repository';
import { CategoryAttribute } from '../../../domain/entities/category-attribute.entity';
import { CategoryAttributeMapper } from './category-attribute.mapper';

type CategoryAttributeLinkRecord = {
  id: string;
  categoryId: string;
  attributeId: string;
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: unknown;
  maxValue: unknown;
  defaultValueId: string | null;
  defaultValueScope: string | null;
};

export class PrismaCategoryAttributeRepository implements CategoryAttributeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(categoryAttribute: CategoryAttribute): Promise<void> {
    await this.prisma.categoryAttribute.create({
      data: CategoryAttributeMapper.toPersistence(categoryAttribute),
    });
  }

  async update(categoryAttribute: CategoryAttribute): Promise<void> {
    const { id, createdAt, ...data } = CategoryAttributeMapper.toPersistence(categoryAttribute);
    await this.prisma.categoryAttribute.update({
      where: {
        categoryId_attributeId: {
          categoryId: categoryAttribute.getCategoryId(),
          attributeId: categoryAttribute.getAttributeId(),
        },
      },
      data,
    });
  }

  async delete(categoryId: string, attributeId: string): Promise<void> {
    await this.prisma.categoryAttribute.delete({
      where: {
        categoryId_attributeId: {
          categoryId,
          attributeId,
        },
      },
    });
  }

  async existsByCategoryAndAttribute(
    categoryId: string,
    attributeId: string
  ): Promise<boolean> {
    const count = await this.prisma.categoryAttribute.count({
      where: { categoryId, attributeId },
    });

    return count > 0;
  }

  async existsByAttributeId(attributeId: string): Promise<boolean> {
    const count = await this.prisma.categoryAttribute.count({
      where: { attributeId },
    });

    return count > 0;
  }

  async saveSubsetLinks(
    categoryAttributeId: string,
    links: CategoryAllowedValueLinkInput[]
  ): Promise<void> {
    if (links.length === 0) {
      return;
    }

    await this.prisma.categoryAllowedValueLink.createMany({
      data: links.map((link) => ({
        categoryAttributeId,
        sourceScope: link.sourceScope,
        sourceValueId: link.sourceValueId,
      })),
    });
  }

  async deleteSubsetLinks(categoryAttributeId: string): Promise<void> {
    await this.prisma.categoryAllowedValueLink.deleteMany({
      where: { categoryAttributeId },
    });
  }

  async findByCategoryAndAttribute(
    categoryId: string,
    attributeId: string
  ): Promise<{
    id: string;
    isRequired: boolean | null;
    isMultiValue: boolean | null;
    minValue: number | null;
    maxValue: number | null;
    defaultValueId: string | null;
    defaultValueScope: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  } | null> {
    const found = await this.prisma.categoryAttribute.findUnique({
      where: {
        categoryId_attributeId: {
          categoryId,
          attributeId,
        },
      },
      select: {
        id: true,
        isRequired: true,
        isMultiValue: true,
        minValue: true,
        maxValue: true,
        defaultValueId: true,
        defaultValueScope: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!found) {
      return null;
    }

    return {
      id: found.id,
      isRequired: found.isRequired ?? null,
      isMultiValue: found.isMultiValue ?? null,
      minValue: found.minValue ? Number(found.minValue) : null,
      maxValue: found.maxValue ? Number(found.maxValue) : null,
      defaultValueId: found.defaultValueId ?? null,
      defaultValueScope: found.defaultValueScope ?? null,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt ?? null,
    };
  }

  async listByCategories(
    categoryIds: string[]
  ): Promise<
    Array<{
      id: string;
      categoryId: string;
      attributeId: string;
      isRequired: boolean | null;
      isMultiValue: boolean | null;
      minValue: number | null;
      maxValue: number | null;
      defaultValueId: string | null;
      defaultValueScope: string | null;
    }>
  > {
    if (categoryIds.length === 0) {
      return [];
    }

    const links = (await this.prisma.categoryAttribute.findMany({
      where: { categoryId: { in: categoryIds } },
      select: {
        id: true,
        categoryId: true,
        attributeId: true,
        isRequired: true,
        isMultiValue: true,
        minValue: true,
        maxValue: true,
        defaultValueId: true,
        defaultValueScope: true,
      },
    })) as CategoryAttributeLinkRecord[];

    return links.map((link: CategoryAttributeLinkRecord) => ({
      id: link.id,
      categoryId: link.categoryId,
      attributeId: link.attributeId,
      isRequired: link.isRequired ?? null,
      isMultiValue: link.isMultiValue ?? null,
      minValue: link.minValue ? Number(link.minValue) : null,
      maxValue: link.maxValue ? Number(link.maxValue) : null,
      defaultValueId: link.defaultValueId ?? null,
      defaultValueScope: link.defaultValueScope ?? null,
    }));
  }

  async listSubsetLinks(categoryAttributeId: string): Promise<CategoryAllowedValueLinkInput[]> {
    const links = await this.prisma.categoryAllowedValueLink.findMany({
      where: { categoryAttributeId },
      select: {
        sourceScope: true,
        sourceValueId: true,
      },
    });

    return links.map((link) => ({
      sourceScope: link.sourceScope as CategoryAllowedValueLinkInput['sourceScope'],
      sourceValueId: link.sourceValueId,
    }));
  }
}
