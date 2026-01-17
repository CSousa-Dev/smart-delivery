import { AttributeValueValidationController } from '../../../../src/modules/attributes/presentation/http/controllers/attribute-value-validation.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidValidationPayloadError } from '../../../../src/modules/attributes/domain/errors/validation.errors';

describe('AttributeValueValidationController', () => {
  const buildController = () => {
    const validateAttributeValuesService = {
      execute: jest.fn(),
    };

    return {
      controller: new AttributeValueValidationController(
        validateAttributeValuesService as any
      ),
      validateAttributeValuesService,
    };
  };

  it('should return 200 with payload', async () => {
    const { controller, validateAttributeValuesService } = buildController();
    (validateAttributeValuesService.execute as jest.Mock).mockResolvedValue({
      isValid: true,
      errors: [],
    });

    const req = { body: { items: [] } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.validate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should map errors to AppError', async () => {
    const { controller, validateAttributeValuesService } = buildController();
    (validateAttributeValuesService.execute as jest.Mock).mockRejectedValue(
      new InvalidValidationPayloadError()
    );

    const req = { body: { items: [] } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.validate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_VALIDATION_PAYLOAD');
  });
});
