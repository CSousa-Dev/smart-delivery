import { Vertical } from '../../../domain/entities/vertical.entity';

export class VerticalMapper {
  static toPersistence(vertical: Vertical) {
    return {
      id: vertical.getId().value,
      name: vertical.getName(),
      code: vertical.getCode(),
      description: vertical.getDescription(),
      isActive: vertical.getIsActive(),
      createdAt: vertical.getCreatedAt(),
      updatedAt: vertical.getUpdatedAt(),
    };
  }

  static toDomain(raw: {
    id: string;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }): Vertical {
    return Vertical.create({
      id: raw.id,
      name: raw.name,
      code: raw.code,
      description: raw.description,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
