import { ResolvedAttributeController } from '../../../../src/modules/attributes/presentation/http/controllers/resolved-attribute.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { NoAttributesForContextError } from '../../../../src/modules/attributes/domain/errors/resolve.errors';

describe('ResolvedAttributeController', () => {
  const buildController = () => {
    const resolveAttributeConfigurationService = {
      list: jest.fn(),
      get: jest.fn(),
    };

    return {
      controller: new ResolvedAttributeController(
        resolveAttributeConfigurationService as any
      ),
      resolveAttributeConfigurationService,
    };
  };

  it('should return 200 with list payload', async () => {
    const { controller, resolveAttributeConfigurationService } = buildController();
    (resolveAttributeConfigurationService.list as jest.Mock).mockResolvedValue({
      items: [],
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

  it('should map errors to AppError', async () => {
    const { controller, resolveAttributeConfigurationService } = buildController();
    (resolveAttributeConfigurationService.list as jest.Mock).mockRejectedValue(
      new NoAttributesForContextError()
    );

    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.list(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NO_ATTRIBUTES_FOR_CONTEXT');
  });
});
