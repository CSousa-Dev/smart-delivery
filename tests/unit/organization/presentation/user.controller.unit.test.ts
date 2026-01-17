import { UserController } from '../../../../src/modules/organization/presentation/http/controllers/user.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidDocumentError } from '../../../../src/modules/organization/domain/errors/user.errors';

describe('UserController', () => {
  const buildController = () => {
    const createUserService = {
      execute: jest.fn(),
    };
    const getUserService = {
      execute: jest.fn(),
    };
    const listUsersService = {
      execute: jest.fn(),
    };

    return {
      controller: new UserController(
        createUserService as any,
        getUserService as any,
        listUsersService as any
      ),
      createUserService,
      getUserService,
      listUsersService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createUserService } = buildController();
    (createUserService.execute as jest.Mock).mockResolvedValue({
      id: 'user-1',
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      status: 'PENDING_ORG_LINK',
      organizationId: null,
      createdAt: new Date(),
    });

    const req = { body: { firstName: 'Ana' } } as any;
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
    const { controller, createUserService } = buildController();
    (createUserService.execute as jest.Mock).mockRejectedValue(
      new InvalidDocumentError('123')
    );

    const req = { body: { firstName: 'Ana' } } as any;
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
    expect(error.code).toBe('INVALID_DOCUMENT');
  });

  it('should return 200 with payload on get', async () => {
    const { controller, getUserService } = buildController();
    (getUserService.execute as jest.Mock).mockResolvedValue({
      id: 'user-1',
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      status: 'ACTIVE',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = {
      params: { id: 'user-1' },
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
    const { controller, listUsersService } = buildController();
    (listUsersService.execute as jest.Mock).mockResolvedValue({
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
