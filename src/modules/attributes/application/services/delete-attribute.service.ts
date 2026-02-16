import { DeleteAttributeInput } from '../dtos/delete-attribute.dto';
import { AttributeInUseError } from '../../domain/errors/attribute.errors';
import { AttributeNotFoundError } from '../../domain/errors/attribute-lookup.errors';
import { AttributeRepository } from '../../domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../domain/repositories/allowed-value.repository';
import { VerticalAttributeRepository } from '../../domain/repositories/vertical-attribute.repository';
import { CategoryAttributeRepository } from '../../domain/repositories/category-attribute.repository';

export class DeleteAttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly allowedValueRepository: AllowedValueRepository,
    private readonly verticalAttributeRepository: VerticalAttributeRepository,
    private readonly categoryAttributeRepository: CategoryAttributeRepository
  ) {}

  async execute(input: DeleteAttributeInput): Promise<void> {
    const attribute = await this.attributeRepository.findById(input.attributeId);
    if (!attribute) {
      throw new AttributeNotFoundError(input.attributeId);
    }

    const hasVerticalLinks = await this.verticalAttributeRepository.existsByAttributeId(
      input.attributeId
    );
    const hasCategoryLinks = await this.categoryAttributeRepository.existsByAttributeId(
      input.attributeId
    );
    const allowedValues = await this.allowedValueRepository.listByAttribute(input.attributeId);

    if (hasVerticalLinks || hasCategoryLinks || allowedValues.length > 0) {
      throw new AttributeInUseError(input.attributeId);
    }

    await this.attributeRepository.delete(input.attributeId);
  }
}
