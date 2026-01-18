import { StockEntryController } from '../../../../src/modules/inventory/presentation/http/controllers/stock-entry.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidQuantityError } from '../../../../src/modules/inventory/domain/errors/stock-entry.errors';

describe('StockEntryController', () => {
  const buildController = () => {
    const registerStockEntryService = {
      execute: jest.fn(),
    };

    return {
      controller: new StockEntryController(registerStockEntryService as any),
      registerStockEntryService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, registerStockEntryService } = buildController();
    (registerStockEntryService.execute as jest.Mock).mockResolvedValue({
      lotId: 'lot-1',
      itemId: 'item-1',
      lotNumber: 'LOT-1',
      quantity: 5,
      movementId: 'mov-1',
      movementSource: 'INVENTORY_ADJUSTMENT',
      occurredAt: new Date(),
    });

    const req = { body: { itemId: 'item-1' } } as any;
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

  it('should map domain errors', async () => {
    const { controller, registerStockEntryService } = buildController();
    (registerStockEntryService.execute as jest.Mock).mockRejectedValue(
      new InvalidQuantityError(0)
    );

    const req = { body: { itemId: 'item-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_QUANTITY');
  });
});
