import { Vertical } from '../../../domain/entities/vertical.entity';

export class VerticalMapper {
  static toPersistence(vertical: Vertical) {
    return {
      id: vertical.getId().value,
      name: vertical.getName(),
      code: vertical.getCode(),
      description: vertical.getDescription(),
      createdAt: vertical.getCreatedAt(),
      updatedAt: vertical.getUpdatedAt(),
    };
  }
}
