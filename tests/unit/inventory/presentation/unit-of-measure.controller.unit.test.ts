import { UnitOfMeasureController } from '../../../../src/modules/inventory/presentation/http/controllers/unit-of-measure.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import {
  InvalidUnitCodeError,
  OrganizationNotFoundError,
} from '../../../../src/modules/inventory/domain/errors/unit-of-measure.errors';

describe('UnitOfMeasureController', () => {
  const buildController = () => {
    const createUnitOfMeasureService = {
      execute: jest.fn(),
    };
    const updateUnitOfMeasureService = {
      execute: jest.fn(),
    };

    return {
      controller: new UnitOfMeasureController(
        createUnitOfMeasureService as any,
        updateUnitOfMeasureService as any
      ),
      createUnitOfMeasureService,
      updateUnitOfMeasureService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createUnitOfMeasureService } = buildController();
    (createUnitOfMeasureService.execute as jest.Mock).mockResolvedValue({
      id: 'uom-1',
      organizationId: 'org-1',
      code: 'KG',
      name: 'Kilograma',
      symbol: 'kg',
      allowsFraction: true,
      status: 'ACTIVE',
      createdBy: 'user-1',
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = { body: { code: 'KG' } } as any;
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

  it('should map validation errors to bad request', async () => {
    const { controller, createUnitOfMeasureService } = buildController();
    (createUnitOfMeasureService.execute as jest.Mock).mockRejectedValue(
      new InvalidUnitCodeError('invalid')
    );

    const req = { body: { code: 'invalid' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_UNIT_CODE');
  });

  it('should map organization errors to not found', async () => {
    const { controller, createUnitOfMeasureService } = buildController();
    (createUnitOfMeasureService.execute as jest.Mock).mockRejectedValue(
      new OrganizationNotFoundError('org-1')
    );

    const req = { body: { code: 'KG' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('ORGANIZATION_NOT_FOUND');
  });

  it('should update unit of measure', async () => {
    const { controller, updateUnitOfMeasureService } = buildController();
    (updateUnitOfMeasureService.execute as jest.Mock).mockResolvedValue({
      id: 'uom-1',
      organizationId: 'org-1',
      code: 'KG',
      name: 'Quilograma',
      symbol: 'kg',
      allowsFraction: true,
      status: 'INACTIVE',
      createdBy: 'user-1',
      createdAt: new Date(),
      updatedBy: 'user-2',
      updatedAt: new Date(),
    });

    const req = { params: { id: 'uom-1' }, body: { name: 'Quilograma', status: 'INACTIVE', updatedBy: 'user-2' } } as any;
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

  it('should reject immutable field updates', async () => {
    const { controller } = buildController();

    const req = { params: { id: 'uom-1' }, body: { code: 'NEW', updatedBy: 'user-2' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.update(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('IMMUTABLE_FIELD_UPDATE');
  });
});
