import { UnlinkAttributeFromVerticalInput } from '../dtos/unlink-attribute-from-vertical.dto';
import { VerticalAttributeNotFoundError } from '../../domain/errors/vertical-attribute.errors';
import { VerticalAttributeRepository } from '../../domain/repositories/vertical-attribute.repository';
import { VerticalAllowedValueRepository } from '../../domain/repositories/vertical-allowed-value.repository';

export class UnlinkAttributeFromVerticalService {
  constructor(
    private readonly verticalAttributeRepository: VerticalAttributeRepository,
    private readonly verticalAllowedValueRepository: VerticalAllowedValueRepository
  ) {}

  async execute(input: UnlinkAttributeFromVerticalInput): Promise<void> {
    const existing = await this.verticalAttributeRepository.findByVerticalAndAttribute(
      input.verticalId,
      input.attributeId
    );
    if (!existing) {
      throw new VerticalAttributeNotFoundError(input.verticalId, input.attributeId);
    }

    await this.verticalAttributeRepository.deleteSubsetLinks(existing.id);
    await this.verticalAllowedValueRepository.deleteByVerticalAttribute(existing.id);
    await this.verticalAttributeRepository.delete(input.verticalId, input.attributeId);
  }
}
