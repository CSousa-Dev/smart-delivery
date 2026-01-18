import { LinkAttributeToVerticalService } from '../../../../src/modules/attributes/application/services/link-attribute-to-vertical.service';
import { Attribute } from '../../../../src/modules/attributes/domain/entities/attribute.entity';
import { AttributeNotFoundError, AttributeNotOptionTypeError } from '../../../../src/modules/attributes/domain/errors/attribute-lookup.errors';
import { InvalidAttributeLimitsError, InvalidDefaultValueError } from '../../../../src/modules/attributes/domain/errors/attribute.errors';
import { VerticalNotFoundError } from '../../../../src/modules/attributes/domain/errors/category.errors';
import { AllowedValueConflictError, AllowedValueNotFoundError, VerticalAttributeAlreadyExistsError } from '../../../../src/modules/attributes/domain/errors/vertical-attribute.errors';
import { AttributeRepository } from '../../../../src/modules/attributes/domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/allowed-value.repository';
import { VerticalRepository } from '../../../../src/modules/attributes/domain/repositories/vertical.repository';
import { VerticalAttributeRepository } from '../../../../src/modules/attributes/domain/repositories/vertical-attribute.repository';
import { VerticalAllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/vertical-allowed-value.repository';

describe('LinkAttributeToVerticalService', () => {
  const buildService = () => {
    const verticalRepository: VerticalRepository = {
      save: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      existsById: jest.fn().mockResolvedValue(true),
    };
    const attributeRepository: AttributeRepository = {
      save: jest.fn(),
      updateDefaultValue: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      listGlobal: jest.fn().mockResolvedValue([]),
      findByIds: jest.fn().mockResolvedValue([]),
    };
    const allowedValueRepository: AllowedValueRepository = {
      saveAll: jest.fn(),
      existsByName: jest.fn(),
      existsByValue: jest.fn(),
      listByAttribute: jest.fn().mockResolvedValue([]),
    };
    const verticalAttributeRepository: VerticalAttributeRepository = {
      save: jest.fn(),
      existsByVerticalAndAttribute: jest.fn().mockResolvedValue(false),
      saveSubsetLinks: jest.fn(),
      findByVerticalAndAttribute: jest.fn().mockResolvedValue(null),
      listSubsetLinks: jest.fn().mockResolvedValue([]),
      listByVertical: jest.fn().mockResolvedValue([]),
    };
    const verticalAllowedValueRepository: VerticalAllowedValueRepository = {
      saveAll: jest.fn(),
      listByVerticalAttribute: jest.fn().mockResolvedValue([]),
    };

    return {
      service: new LinkAttributeToVerticalService(
        verticalRepository,
        attributeRepository,
        allowedValueRepository,
        verticalAttributeRepository,
        verticalAllowedValueRepository
      ),
      verticalRepository,
      attributeRepository,
      allowedValueRepository,
      verticalAttributeRepository,
      verticalAllowedValueRepository,
    };
  };

  it('should reject when vertical does not exist', async () => {
    const { service, verticalRepository } = buildService();
    (verticalRepository.existsById as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(VerticalNotFoundError);
  });

  it('should reject when attribute does not exist', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(AttributeNotFoundError);
  });

  it('should reject duplicated link', async () => {
    const { service, attributeRepository, verticalAttributeRepository } = buildService();
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
    (verticalAttributeRepository.existsByVerticalAndAttribute as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
      })
    ).rejects.toBeInstanceOf(VerticalAttributeAlreadyExistsError);
  });

  it('should reject invalid limits', async () => {
    const { service, attributeRepository } = buildService();
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

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        minValue: 10,
        maxValue: 5,
      })
    ).rejects.toBeInstanceOf(InvalidAttributeLimitsError);
  });

  it('should reject allowed values for non-option attribute', async () => {
    const { service, attributeRepository } = buildService();
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

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        allowedValueIds: ['value-1'],
      })
    ).rejects.toBeInstanceOf(AttributeNotOptionTypeError);
  });

  it('should reject subset with missing allowed value', async () => {
    const { service, attributeRepository, allowedValueRepository } = buildService();
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
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        allowedValueIds: ['value-2'],
      })
    ).rejects.toBeInstanceOf(AllowedValueNotFoundError);
  });

  it('should reject conflicting additional values', async () => {
    const { service, attributeRepository, allowedValueRepository } = buildService();
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
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        additionalAllowedValues: [{ name: 'Grande', value: 'ExtraLarge' }],
      })
    ).rejects.toBeInstanceOf(AllowedValueConflictError);
  });

  it('should reject invalid default value', async () => {
    const { service, attributeRepository, allowedValueRepository } = buildService();
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
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        attributeId: 'attribute-1',
        defaultValueId: 'value-1',
      })
    ).rejects.toBeInstanceOf(InvalidDefaultValueError);
  });

  it('should link attribute to vertical', async () => {
    const { service, attributeRepository, allowedValueRepository, verticalAttributeRepository } = buildService();
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
    (allowedValueRepository.listByAttribute as jest.Mock).mockResolvedValue([
      { id: 'value-1', name: 'Grande', value: 'Large' },
    ]);

    const output = await service.execute({
      verticalId: 'vertical-1',
      attributeId: 'attribute-1',
      allowedValueIds: ['value-1'],
      additionalAllowedValues: [{ id: 'value-2', name: 'Pequeno', value: 'Small' }],
      defaultValueId: 'value-2',
    });

    expect(output.id).toBeDefined();
    expect(verticalAttributeRepository.save).toHaveBeenCalledTimes(1);
  });
});
