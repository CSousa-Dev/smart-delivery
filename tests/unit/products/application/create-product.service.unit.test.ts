import { CreateProductService } from '../../../../src/modules/products/application/services/create-product.service';
import { ProductRepository } from '../../../../src/modules/products/domain/repositories/product.repository';
import { BusinessUnitRepository } from '../../../../src/modules/products/domain/ports/business-unit.repository';
import { CategoryRepository } from '../../../../src/modules/products/domain/ports/category.repository';
import { AttributeValueValidationPort } from '../../../../src/modules/products/domain/ports/attribute-value-validation.port';
import {
  BusinessUnitNotFoundError,
  BusinessUnitOrganizationMismatchError,
  CategoryNotFoundError,
  CategoryVerticalNotEnabledError,
  InvalidProductAttributesError,
  MissingRequiredAttributesError,
  ProductCodeAlreadyExistsError,
  ProductTitleAlreadyExistsError,
} from '../../../../src/modules/products/domain/errors/product.errors';

describe('CreateProductService', () => {
  const baseInput = {
    organizationId: 'org-1',
    businessUnitId: 'bu-1',
    categoryId: 'cat-1',
    code: 'PROD_1',
    title: 'Produto 1',
    shortDescription: 'Descricao curta valida',
    description: 'Descricao detalhada valida para o produto.',
    images: [{ url: 'https://img/1.png', order: 1, isPrimary: true }],
    attributes: [{ attributeId: 'attr-1', value: 'value-1' }],
    createdBy: 'user-1',
  };

  const buildService = () => {
    const productRepository: ProductRepository = {
      existsByCodeAndOrganizationId: jest.fn().mockResolvedValue(false),
      existsByTitleAndBusinessUnitId: jest.fn().mockResolvedValue(false),
      save: jest.fn(),
    };

    const businessUnitRepository: BusinessUnitRepository = {
      findById: jest.fn().mockResolvedValue({
        id: 'bu-1',
        organizationId: 'org-1',
        enabledVerticalIds: ['vert-1'],
      }),
    };

    const categoryRepository: CategoryRepository = {
      findById: jest.fn().mockResolvedValue({
        id: 'cat-1',
        verticalId: 'vert-1',
      }),
    };

    const attributeValueValidationPort: AttributeValueValidationPort = {
      validate: jest.fn().mockResolvedValue({
        isValid: true,
        errors: [],
      }),
    };

    return {
      service: new CreateProductService(
        productRepository,
        businessUnitRepository,
        categoryRepository,
        attributeValueValidationPort
      ),
      productRepository,
      businessUnitRepository,
      categoryRepository,
      attributeValueValidationPort,
    };
  };

  it('should reject when business unit does not exist', async () => {
    const { service, businessUnitRepository } = buildService();
    (businessUnitRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      BusinessUnitNotFoundError
    );
  });

  it('should reject when business unit does not belong to organization', async () => {
    const { service, businessUnitRepository } = buildService();
    (businessUnitRepository.findById as jest.Mock).mockResolvedValue({
      id: 'bu-1',
      organizationId: 'org-2',
      enabledVerticalIds: ['vert-1'],
    });

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      BusinessUnitOrganizationMismatchError
    );
  });

  it('should reject when category does not exist', async () => {
    const { service, categoryRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      CategoryNotFoundError
    );
  });

  it('should reject when category vertical is not enabled', async () => {
    const { service, businessUnitRepository, categoryRepository } = buildService();
    (businessUnitRepository.findById as jest.Mock).mockResolvedValue({
      id: 'bu-1',
      organizationId: 'org-1',
      enabledVerticalIds: ['vert-2'],
    });
    (categoryRepository.findById as jest.Mock).mockResolvedValue({
      id: 'cat-1',
      verticalId: 'vert-1',
    });

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      CategoryVerticalNotEnabledError
    );
  });

  it('should reject when product code already exists', async () => {
    const { service, productRepository } = buildService();
    (productRepository.existsByCodeAndOrganizationId as jest.Mock).mockResolvedValue(true);

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      ProductCodeAlreadyExistsError
    );
  });

  it('should reject when product title already exists', async () => {
    const { service, productRepository } = buildService();
    (productRepository.existsByTitleAndBusinessUnitId as jest.Mock).mockResolvedValue(true);

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      ProductTitleAlreadyExistsError
    );
  });

  it('should reject when required attributes are missing', async () => {
    const { service, attributeValueValidationPort } = buildService();
    (attributeValueValidationPort.validate as jest.Mock).mockResolvedValue({
      isValid: false,
      errors: [{ attributeId: 'attr-1', reason: 'REQUIRED_VALUE_MISSING' }],
    });

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      MissingRequiredAttributesError
    );
  });

  it('should reject when attribute values are invalid', async () => {
    const { service, attributeValueValidationPort } = buildService();
    (attributeValueValidationPort.validate as jest.Mock).mockResolvedValue({
      isValid: false,
      errors: [{ attributeId: 'attr-1', reason: 'INVALID_ALLOWED_VALUE', value: 'x' }],
    });

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      InvalidProductAttributesError
    );
  });

  it('should create product when data is valid', async () => {
    const { service, productRepository } = buildService();

    const output = await service.execute(baseInput);

    expect(output.id).toBeDefined();
    expect(output.code).toBe(baseInput.code);
    expect(productRepository.save).toHaveBeenCalledTimes(1);
  });
});
