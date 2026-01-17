import { ResolveAttributeConfigurationService } from '../../../../src/modules/attributes/application/services/resolve-attribute-configuration.service';
import { AttributeResolutionService } from '../../../../src/modules/attributes/domain/services/attribute-resolution.service';
import { Attribute } from '../../../../src/modules/attributes/domain/entities/attribute.entity';
import { AttributeRepository } from '../../../../src/modules/attributes/domain/repositories/attribute.repository';
import { VerticalRepository } from '../../../../src/modules/attributes/domain/repositories/vertical.repository';
import { CategoryRepository } from '../../../../src/modules/attributes/domain/repositories/category.repository';
import { VerticalAttributeRepository } from '../../../../src/modules/attributes/domain/repositories/vertical-attribute.repository';
import { CategoryAttributeRepository } from '../../../../src/modules/attributes/domain/repositories/category-attribute.repository';
import { AllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/allowed-value.repository';
import { VerticalAllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/vertical-allowed-value.repository';
import { CategoryAllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/category-allowed-value.repository';
import { NoAttributesForContextError } from '../../../../src/modules/attributes/domain/errors/resolve.errors';

describe('ResolveAttributeConfigurationService', () => {
  const buildService = () => {
    const attributeRepository: AttributeRepository = {
      save: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      listGlobal: jest.fn().mockResolvedValue([]),
      findByIds: jest.fn().mockResolvedValue([]),
    };
    const verticalRepository: VerticalRepository = {
      save: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      existsById: jest.fn().mockResolvedValue(true),
    };
    const categoryRepository: CategoryRepository = {
      save: jest.fn(),
      existsByNameAndVerticalId: jest.fn(),
      existsByCodeAndVerticalId: jest.fn(),
      findById: jest.fn(),
      getAncestry: jest.fn(),
      getInheritanceChain: jest.fn(),
      validateChain: jest.fn(),
    };
    const verticalAttributeRepository: VerticalAttributeRepository = {
      save: jest.fn(),
      existsByVerticalAndAttribute: jest.fn(),
      saveSubsetLinks: jest.fn(),
      findByVerticalAndAttribute: jest.fn(),
      listSubsetLinks: jest.fn().mockResolvedValue([]),
      listByVertical: jest.fn().mockResolvedValue([]),
    };
    const categoryAttributeRepository: CategoryAttributeRepository = {
      save: jest.fn(),
      existsByCategoryAndAttribute: jest.fn(),
      saveSubsetLinks: jest.fn(),
      listByCategories: jest.fn().mockResolvedValue([]),
      listSubsetLinks: jest.fn().mockResolvedValue([]),
    };
    const allowedValueRepository: AllowedValueRepository = {
      saveAll: jest.fn(),
      existsByName: jest.fn(),
      existsByValue: jest.fn(),
      listByAttribute: jest.fn().mockResolvedValue([]),
    };
    const verticalAllowedValueRepository: VerticalAllowedValueRepository = {
      saveAll: jest.fn(),
      listByVerticalAttribute: jest.fn().mockResolvedValue([]),
    };
    const categoryAllowedValueRepository: CategoryAllowedValueRepository = {
      saveAll: jest.fn(),
      listByCategoryAttribute: jest.fn().mockResolvedValue([]),
    };

    return {
      service: new ResolveAttributeConfigurationService(
        attributeRepository,
        verticalAttributeRepository,
        categoryAttributeRepository,
        allowedValueRepository,
        verticalAllowedValueRepository,
        categoryAllowedValueRepository,
        verticalRepository,
        categoryRepository,
        new AttributeResolutionService()
      ),
      attributeRepository,
      verticalAttributeRepository,
    };
  };

  it('should list global attributes', async () => {
    const { service, attributeRepository } = buildService();
    (attributeRepository.listGlobal as jest.Mock).mockResolvedValue([
      Attribute.create({
        name: 'Peso',
        code: 'WEIGHT',
        description: 'Peso',
        type: 'number',
        isMultiValue: false,
        isRequired: true,
      }),
    ]);

    const result = await service.list({});

    expect(result.items).toHaveLength(1);
  });

  it('should reject when no attributes in context', async () => {
    const { service } = buildService();

    await expect(
      service.list({ verticalId: 'vertical-1' })
    ).rejects.toBeInstanceOf(NoAttributesForContextError);
  });
});
