import { StockPositionController } from '../../../../src/modules/inventory/presentation/http/controllers/stock-position.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidStockPositionQueryError } from '../../../../src/modules/inventory/domain/errors/stock-position.errors';

describe('StockPositionController', () => {
  const buildController = () => {
    const getStockPositionService = {
      execute: jest.fn(),
    };

    return {
      controller: new StockPositionController(getStockPositionService as any),
      getStockPositionService,
    };
  };

  it('should return 200 with payload', async () => {
    const { controller, getStockPositionService } = buildController();
    (getStockPositionService.execute as jest.Mock).mockResolvedValue({
      itemId: 'item-1',
      totalAvailable: 0,
      lots: [],
    });

    const req = { query: { businessUnitId: 'bu-1', itemId: 'item-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.get(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should map domain errors', async () => {
    const { controller, getStockPositionService } = buildController();
    (getStockPositionService.execute as jest.Mock).mockRejectedValue(
      new InvalidStockPositionQueryError()
    );

    const req = { query: { businessUnitId: 'bu-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.get(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_STOCK_POSITION_QUERY');
  });
});
