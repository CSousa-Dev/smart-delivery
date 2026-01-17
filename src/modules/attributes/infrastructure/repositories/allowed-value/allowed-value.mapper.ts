import { AllowedValue } from '../../../domain/entities/allowed-value.entity';

export class AllowedValueMapper {
  static toPersistence(allowedValue: AllowedValue) {
    const name = allowedValue.getName();
    const value = allowedValue.getValue();

    return {
      id: allowedValue.getId().value,
      attributeId: allowedValue.getAttributeId(),
      name,
      value,
      nameNormalized: name.toLowerCase(),
      valueNormalized: value.toLowerCase(),
      description: allowedValue.getDescription(),
      createdAt: allowedValue.getCreatedAt(),
      updatedAt: allowedValue.getUpdatedAt(),
    };
  }
}
