import { ListBusinessUnitsService } from '../../../../src/modules/organization/application/services/list-business-units.service';
import { BusinessUnit } from '../../../../src/modules/organization/domain/entities/business-unit.entity';
import { BusinessUnitRepository } from '../../../../src/modules/organization/domain/repositories/business-unit.repository';

describe('ListBusinessUnitsService', () => {
  const buildUnit = (id: string, createdAt: Date) =>
    BusinessUnit.create({
      id,
      organizationId: 'org-1',
      publicName: `Unit ${id}`,
      phoneNumber: '11999999999',
      phoneHasWhatsapp: true,
      address: {
        street: 'Rua A',
        number: '123',
        neighborhood: 'Centro',
        city: 'Sao Paulo',
        state: 'SP',
        postalCode: '01001000',
        country: 'BR',
        referencePoint: 'Proximo ao mercado',
      },
      status: 'ACTIVE',
      createdAt,
    });

  const buildService = () => {
    const businessUnitRepository: BusinessUnitRepository = {
      save: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
      findById: jest.fn(),
      list: jest.fn().mockResolvedValue([buildUnit('unit-1', new Date())]),
      countAll: jest.fn().mockResolvedValue(1),
    };

    return {
      service: new ListBusinessUnitsService(businessUnitRepository),
      businessUnitRepository,
    };
  };

  it('should normalize invalid pagination and sorting', async () => {
    const { service, businessUnitRepository } = buildService();

    await service.execute({ page: 0, pageSize: 120, sortDirection: 'invalid' });

    expect(businessUnitRepository.list).toHaveBeenCalledWith(1, 20, 'desc');
  });

  it('should return business units', async () => {
    const { service } = buildService();

    const output = await service.execute({});

    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one business unit item');
    }
    expect(first.status).toBe('ACTIVE');
    expect(output.totalItems).toBe(1);
  });

  it('should handle empty list', async () => {
    const { service, businessUnitRepository } = buildService();
    (businessUnitRepository.list as jest.Mock).mockResolvedValue([]);
    (businessUnitRepository.countAll as jest.Mock).mockResolvedValue(0);

    const output = await service.execute({});

    expect(output.items).toEqual([]);
    expect(output.totalItems).toBe(0);
    expect(output.totalPages).toBe(0);
  });
});
