import { BusinessUnitController } from '../../../../src/modules/organization/presentation/http/controllers/business-unit.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidPostalCodeError } from '../../../../src/modules/organization/domain/errors/business-unit.errors';

describe('BusinessUnitController', () => {
  const buildController = () => {
    const createBusinessUnitService = {
      execute: jest.fn(),
    };
    const getBusinessUnitService = {
      execute: jest.fn(),
    };
    const listBusinessUnitsService = {
      execute: jest.fn(),
    };

    return {
      controller: new BusinessUnitController(
        createBusinessUnitService as any,
        getBusinessUnitService as any,
        listBusinessUnitsService as any
      ),
      createBusinessUnitService,
      getBusinessUnitService,
      listBusinessUnitsService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createBusinessUnitService } = buildController();
    (createBusinessUnitService.execute as jest.Mock).mockResolvedValue({
      id: 'unit-1',
      organizationId: 'org-1',
      verticalIds: ['vert-1'],
      publicName: 'Loja X',
      phoneNumber: '11999999999',
      phoneHasWhatsapp: true,
      email: null,
      instagram: null,
      website: null,
      address: {
        street: 'Rua A',
        number: '123',
        complement: null,
        neighborhood: 'Centro',
        city: 'Sao Paulo',
        state: 'SP',
        postalCode: '01001000',
        country: 'BR',
        referencePoint: 'Proximo ao mercado',
      },
      status: 'PENDING_PRODUCTS',
      createdAt: new Date(),
    });

    const req = { body: { publicName: 'Loja X' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should map domain errors to AppError', async () => {
    const { controller, createBusinessUnitService } = buildController();
    (createBusinessUnitService.execute as jest.Mock).mockRejectedValue(
      new InvalidPostalCodeError('123')
    );

    const req = { body: { publicName: 'Loja X' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_POSTAL_CODE');
  });

  it('should return 200 with payload on get', async () => {
    const { controller, getBusinessUnitService } = buildController();
    (getBusinessUnitService.execute as jest.Mock).mockResolvedValue({
      id: 'unit-1',
      organizationId: 'org-1',
      publicName: 'Loja X',
      phoneNumber: '11999999999',
      phoneHasWhatsapp: true,
      email: null,
      instagram: null,
      website: null,
      status: 'PENDING_PRODUCTS',
      verticals: [
        {
          id: 'vert-1',
          name: 'Restaurante',
          code: 'FOOD',
          description: 'Food services',
          status: 'ACTIVE',
        },
      ],
      address: {
        street: 'Rua A',
        number: '123',
        complement: null,
        neighborhood: 'Centro',
        city: 'Sao Paulo',
        state: 'SP',
        postalCode: '01001000',
        country: 'BR',
        referencePoint: 'Proximo ao mercado',
      },
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = {
      params: { id: 'unit-1' },
      headers: { 'x-actor-user-id': 'user-1' },
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.getById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 200 with payload on list', async () => {
    const { controller, listBusinessUnitsService } = buildController();
    (listBusinessUnitsService.execute as jest.Mock).mockResolvedValue({
      items: [],
      page: 1,
      pageSize: 20,
      totalItems: 0,
      totalPages: 0,
    });

    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.list(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
