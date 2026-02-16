import {
  ListAllowedValuesInput,
  ListAllowedValuesOutput,
} from '../dtos/list-allowed-values.dto';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';

export class ListAllowedValuesService {
  constructor(private readonly allowedValueRepository: AllowedValueRepository) {}

  async execute(input: ListAllowedValuesInput): Promise<ListAllowedValuesOutput> {
    const values = await this.allowedValueRepository.listByAttribute(input.attributeId);

    return {
      items: values.map((value) => ({
        id: value.id,
        attributeId: input.attributeId,
        name: value.name,
        value: value.value,
        description: value.description ?? null,
      })),
    };
  }
}
