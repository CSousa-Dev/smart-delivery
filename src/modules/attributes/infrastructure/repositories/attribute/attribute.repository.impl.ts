import { PrismaClient } from '@prisma/client';
import { AttributeRepository } from '../../../domain/repositories/attribute.repository';
import { Attribute } from '../../../domain/entities/attribute.entity';
import { AttributeMapper } from './attribute.mapper';

type AttributeRecord = {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  isMultiValue: boolean;
  isRequired: boolean;
  minValue: unknown;
  maxValue: unknown;
  defaultValueId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export class PrismaAttributeRepository implements AttributeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private static toDomain(record: AttributeRecord): Attribute {
    return Attribute.create({
      id: record.id,
      name: record.name,
      code: record.code,
      description: record.description,
      type: record.type,
      isMultiValue: record.isMultiValue,
      isRequired: record.isRequired,
      minValue: Number(record.minValue),
      maxValue: Number(record.maxValue),
      defaultValueId: record.defaultValueId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async save(attribute: Attribute): Promise<void> {
    await this.prisma.attribute.create({
      data: AttributeMapper.toPersistence(attribute),
    });
  }

  async updateDefaultValue(attributeId: string, defaultValueId: string | null): Promise<void> {
    await this.prisma.attribute.update({
      where: { id: attributeId },
      data: { defaultValueId },
    });
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.prisma.attribute.count({
      where: { name },
    });

    return count > 0;
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await this.prisma.attribute.count({
      where: { code },
    });

    return count > 0;
  }

  async findById(id: string): Promise<Attribute | null> {
    const found = await this.prisma.attribute.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return Attribute.create({
      id: found.id,
      name: found.name,
      code: found.code,
      description: found.description,
      type: found.type,
      isMultiValue: found.isMultiValue,
      isRequired: found.isRequired,
      minValue: Number(found.minValue),
      maxValue: Number(found.maxValue),
      defaultValueId: found.defaultValueId,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async listGlobal(limit?: number, offset?: number): Promise<Attribute[]> {
    const query = {
      orderBy: { code: 'asc' as const },
      ...(offset !== undefined ? { skip: offset } : {}),
      ...(limit !== undefined ? { take: limit } : {}),
    };
    const attributes = (await this.prisma.attribute.findMany(query)) as AttributeRecord[];

    return attributes.map((attribute: AttributeRecord) =>
      PrismaAttributeRepository.toDomain(attribute)
    );
  }

  async findByIds(ids: string[]): Promise<Attribute[]> {
    if (ids.length === 0) {
      return [];
    }

    const attributes = (await this.prisma.attribute.findMany({
      where: { id: { in: ids } },
    })) as AttributeRecord[];

    return attributes.map((attribute: AttributeRecord) =>
      PrismaAttributeRepository.toDomain(attribute)
    );
  }
}
