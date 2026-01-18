import { InventoryItemController } from '../../../../src/modules/inventory/presentation/http/controllers/inventory-item.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import {
  BusinessUnitNotFoundError,
  InvalidInventoryItemTypeError,
} from '../../../../src/modules/inventory/domain/errors/inventory-item.errors';

describe('InventoryItemController', () => {
  const buildController = () => {
    const createInventoryItemService = {
      execute: jest.fn(),
    };

    return {
      controller: new InventoryItemController(createInventoryItemService as any),
      createInventoryItemService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createInventoryItemService } = buildController();
    (createInventoryItemService.execute as jest.Mock).mockResolvedValue({
      id: 'item-1',
      organizationId: 'org-1',
      businessUnitId: 'bu-1',
      name: 'Acucar',
      type: 'INSUMO',
      unitOfMeasureId: 'uom-1',
      requiresExpiration: true,
      createdBy: 'user-1',
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = { body: { name: 'Acucar' } } as any;
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
    const { controller, createInventoryItemService } = buildController();
    (createInventoryItemService.execute as jest.Mock).mockRejectedValue(
      new InvalidInventoryItemTypeError('INVALID')
    );

    const req = { body: { type: 'INVALID' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_INVENTORY_ITEM_TYPE');
  });

  it('should map not found errors to 404', async () => {
    const { controller, createInventoryItemService } = buildController();
    (createInventoryItemService.execute as jest.Mock).mockRejectedValue(
      new BusinessUnitNotFoundError('bu-1')
    );

    const req = { body: { businessUnitId: 'bu-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('BUSINESS_UNIT_NOT_FOUND');
  });
});
