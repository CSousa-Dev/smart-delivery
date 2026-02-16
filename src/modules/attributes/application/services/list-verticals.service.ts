import { ListVerticalsOutput } from '../dtos/list-verticals.dto';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class ListVerticalsService {
  constructor(private readonly verticalRepository: VerticalRepository) {}

  async execute(): Promise<ListVerticalsOutput> {
    const verticals = await this.verticalRepository.listAll();

    return {
      items: verticals.map((vertical) => ({
        id: vertical.getId().value,
        name: vertical.getName(),
        code: vertical.getCode(),
        description: vertical.getDescription(),
        isActive: vertical.getIsActive(),
        createdAt: vertical.getCreatedAt(),
        updatedAt: vertical.getUpdatedAt(),
      })),
    };
  }
}
