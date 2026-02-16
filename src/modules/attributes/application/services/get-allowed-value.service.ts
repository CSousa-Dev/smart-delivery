import { GetAllowedValueInput, GetAllowedValueOutput } from '../dtos/get-allowed-value.dto';
import { AllowedValueNotFoundError } from '../../domain/errors/vertical-attribute.errors';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';

export class GetAllowedValueService {
  constructor(private readonly allowedValueRepository: AllowedValueRepository) {}

  async execute(input: GetAllowedValueInput): Promise<GetAllowedValueOutput> {
    const allowedValue = await this.allowedValueRepository.findById(input.allowedValueId);
    if (!allowedValue) {
      throw new AllowedValueNotFoundError(input.allowedValueId);
    }

    return {
      id: allowedValue.getId().value,
      attributeId: allowedValue.getAttributeId(),
      name: allowedValue.getName(),
      value: allowedValue.getValue(),
      description: allowedValue.getDescription(),
      createdAt: allowedValue.getCreatedAt(),
      updatedAt: allowedValue.getUpdatedAt(),
    };
  }
}
