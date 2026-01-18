import { Vertical } from '../../../domain/entities/vertical.entity';

export class VerticalMapper {
  static toDomain(raw: {
    id: string;
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date | null;
  }): Vertical {
    return Vertical.restore({
      id: raw.id,
      name: raw.name,
      code: raw.code,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
