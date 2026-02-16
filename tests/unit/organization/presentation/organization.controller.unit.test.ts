import { OrganizationController } from '../../../../src/modules/organization/presentation/http/controllers/organization.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { MissingLegalNameError } from '../../../../src/modules/organization/domain/errors/organization.errors';

describe('OrganizationController', () => {
  const buildController = () => {
    const createOrganizationService = {
      execute: jest.fn(),
    };
    const getOrganizationService = {
      execute: jest.fn(),
    };
    const listOrganizationsService = {
      execute: jest.fn(),
    };
    const updateOrganizationService = {
      execute: jest.fn(),
    };

    return {
      controller: new OrganizationController(
        createOrganizationService as any,
        getOrganizationService as any,
        listOrganizationsService as any,
        updateOrganizationService as any
      ),
      createOrganizationService,
      getOrganizationService,
      listOrganizationsService,
      updateOrganizationService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createOrganizationService } = buildController();
    (createOrganizationService.execute as jest.Mock).mockResolvedValue({
      id: 'org-1',
      tradeName: 'Loja X',
      legalName: 'Loja X LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: 'user-1',
      verticalIds: ['vert-1'],
      status: 'PENDING_BUSINESS_UNIT',
      createdAt: new Date(),
    });

    const req = { body: { tradeName: 'Loja X' } } as any;
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
    const { controller, createOrganizationService } = buildController();
    (createOrganizationService.execute as jest.Mock).mockRejectedValue(
      new MissingLegalNameError()
    );

    const req = { body: { tradeName: 'Loja X' } } as any;
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
    expect(error.code).toBe('LEGAL_NAME_REQUIRED');
  });

  it('should return 200 with payload on get', async () => {
    const { controller, getOrganizationService } = buildController();
    (getOrganizationService.execute as jest.Mock).mockResolvedValue({
      id: 'org-1',
      tradeName: 'Loja X',
      legalName: 'Loja X LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      verticals: [
        {
          id: 'vert-1',
          name: 'Restaurante',
          code: 'FOOD',
          description: 'Food services',
        },
      ],
      ownerUserId: 'user-1',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = { params: { id: 'org-1' }, query: {} } as any;
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
    const { controller, listOrganizationsService } = buildController();
    (listOrganizationsService.execute as jest.Mock).mockResolvedValue({
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

  it('should return 200 with payload on update', async () => {
    const { controller, updateOrganizationService } = buildController();
    (updateOrganizationService.execute as jest.Mock).mockResolvedValue({
      id: 'org-1',
      tradeName: 'Loja Y',
      legalName: 'Loja Y LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: null,
      verticalCodes: [],
      status: 'PENDING_BUSINESS_UNIT',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const req = { params: { id: 'org-1' }, body: { tradeName: 'Loja Y', legalName: 'Loja Y LTDA' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
