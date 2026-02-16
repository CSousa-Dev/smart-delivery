import { AttributeController } from '../../../../src/modules/attributes/presentation/http/controllers/attribute.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidAttributeCodeError } from '../../../../src/modules/attributes/domain/errors/attribute.errors';

describe('AttributeController', () => {
  const buildController = () => {
    const createAttributeService = {
      execute: jest.fn(),
    };
    const getAttributeService = {
      execute: jest.fn(),
    };
    const listAttributesService = {
      execute: jest.fn(),
    };
    const updateAttributeService = {
      execute: jest.fn(),
    };
    const deleteAttributeService = {
      execute: jest.fn(),
    };

    return {
      controller: new AttributeController(
        createAttributeService as any,
        getAttributeService as any,
        listAttributesService as any,
        updateAttributeService as any,
        deleteAttributeService as any
      ),
      createAttributeService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createAttributeService } = buildController();
    (createAttributeService.execute as jest.Mock).mockResolvedValue({
      id: 'attr-1',
      name: 'Peso',
      code: 'WEIGHT',
      description: 'Peso do produto',
      type: 'number',
      isMultiValue: false,
      isRequired: true,
      minValue: 0,
      maxValue: 100,
      defaultValueId: null,
      createdAt: new Date(),
    });

    const req = { body: { name: 'Peso' } } as any;
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
    const { controller, createAttributeService } = buildController();
    (createAttributeService.execute as jest.Mock).mockRejectedValue(
      new InvalidAttributeCodeError('invalid_code')
    );

    const req = { body: { name: 'Peso' } } as any;
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
    expect(error.code).toBe('INVALID_ATTRIBUTE_CODE');
  });
});
