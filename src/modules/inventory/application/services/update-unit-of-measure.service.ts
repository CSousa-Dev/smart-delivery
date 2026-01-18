import {
  UpdateUnitOfMeasureInput,
  UpdateUnitOfMeasureOutput,
} from '../dtos/update-unit-of-measure.dto';
import { UnitOfMeasure, UnitName, UnitStatus } from '../../domain/entities/unit-of-measure.entity';
import { UnitOfMeasureRepository } from '../../domain/repositories/unit-of-measure.repository';
import {
  InvalidUnitNameError,
  InvalidUnitStatusError,
  NoUpdatableFieldsError,
  UnitNameAlreadyExistsError,
  UnitOfMeasureNotFoundError,
} from '../../domain/errors/unit-of-measure.errors';

export class UpdateUnitOfMeasureService {
  constructor(private readonly unitRepository: UnitOfMeasureRepository) {}

  async execute(input: UpdateUnitOfMeasureInput): Promise<UpdateUnitOfMeasureOutput> {
    const unitRecord = await this.unitRepository.findById(input.unitOfMeasureId);
    if (!unitRecord) {
      throw new UnitOfMeasureNotFoundError(input.unitOfMeasureId);
    }

    const hasName = input.name !== undefined;
    const hasStatus = input.status !== undefined;
    if (!hasName && !hasStatus) {
      throw new NoUpdatableFieldsError();
    }

    let nextNameNormalized = unitRecord.nameNormalized;
    let nextStatus = unitRecord.status;

    if (hasName) {
      try {
        const parsedName = UnitName.create(input.name as string);
        nextNameNormalized = parsedName.normalized;
      } catch (error) {
        if (error instanceof InvalidUnitNameError) {
          throw error;
        }
        throw error;
      }
    }

    if (hasStatus) {
      if (!Object.values(UnitStatus).includes(input.status as UnitStatus)) {
        throw new InvalidUnitStatusError(String(input.status));
      }
      nextStatus = input.status as UnitStatus;
    }

    const nameChanged = hasName && nextNameNormalized !== unitRecord.nameNormalized;
    const statusChanged = hasStatus && nextStatus !== unitRecord.status;

    if (nameChanged) {
      const nameExists = await this.unitRepository.existsByName(
        unitRecord.organizationId,
        nextNameNormalized
      );
      if (nameExists) {
        throw new UnitNameAlreadyExistsError(input.name as string);
      }
    }

    const unit = UnitOfMeasure.restore({
      id: unitRecord.id,
      organizationId: unitRecord.organizationId,
      code: unitRecord.code,
      name: unitRecord.name,
      symbol: unitRecord.symbol,
      allowsFraction: unitRecord.allowsFraction,
      status: unitRecord.status as UnitStatus,
      createdBy: unitRecord.createdBy,
      createdAt: unitRecord.createdAt,
      updatedBy: unitRecord.updatedBy,
      updatedAt: unitRecord.updatedAt,
    });

    if (!nameChanged && !statusChanged) {
      return {
        id: unit.getId().value,
        organizationId: unit.getOrganizationId(),
        code: unit.getCode(),
        name: unit.getName(),
        symbol: unit.getSymbol(),
        allowsFraction: unit.getAllowsFraction(),
        status: unit.getStatus(),
        createdBy: unit.getCreatedBy(),
        createdAt: unit.getCreatedAt(),
        updatedBy: unit.getUpdatedBy(),
        updatedAt: unit.getUpdatedAt(),
      };
    }

    if (nameChanged) {
      unit.updateName(input.name as string, input.updatedBy);
    }
    if (statusChanged) {
      unit.changeStatus(nextStatus as UnitStatus, input.updatedBy);
    }

    await this.unitRepository.save(unit);

    return {
      id: unit.getId().value,
      organizationId: unit.getOrganizationId(),
      code: unit.getCode(),
      name: unit.getName(),
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
