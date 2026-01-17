import { VerticalController } from '../../../../src/modules/attributes/presentation/http/controllers/vertical.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidVerticalCodeError } from '../../../../src/modules/attributes/domain/errors/vertical.errors';

describe('VerticalController', () => {
  const buildController = () => {
    const createVerticalService = {
      execute: jest.fn(),
    };

    return {
      controller: new VerticalController(createVerticalService as any),
      createVerticalService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createVerticalService } = buildController();
    (createVerticalService.execute as jest.Mock).mockResolvedValue({
      id: 'vertical-1',
      name: 'Food',
      code: 'FOOD',
      description: 'Food operations',
      createdAt: new Date(),
    });

    const req = { body: { name: 'Food' } } as any;
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
    const { controller, createVerticalService } = buildController();
    (createVerticalService.execute as jest.Mock).mockRejectedValue(
      new InvalidVerticalCodeError('invalid_code')
    );

    const req = { body: { name: 'Food' } } as any;
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
    expect(error.code).toBe('INVALID_VERTICAL_CODE');
  });
});
