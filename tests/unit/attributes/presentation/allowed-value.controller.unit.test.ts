import { AllowedValueController } from '../../../../src/modules/attributes/presentation/http/controllers/allowed-value.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { AttributeNotFoundError } from '../../../../src/modules/attributes/domain/errors/attribute-lookup.errors';

describe('AllowedValueController', () => {
  const buildController = () => {
    const createAllowedValueService = {
      execute: jest.fn(),
    };
    const getAllowedValueService = {
      execute: jest.fn(),
    };
    const listAllowedValuesService = {
      execute: jest.fn(),
    };
    const updateAllowedValueService = {
      execute: jest.fn(),
    };
    const deleteAllowedValueService = {
      execute: jest.fn(),
    };

    return {
      controller: new AllowedValueController(
        createAllowedValueService as any,
        getAllowedValueService as any,
        listAllowedValuesService as any,
        updateAllowedValueService as any,
        deleteAllowedValueService as any
      ),
      createAllowedValueService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createAllowedValueService } = buildController();
    (createAllowedValueService.execute as jest.Mock).mockResolvedValue({
      id: 'allowed-1',
      attributeId: 'attribute-1',
      name: 'Grande',
      value: 'Large',
      description: 'Grande',
      createdAt: new Date(),
    });

    const req = {
      params: { attributeId: 'attribute-1' },
      body: { name: 'Grande', value: 'Large' },
    } as any;
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
    const { controller, createAllowedValueService } = buildController();
    (createAllowedValueService.execute as jest.Mock).mockRejectedValue(
      new AttributeNotFoundError('attribute-1')
    );

    const req = {
      params: { attributeId: 'attribute-1' },
      body: { name: 'Grande', value: 'Large' },
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('ATTRIBUTE_NOT_FOUND');
  });
});
