import { LinkAttributeToCategoryService } from '../../../../src/modules/attributes/application/services/link-attribute-to-category.service';
import { Attribute } from '../../../../src/modules/attributes/domain/entities/attribute.entity';
import { AttributeNotFoundError, AttributeNotOptionTypeError } from '../../../../src/modules/attributes/domain/errors/attribute-lookup.errors';
import { InvalidAttributeLimitsError, InvalidDefaultValueError } from '../../../../src/modules/attributes/domain/errors/attribute.errors';
import { AllowedValueConflictError, AllowedValueNotFoundError } from '../../../../src/modules/attributes/domain/errors/vertical-attribute.errors';
import { AttributeNotLinkedToVerticalError, CategoryAttributeAlreadyExistsError, CategoryNotFoundError } from '../../../../src/modules/attributes/domain/errors/category-attribute.errors';
import { Category } from '../../../../src/modules/attributes/domain/entities/category.entity';
import { CategoryRepository } from '../../../../src/modules/attributes/domain/repositories/category.repository';
import { CategoryAttributeRepository } from '../../../../src/modules/attributes/domain/repositories/category-attribute.repository';
import { CategoryAllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/category-allowed-value.repository';
import { AttributeRepository } from '../../../../src/modules/attributes/domain/repositories/attribute.repository';
import { VerticalAttributeRepository } from '../../../../src/modules/attributes/domain/repositories/vertical-attribute.repository';
import { AllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/allowed-value.repository';
import { VerticalAllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/vertical-allowed-value.repository';

describe('LinkAttributeToCategoryService', () => {
  const buildService = () => {
    const categoryRepository: CategoryRepository = {
      save: jest.fn(),
      update: jest.fn(),
      existsByNameAndVerticalId: jest.fn(),
      existsByCodeAndVerticalId: jest.fn(),
      existsByNameExcludingId: jest.fn(),
      existsByCodeExcludingId: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      listAll: jest.fn(),
      listByVerticalId: jest.fn(),
      getAncestry: jest.fn().mockResolvedValue([]),
      getInheritanceChain: jest.fn().mockResolvedValue([]),
      validateChain: jest.fn(),
    };
    const categoryAttributeRepository: CategoryAttributeRepository = {
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      existsByCategoryAndAttribute: jest.fn().mockResolvedValue(false),
      existsByAttributeId: jest.fn(),
      saveSubsetLinks: jest.fn(),
      deleteSubsetLinks: jest.fn(),
      findByCategoryAndAttribute: jest.fn().mockResolvedValue(null),
      listByCategories: jest.fn().mockResolvedValue([]),
      listSubsetLinks: jest.fn().mockResolvedValue([]),
    };
    const categoryAllowedValueRepository: CategoryAllowedValueRepository = {
      saveAll: jest.fn(),
      deleteByCategoryAttribute: jest.fn(),
      listByCategoryAttribute: jest.fn().mockResolvedValue([]),
    };
    const attributeRepository: AttributeRepository = {
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateDefaultValue: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      existsByNameExcludingId: jest.fn(),
      existsByCodeExcludingId: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      listGlobal: jest.fn().mockResolvedValue([]),
      findByIds: jest.fn().mockResolvedValue([]),
    };
    const verticalAttributeRepository: VerticalAttributeRepository = {
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      existsByVerticalAndAttribute: jest.fn(),
      existsByAttributeId: jest.fn(),
      saveSubsetLinks: jest.fn(),
      deleteSubsetLinks: jest.fn(),
      findByVerticalAndAttribute: jest.fn().mockResolvedValue(null),
      listSubsetLinks: jest.fn().mockResolvedValue([]),
      listByVertical: jest.fn().mockResolvedValue([]),
    };
    const allowedValueRepository: AllowedValueRepository = {
      saveAll: jest.fn(),
      existsByName: jest.fn(),
      existsByValue: jest.fn(),
      existsByNameExcludingId: jest.fn(),
      existsByValueExcludingId: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      isLinkedToUsage: jest.fn(),
      listByAttribute: jest.fn().mockResolvedValue([]),
    };
    const verticalAllowedValueRepository: VerticalAllowedValueRepository = {
      saveAll: jest.fn(),
      deleteByVerticalAttribute: jest.fn(),
      listByVerticalAttribute: jest.fn().mockResolvedValue([]),
    };

    return {
      service: new LinkAttributeToCategoryService(
        categoryRepository,
        categoryAttributeRepository,
        categoryAllowedValueRepository,
        attributeRepository,
        verticalAttributeRepository,
        allowedValueRepository,
        verticalAllowedValueRepository
      ),
      categoryRepository,
      categoryAttributeRepository,
      categoryAllowedValueRepository,
      attributeRepository,
      verticalAttributeRepository,
      allowedValueRepository,
    };
  };

  it('should reject when category does not exist', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('should reject when attribute does not exist', async () => {
    const { service, categoryRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(AttributeNotFoundError);
  });

  it('should reject when attribute is not linked to vertical', async () => {
    const { service, categoryRepository, attributeRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
      })
    );

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(AttributeNotLinkedToVerticalError);
  });

  it('should reject duplicated category link', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository, categoryAttributeRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
    });
    (categoryAttributeRepository.existsByCategoryAndAttribute as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(CategoryAttributeAlreadyExistsError);
  });

  it('should reject invalid limits', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Peso',
        code: 'WEIGHT',
        description: 'Peso',
        type: 'number',
        isMultiValue: false,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
    });

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        minValue: 10,
        maxValue: 5,
      })
    ).rejects.toBeInstanceOf(InvalidAttributeLimitsError);
  });

  it('should reject allowed values for non-option attribute', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Peso',
        code: 'WEIGHT',
        description: 'Peso',
        type: 'number',
        isMultiValue: false,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
    });

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        allowedValueRefs: [{ sourceScope: 'ATTRIBUTE', sourceValueId: 'value-1' }],
      })
    ).rejects.toBeInstanceOf(AttributeNotOptionTypeError);
  });

  it('should reject subset ref not found', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository, allowedValueRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
    });
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        allowedValueRefs: [{ sourceScope: 'ATTRIBUTE', sourceValueId: 'value-2' }],
      })
    ).rejects.toBeInstanceOf(AllowedValueNotFoundError);
  });

  it('should reject conflicting additional values', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository, allowedValueRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
    });
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        additionalAllowedValues: [{ name: 'Grande', value: 'ExtraLarge' }],
      })
    ).rejects.toBeInstanceOf(AllowedValueConflictError);
  });

  it('should reject invalid default value', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository, allowedValueRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isMultiValue: true,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
    });
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    await expect(
      service.execute({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        defaultValueId: 'value-1',
      })
    ).rejects.toBeInstanceOf(InvalidDefaultValueError);
  });

  it('should link attribute to category', async () => {
    const { service, categoryRepository, attributeRepository, verticalAttributeRepository, allowedValueRepository, categoryAttributeRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(
      Category.create({
        verticalId: 'vertical-1',
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      })
    );
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
      })
    );
    (verticalAttributeRepository.findByVerticalAndAttribute as jest.Mock).mockResolvedValue({
      id: 'vert-attr-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
    });
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    const output = await service.execute({
      categoryId: 'category-1',
      attributeId: 'attribute-1',
      allowedValueRefs: [{ sourceScope: 'ATTRIBUTE', sourceValueId: 'value-1' }],
      additionalAllowedValues: [{ id: 'value-2', name: 'Pequeno', value: 'Small' }],
      defaultValueId: 'value-2',
    });

    expect(output.id).toBeDefined();
    expect(categoryAttributeRepository.save).toHaveBeenCalledTimes(1);
  });
});
