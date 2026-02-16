import { CreateVerticalService } from '../../../../src/modules/attributes/application/services/create-vertical.service';
import {
  VerticalCodeAlreadyExistsError,
  VerticalNameAlreadyExistsError,
} from '../../../../src/modules/attributes/domain/errors/vertical.errors';
import { VerticalRepository } from '../../../../src/modules/attributes/domain/repositories/vertical.repository';

describe('CreateVerticalService', () => {
  const buildService = () => {
    const verticalRepository: VerticalRepository = {
      save: jest.fn(),
      update: jest.fn(),
      existsByName: jest.fn().mockResolvedValue(false),
      existsByCode: jest.fn().mockResolvedValue(false),
      existsByNameExcludingId: jest.fn(),
      existsByCodeExcludingId: jest.fn(),
      existsById: jest.fn(),
      findById: jest.fn(),
      listAll: jest.fn(),
    };

    return {
      service: new CreateVerticalService(verticalRepository),
      verticalRepository,
    };
  };

  it('should reject duplicated name', async () => {
    const { service, verticalRepository } = buildService();
    (verticalRepository.existsByName as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        name: 'Food',
        code: 'FOOD',
        description: 'Food operations',
      })
    ).rejects.toBeInstanceOf(VerticalNameAlreadyExistsError);
  });

  it('should reject duplicated code', async () => {
    const { service, verticalRepository } = buildService();
    (verticalRepository.existsByCode as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        name: 'Food',
        code: 'FOOD',
        description: 'Food operations',
      })
    ).rejects.toBeInstanceOf(VerticalCodeAlreadyExistsError);
  });

  it('should create vertical', async () => {
    const { service, verticalRepository } = buildService();

    const output = await service.execute({
      name: 'Food',
      code: 'FOOD',
      description: 'Food operations',
    });

    expect(output.id).toBeDefined();
    expect(verticalRepository.save).toHaveBeenCalledTimes(1);
  });
});
