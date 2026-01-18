import { UnitOfMeasure } from '../../../domain/entities/unit-of-measure.entity';

export class UnitOfMeasureMapper {
  static toPersistence(unit: UnitOfMeasure) {
    return {
      id: unit.getId().value,
      organizationId: unit.getOrganizationId(),
      code: unit.getCode(),
      codeNormalized: unit.getCodeNormalized(),
      name: unit.getName(),
      nameNormalized: unit.getNameNormalized(),
      symbol: unit.getSymbol(),
      allowsFraction: unit.getAllowsFraction(),
      status: unit.getStatus(),
      createdBy: unit.getCreatedBy(),
      createdAt: unit.getCreatedAt(),
      updatedBy: unit.getUpdatedBy(),
      updatedAt: unit.getUpdatedAt(),
    };
  }
}
