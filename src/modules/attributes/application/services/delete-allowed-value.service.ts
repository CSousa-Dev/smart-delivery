import { DeleteAllowedValueInput } from '../dtos/delete-allowed-value.dto';
import { AllowedValueInUseError } from '../../domain/errors/allowed-value.errors';
import { AllowedValueNotFoundError } from '../../domain/errors/vertical-attribute.errors';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';

export class DeleteAllowedValueService {
  constructor(private readonly allowedValueRepository: AllowedValueRepository) {}

  async execute(input: DeleteAllowedValueInput): Promise<void> {
    const allowedValue = await this.allowedValueRepository.findById(input.allowedValueId);
    if (!allowedValue) {
      throw new AllowedValueNotFoundError(input.allowedValueId);
    }

    if (await this.allowedValueRepository.isLinkedToUsage(input.allowedValueId)) {
      throw new AllowedValueInUseError(input.allowedValueId);
    }

    await this.allowedValueRepository.delete(input.allowedValueId);
  }
}
