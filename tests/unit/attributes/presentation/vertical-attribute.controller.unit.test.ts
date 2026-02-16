import { VerticalAttributeController } from '../../../../src/modules/attributes/presentation/http/controllers/vertical-attribute.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { VerticalAttributeAlreadyExistsError } from '../../../../src/modules/attributes/domain/errors/vertical-attribute.errors';

describe('VerticalAttributeController', () => {
  const buildController = () => {
    const linkAttributeToVerticalService = {
      execute: jest.fn(),
    };
    const updateVerticalAttributeService = {
      execute: jest.fn(),
    };
    const unlinkAttributeFromVerticalService = {
      execute: jest.fn(),
    };
    const listVerticalAttributesService = {
      execute: jest.fn(),
    };

    return {
      controller: new VerticalAttributeController(
        linkAttributeToVerticalService as any,
        updateVerticalAttributeService as any,
        unlinkAttributeFromVerticalService as any,
        listVerticalAttributesService as any
      ),
      linkAttributeToVerticalService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, linkAttributeToVerticalService } = buildController();
    (linkAttributeToVerticalService.execute as jest.Mock).mockResolvedValue({
      id: 'link-1',
      verticalId: 'vertical-1',
      attributeId: 'attribute-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
      createdAt: new Date(),
    });

    const req = {
      params: { verticalId: 'vertical-1' },
      body: { attributeId: 'attribute-1' },
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
    const { controller, linkAttributeToVerticalService } = buildController();
    (linkAttributeToVerticalService.execute as jest.Mock).mockRejectedValue(
      new VerticalAttributeAlreadyExistsError('vertical-1', 'attribute-1')
    );

    const req = {
      params: { verticalId: 'vertical-1' },
      body: { attributeId: 'attribute-1' },
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
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('VERTICAL_ATTRIBUTE_EXISTS');
  });
});
