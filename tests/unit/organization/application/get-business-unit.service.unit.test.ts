import { GetBusinessUnitService } from '../../../../src/modules/organization/application/services/get-business-unit.service';
import { BusinessUnit } from '../../../../src/modules/organization/domain/entities/business-unit.entity';
import {
  BusinessUnitNotFoundError,
  InvalidBusinessUnitIdError,
} from '../../../../src/modules/organization/domain/errors/business-unit.errors';
import { BusinessUnitRepository } from '../../../../src/modules/organization/domain/repositories/business-unit.repository';

describe('GetBusinessUnitService', () => {
  const unit = BusinessUnit.create({
    id: '11111111-1111-4111-8111-111111111111',
    organizationId: 'org-1',
    publicName: 'Loja X',
    phoneNumber: '11999999999',
    phoneHasWhatsapp: true,
    email: 'contato@lojax.com',
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
    status: 'PENDING_PRODUCTS',
  });

  const buildService = () => {
    const businessUnitRepository: BusinessUnitRepository = {
      save: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
      findById: jest.fn().mockResolvedValue(unit),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    return {
      service: new GetBusinessUnitService(businessUnitRepository),
      businessUnitRepository,
    };
  };

  it('should reject invalid business unit id', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ businessUnitId: 'invalid', actorUserId: 'user-1' })
    ).rejects.toBeInstanceOf(InvalidBusinessUnitIdError);
  });

  it('should reject when business unit not found', async () => {
    const { service, businessUnitRepository } = buildService();
    (businessUnitRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        businessUnitId: '11111111-1111-4111-8111-111111111111',
        actorUserId: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitNotFoundError);
  });

  it('should return business unit details', async () => {
    const { service } = buildService();

    const output = await service.execute({
      businessUnitId: '11111111-1111-4111-8111-111111111111',
      actorUserId: 'user-1',
    });

    expect(output.status).toBe('PENDING_PRODUCTS');
    expect(output.address.postalCode).toBe('01001000');
  });
});
