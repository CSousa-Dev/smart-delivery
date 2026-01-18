import { CreateUnitOfMeasureService } from '../../../../src/modules/inventory/application/services/create-unit-of-measure.service';
import { OrganizationRepository } from '../../../../src/modules/inventory/domain/ports/organization.repository';
import { UnitOfMeasureRepository } from '../../../../src/modules/inventory/domain/repositories/unit-of-measure.repository';
import {
  OrganizationNotFoundError,
  UnitCodeAlreadyExistsError,
  UnitNameAlreadyExistsError,
} from '../../../../src/modules/inventory/domain/errors/unit-of-measure.errors';

describe('CreateUnitOfMeasureService', () => {
  const buildService = () => {
    const unitRepository: UnitOfMeasureRepository = {
      existsByCode: jest.fn().mockResolvedValue(false),
      existsByName: jest.fn().mockResolvedValue(false),
      findById: jest.fn(),
      save: jest.fn(),
    };

    const organizationRepository: OrganizationRepository = {
      existsById: jest.fn().mockResolvedValue(true),
    };

    return {
      service: new CreateUnitOfMeasureService(unitRepository, organizationRepository),
      unitRepository,
      organizationRepository,
    };
  };

  it('should reject when organization does not exist', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.existsById as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        organizationId: 'org-1',
        code: 'KG',
        name: 'Kilograma',
        symbol: 'kg',
        allowsFraction: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject duplicated code', async () => {
    const { service, unitRepository } = buildService();
    (unitRepository.existsByCode as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        organizationId: 'org-1',
        code: 'KG',
        name: 'Kilograma',
        symbol: 'kg',
        allowsFraction: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(UnitCodeAlreadyExistsError);
  });

  it('should reject duplicated name', async () => {
    const { service, unitRepository } = buildService();
    (unitRepository.existsByName as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        organizationId: 'org-1',
        code: 'KG',
        name: 'Kilograma',
        symbol: 'kg',
        allowsFraction: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(UnitNameAlreadyExistsError);
  });

  it('should create unit of measure when valid', async () => {
    const { service, unitRepository } = buildService();

    const output = await service.execute({
      organizationId: 'org-1',
      code: 'KG',
      name: 'Kilograma',
      symbol: 'kg',
      allowsFraction: true,
      createdBy: 'user-1',
    });

    expect(unitRepository.save).toHaveBeenCalledTimes(1);
    expect(output.organizationId).toBe('org-1');
    expect(output.code).toBe('KG');
    expect(output.name).toBe('Kilograma');
    expect(output.symbol).toBe('kg');
    expect(output.allowsFraction).toBe(true);
    expect(output.status).toBe('ACTIVE');
  });
});
