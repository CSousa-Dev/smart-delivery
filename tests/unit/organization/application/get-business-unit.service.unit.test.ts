import { GetBusinessUnitService } from '../../../../src/modules/organization/application/services/get-business-unit.service';
import { BusinessUnit } from '../../../../src/modules/organization/domain/entities/business-unit.entity';
import {
  BusinessUnitNotFoundError,
  InvalidBusinessUnitIdError,
} from '../../../../src/modules/organization/domain/errors/business-unit.errors';
import { BusinessUnitRepository } from '../../../../src/modules/organization/domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../../../src/modules/organization/domain/repositories/business-unit-vertical.repository';
import { VerticalRepository } from '../../../../src/modules/organization/domain/repositories/vertical.repository';
import { BusinessUnitVerticalLink } from '../../../../src/modules/organization/domain/entities/business-unit-vertical-link.entity';
import { Vertical } from '../../../../src/modules/organization/domain/entities/vertical.entity';

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

    const businessUnitVerticalRepository: BusinessUnitVerticalRepository = {
      saveMany: jest.fn(),
      save: jest.fn(),
      listByBusinessUnitId: jest.fn().mockResolvedValue([
        BusinessUnitVerticalLink.restore({
          businessUnitId: unit.getId().value,
          organizationId: unit.getOrganizationId(),
          verticalId: 'vert-1',
          status: 'ACTIVE',
          createdAt: new Date(),
        }),
      ]),
      findByBusinessUnitAndVerticalId: jest.fn(),
      findActiveByBusinessUnitAndVerticalId: jest.fn(),
      updateStatus: jest.fn(),
      countActiveByBusinessUnitId: jest.fn(),
    };

    const verticalRepository: VerticalRepository = {
      listByIds: jest.fn().mockResolvedValue([
        Vertical.restore({
          id: 'vert-1',
          name: 'Restaurante',
          code: 'FOOD',
          description: 'Food services',
          createdAt: new Date(),
        }),
      ]),
    };

    return {
      service: new GetBusinessUnitService(
        businessUnitRepository,
        businessUnitVerticalRepository,
        verticalRepository
      ),
      businessUnitRepository,
      businessUnitVerticalRepository,
      verticalRepository,
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
    expect(output.verticals.map((vertical) => vertical.id)).toEqual(['vert-1']);
  });
});
