import { VerticalAllowedValue } from '../../../domain/entities/vertical-allowed-value.entity';

export class VerticalAllowedValueMapper {
  static toPersistence(value: VerticalAllowedValue) {
    const name = value.getName();
    const rawValue = value.getValue();

    return {
      id: value.getId().value,
      verticalAttributeId: value.getVerticalAttributeId(),
      name,
      value: rawValue,
      nameNormalized: name.toLowerCase(),
      valueNormalized: rawValue.toLowerCase(),
      description: value.getDescription(),
      createdAt: value.getCreatedAt(),
      updatedAt: value.getUpdatedAt(),
    };
  }
}
