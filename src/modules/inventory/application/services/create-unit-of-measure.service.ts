import {
  CreateUnitOfMeasureInput,
  CreateUnitOfMeasureOutput,
} from '../dtos/create-unit-of-measure.dto';
import {
  UnitName,
  UnitCode,
  UnitOfMeasure,
} from '../../domain/entities/unit-of-measure.entity';
import { UnitOfMeasureRepository } from '../../domain/repositories/unit-of-measure.repository';
import { OrganizationRepository } from '../../domain/ports/organization.repository';
import {
  OrganizationNotFoundError,
  UnitCodeAlreadyExistsError,
  UnitNameAlreadyExistsError,
} from '../../domain/errors/unit-of-measure.errors';

export class CreateUnitOfMeasureService {
  constructor(
    private readonly unitRepository: UnitOfMeasureRepository,
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async execute(input: CreateUnitOfMeasureInput): Promise<CreateUnitOfMeasureOutput> {
    const organizationExists = await this.organizationRepository.existsById(
      input.organizationId
    );
    if (!organizationExists) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    const code = UnitCode.create(input.code);
    const name = UnitName.create(input.name);

    const codeExists = await this.unitRepository.existsByCode(
      input.organizationId,
      code.normalized
    );
    if (codeExists) {
      throw new UnitCodeAlreadyExistsError(input.code);
    }

    const nameExists = await this.unitRepository.existsByName(
      input.organizationId,
      name.normalized
    );
    if (nameExists) {
      throw new UnitNameAlreadyExistsError(input.name);
    }

    const unit = UnitOfMeasure.create({
      ...input,
      code: code.value,
      name: name.value,
    });

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
      updatedAt: unit.getUpdatedAt(),
    };
  }
}
