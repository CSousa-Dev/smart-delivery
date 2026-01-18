import { StockExitController } from '../../../../src/modules/inventory/presentation/http/controllers/stock-exit.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidQuantityError } from '../../../../src/modules/inventory/domain/errors/stock-exit.errors';

describe('StockExitController', () => {
  const buildController = () => {
    const registerStockExitService = {
      execute: jest.fn(),
    };

    return {
      controller: new StockExitController(registerStockExitService as any),
      registerStockExitService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, registerStockExitService } = buildController();
    (registerStockExitService.execute as jest.Mock).mockResolvedValue({
      itemId: 'item-1',
      quantity: 5,
      movementIds: ['mov-1'],
      lots: [{ lotNumber: 'LOT-1', quantity: 5 }],
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
    const { controller, registerStockExitService } = buildController();
    (registerStockExitService.execute as jest.Mock).mockRejectedValue(
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
