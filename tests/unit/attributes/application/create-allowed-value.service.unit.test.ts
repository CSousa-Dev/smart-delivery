import { CreateAllowedValueService } from '../../../../src/modules/attributes/application/services/create-allowed-value.service';
import {
  AttributeNotFoundError,
  AttributeNotOptionTypeError,
} from '../../../../src/modules/attributes/domain/errors/attribute-lookup.errors';
import {
  AllowedValueNameAlreadyExistsError,
  AllowedValueValueAlreadyExistsError,
} from '../../../../src/modules/attributes/domain/errors/allowed-value.errors';
import { Attribute } from '../../../../src/modules/attributes/domain/entities/attribute.entity';
import { AttributeRepository } from '../../../../src/modules/attributes/domain/repositories/attribute.repository';
import { AllowedValueRepository } from '../../../../src/modules/attributes/domain/repositories/allowed-value.repository';

describe('CreateAllowedValueService', () => {
  const buildService = () => {
    const attributeRepository: AttributeRepository = {
      save: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      listGlobal: jest.fn().mockResolvedValue([]),
      findByIds: jest.fn().mockResolvedValue([]),
    };
    const allowedValueRepository: AllowedValueRepository = {
      saveAll: jest.fn(),
      existsByName: jest.fn().mockResolvedValue(false),
      existsByValue: jest.fn().mockResolvedValue(false),
      listByAttribute: jest.fn().mockResolvedValue([]),
    };

    return {
      service: new CreateAllowedValueService(attributeRepository, allowedValueRepository),
      attributeRepository,
      allowedValueRepository,
    };
  };

  it('should reject when attribute does not exist', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        attributeId: 'attr-1',
        name: 'Tamanho',
        value: 'Large',
      })
    ).rejects.toBeInstanceOf(AttributeNotFoundError);
  });

  it('should reject when attribute is not option type', async () => {
    const { service, attributeRepository } = buildService();
    (attributeRepository.findById as jest.Mock).mockResolvedValue(
      Attribute.create({
        name: 'Peso',
        code: 'WEIGHT',
        description: 'Peso do produto',
        type: 'number',
        isMultiValue: false,
        isRequired: true,
        minValue: 0,
        maxValue: 100,
      })
    );

    await expect(
      service.execute({
        attributeId: 'attr-1',
        name: 'Tamanho',
        value: 'Large',
      })
    ).rejects.toBeInstanceOf(AttributeNotOptionTypeError);
  });

  it('should reject duplicated name', async () => {
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
    (allowedValueRepository.existsByName as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        attributeId: 'attr-1',
        name: 'Tamanho',
        value: 'Large',
      })
    ).rejects.toBeInstanceOf(AllowedValueNameAlreadyExistsError);
  });

  it('should reject duplicated value', async () => {
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
    (allowedValueRepository.existsByValue as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        attributeId: 'attr-1',
        name: 'Tamanho',
        value: 'Large',
      })
    ).rejects.toBeInstanceOf(AllowedValueValueAlreadyExistsError);
  });

  it('should create allowed value', async () => {
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

    const output = await service.execute({
      attributeId: 'attr-1',
      name: 'Tamanho',
      value: 'Large',
      description: 'Grande',
    });

    expect(output.id).toBeDefined();
    expect(allowedValueRepository.saveAll).toHaveBeenCalledTimes(1);
  });
});
