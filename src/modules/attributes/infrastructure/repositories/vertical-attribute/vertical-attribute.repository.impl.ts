import { PrismaClient } from '@prisma/client';
import { VerticalAttributeRepository } from '../../../domain/repositories/vertical-attribute.repository';
import { VerticalAttribute } from '../../../domain/entities/vertical-attribute.entity';
import { VerticalAttributeMapper } from './vertical-attribute.mapper';

type VerticalAllowedValueLinkRecord = {
  attributeAllowedValueId: string;
};

type VerticalAttributeLinkRecord = {
  id: string;
  attributeId: string;
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: unknown;
  maxValue: unknown;
  defaultValueId: string | null;
  defaultValueScope: string | null;
};

export class PrismaVerticalAttributeRepository implements VerticalAttributeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(verticalAttribute: VerticalAttribute): Promise<void> {
    await this.prisma.verticalAttribute.create({
      data: VerticalAttributeMapper.toPersistence(verticalAttribute),
    });
  }

  async update(verticalAttribute: VerticalAttribute): Promise<void> {
    const { id, createdAt, ...data } = VerticalAttributeMapper.toPersistence(verticalAttribute);
    await this.prisma.verticalAttribute.update({
      where: {
        verticalId_attributeId: {
          verticalId: verticalAttribute.getVerticalId(),
          attributeId: verticalAttribute.getAttributeId(),
        },
      },
      data,
    });
  }

  async delete(verticalId: string, attributeId: string): Promise<void> {
    await this.prisma.verticalAttribute.delete({
      where: {
        verticalId_attributeId: {
          verticalId,
          attributeId,
        },
      },
    });
  }

  async existsByVerticalAndAttribute(
    verticalId: string,
    attributeId: string
  ): Promise<boolean> {
    const count = await this.prisma.verticalAttribute.count({
      where: { verticalId, attributeId },
    });

    return count > 0;
  }

  async existsByAttributeId(attributeId: string): Promise<boolean> {
    const count = await this.prisma.verticalAttribute.count({
      where: { attributeId },
    });

    return count > 0;
  }

  async findByVerticalAndAttribute(
    verticalId: string,
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
    const found = await this.prisma.verticalAttribute.findUnique({
      where: {
        verticalId_attributeId: {
          verticalId,
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

  async saveSubsetLinks(
    verticalAttributeId: string,
    allowedValueIds: string[]
  ): Promise<void> {
    if (allowedValueIds.length === 0) {
      return;
    }

    await this.prisma.verticalAllowedValueLink.createMany({
      data: allowedValueIds.map((attributeAllowedValueId) => ({
        verticalAttributeId,
        attributeAllowedValueId,
      })),
    });
  }

  async deleteSubsetLinks(verticalAttributeId: string): Promise<void> {
    await this.prisma.verticalAllowedValueLink.deleteMany({
      where: { verticalAttributeId },
    });
  }

  async listSubsetLinks(verticalAttributeId: string): Promise<string[]> {
    const links = (await this.prisma.verticalAllowedValueLink.findMany({
      where: { verticalAttributeId },
      select: { attributeAllowedValueId: true },
    })) as VerticalAllowedValueLinkRecord[];

    return links.map((link: VerticalAllowedValueLinkRecord) => link.attributeAllowedValueId);
  }

  async listByVertical(
    verticalId: string
  ): Promise<
    Array<{
      id: string;
      attributeId: string;
      isRequired: boolean | null;
      isMultiValue: boolean | null;
      minValue: number | null;
      maxValue: number | null;
      defaultValueId: string | null;
      defaultValueScope: string | null;
    }>
  > {
    const links = (await this.prisma.verticalAttribute.findMany({
      where: { verticalId },
      select: {
        id: true,
        attributeId: true,
        isRequired: true,
        isMultiValue: true,
        minValue: true,
        maxValue: true,
        defaultValueId: true,
        defaultValueScope: true,
      },
    })) as VerticalAttributeLinkRecord[];

    return links.map((link: VerticalAttributeLinkRecord) => ({
      id: link.id,
      attributeId: link.attributeId,
      isRequired: link.isRequired ?? null,
      isMultiValue: link.isMultiValue ?? null,
      minValue: link.minValue ? Number(link.minValue) : null,
      maxValue: link.maxValue ? Number(link.maxValue) : null,
      defaultValueId: link.defaultValueId ?? null,
      defaultValueScope: link.defaultValueScope ?? null,
    }));
  }
}
