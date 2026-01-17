import { CreateAttributeService } from '../../../../src/modules/attributes/application/services/create-attribute.service';
import {
  AttributeCodeAlreadyExistsError,
  AttributeNameAlreadyExistsError,
  DefaultValueNotFoundError,
  InvalidDefaultValueError,
} from '../../../../src/modules/attributes/domain/errors/attribute.errors';
import {
  AllowedValueNameAlreadyExistsError,
  AllowedValueValueAlreadyExistsError,
} from '../../../../src/modules/attributes/domain/errors/allowed-value.errors';
import { AttributeRepository } from '../../../../src/modules/attributes/domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/allowed-value.repository';

describe('CreateAttributeService', () => {
  const buildService = () => {
    const attributeRepository: AttributeRepository = {
      save: jest.fn(),
      existsByName: jest.fn().mockResolvedValue(false),
      existsByCode: jest.fn().mockResolvedValue(false),
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

    return {
      service: new CreateAttributeService(attributeRepository, allowedValueRepository),
      attributeRepository,
      allowedValueRepository,
    };
  };

  it('should reject duplicated name', async () => {
    const { service, attributeRepository } = buildService();
    (attributeRepository.existsByName as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        name: 'Cor',
        code: 'COLOR',
        description: 'Cor do produto',
        type: 'text',
        isMultiValue: false,
        isRequired: true,
      })
    ).rejects.toBeInstanceOf(AttributeNameAlreadyExistsError);
  });

  it('should reject duplicated code', async () => {
    const { service, attributeRepository } = buildService();
    (attributeRepository.existsByCode as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        name: 'Cor',
        code: 'COLOR',
        description: 'Cor do produto',
        type: 'text',
        isMultiValue: false,
        isRequired: true,
      })
    ).rejects.toBeInstanceOf(AttributeCodeAlreadyExistsError);
  });

  it('should reject defaultValueId when attribute is not required', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho do produto',
        type: 'option',
        isMultiValue: false,
        isRequired: false,
        defaultValueId: 'value-1',
      })
    ).rejects.toBeInstanceOf(InvalidDefaultValueError);
  });

  it('should reject defaultValueId without allowed values', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho do produto',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
        defaultValueId: 'value-1',
      })
    ).rejects.toBeInstanceOf(InvalidDefaultValueError);
  });

  it('should reject defaultValueId not present in allowed values', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho do produto',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
        defaultValueId: 'value-1',
        allowedValues: [
          { id: 'value-2', name: 'Tamanho', value: 'Large' },
        ],
      })
    ).rejects.toBeInstanceOf(DefaultValueNotFoundError);
  });

  it('should reject duplicated allowed value name or value', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho do produto',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
        allowedValues: [
          { name: 'Grande', value: 'Large' },
          { name: 'grande', value: 'ExtraLarge' },
        ],
      })
    ).rejects.toBeInstanceOf(AllowedValueNameAlreadyExistsError);

    await expect(
      service.execute({
        name: 'Tamanho',
        code: 'SIZE',
        description: 'Tamanho do produto',
        type: 'option',
        isMultiValue: false,
        isRequired: true,
        allowedValues: [
          { name: 'Grande', value: 'Large' },
          { name: 'Pequeno', value: 'large' },
        ],
      })
    ).rejects.toBeInstanceOf(AllowedValueValueAlreadyExistsError);
  });

  it('should create attribute and allowed values', async () => {
    const { service, attributeRepository, allowedValueRepository } = buildService();
    let savedAttributeId = '';
    (attributeRepository.save as jest.Mock).mockImplementation((attribute) => {
      savedAttributeId = attribute.getId().value;
      return Promise.resolve();
    });

    await service.execute({
      name: 'Tamanho',
      code: 'SIZE',
      description: 'Tamanho do produto',
      type: 'option',
      isMultiValue: false,
      isRequired: true,
      defaultValueId: 'value-1',
      allowedValues: [
        { id: 'value-1', name: 'Grande', value: 'Large' },
      ],
    });

    expect(attributeRepository.save).toHaveBeenCalledTimes(1);
    expect(allowedValueRepository.saveAll).toHaveBeenCalledTimes(1);

    const [allowedValues] = (allowedValueRepository.saveAll as jest.Mock).mock
      .calls[0];
    expect(allowedValues[0].getAttributeId()).toBe(savedAttributeId);
  });
});
