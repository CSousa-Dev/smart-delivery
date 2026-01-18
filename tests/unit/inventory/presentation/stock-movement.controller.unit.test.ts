import { StockMovementController } from '../../../../src/modules/inventory/presentation/http/controllers/stock-movement.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidPaginationError } from '../../../../src/modules/inventory/domain/errors/stock-movement-list.errors';

describe('StockMovementController', () => {
  const buildController = () => {
    const listStockMovementsService = {
      execute: jest.fn(),
    };

    return {
      controller: new StockMovementController(listStockMovementsService as any),
      listStockMovementsService,
    };
  };

  it('should return 200 with payload', async () => {
    const { controller, listStockMovementsService } = buildController();
    (listStockMovementsService.execute as jest.Mock).mockResolvedValue({
      records: [],
      page: 1,
      pageSize: 50,
      total: 0,
    });

    const req = { query: { businessUnitId: 'bu-1' } } as any;
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

  it('should map domain errors', async () => {
    const { controller, listStockMovementsService } = buildController();
    (listStockMovementsService.execute as jest.Mock).mockRejectedValue(
      new InvalidPaginationError(0, 500)
    );

    const req = { query: { businessUnitId: 'bu-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.list(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_PAGINATION');
  });
});
