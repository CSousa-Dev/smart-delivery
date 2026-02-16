import { ListOrganizationsService } from '../../../../src/modules/organization/application/services/list-organizations.service';
import { Organization } from '../../../../src/modules/organization/domain/entities/organization.entity';
import { OrganizationVerticalLink } from '../../../../src/modules/organization/domain/entities/organization-vertical-link.entity';
import { OrganizationRepository } from '../../../../src/modules/organization/domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../../../src/modules/organization/domain/repositories/organization-vertical.repository';
import { VerticalCatalogPort } from '../../../../src/modules/organization/application/ports/vertical-catalog.port';
describe('ListOrganizationsService', () => {
  const buildOrganization = (id: string, createdAt: Date) =>
    Organization.create({
      id,
      tradeName: `Org ${id}`,
      legalName: `Org ${id} LTDA`,
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: 'user-1',
      verticalCodes: ['v1'],
      status: 'ACTIVE',
      createdAt,
    });

  const buildService = () => {
    const organizationRepository: OrganizationRepository = {
      save: jest.fn(),
      existsById: jest.fn(),
      existsByDocumentNumber: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn().mockResolvedValue([buildOrganization('org-1', new Date())]),
      countAll: jest.fn().mockResolvedValue(1),
    };

    const organizationVerticalRepository: OrganizationVerticalRepository = {
      saveMany: jest.fn(),
      save: jest.fn(),
      listByOrganizationId: jest.fn(),
      listByOrganizationIds: jest.fn().mockResolvedValue([
        OrganizationVerticalLink.restore({
          organizationId: 'org-1',
          verticalCode: 'v1',
          status: 'ACTIVE',
          createdAt: new Date(),
        }),
      ]),
      listActiveByOrganizationId: jest.fn(),
      findByOrganizationAndVerticalCode: jest.fn(),
      findActiveByOrganizationAndVerticalCode: jest.fn(),
      existsActiveByOrganizationAndVerticalCode: jest.fn(),
      updateStatus: jest.fn(),
      countActiveByOrganizationId: jest.fn(),
    };

    const verticalCatalog: VerticalCatalogPort = {
      listAllActive: jest.fn().mockResolvedValue([{ code: 'v1', name: 'V1', description: 'd1' }]),
      validateCodes: jest.fn().mockResolvedValue(true),
    };

    return {
      service: new ListOrganizationsService(
        organizationRepository,
        organizationVerticalRepository,
        verticalCatalog
      ),
      organizationRepository,
      organizationVerticalRepository,
      verticalCatalog,
    };
  };

  it('should normalize invalid pagination and sorting', async () => {
    const { service, organizationRepository } = buildService();

    await service.execute({ page: 0, pageSize: 120, sortDirection: 'invalid' });

    expect(organizationRepository.list).toHaveBeenCalledWith(1, 20, 'desc');
  });

  it('should return organizations with vertical ids', async () => {
    const { service } = buildService();

    const output = await service.execute({});

    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one organization item');
    }
    expect(first.verticals.map((v) => v.code)).toEqual(['v1']);
    expect(output.totalItems).toBe(1);
  });

  it('should handle empty list', async () => {
    const { service, organizationRepository, organizationVerticalRepository } = buildService();
    (organizationRepository.list as jest.Mock).mockResolvedValue([]);
    (organizationRepository.countAll as jest.Mock).mockResolvedValue(0);
    (organizationVerticalRepository.listByOrganizationIds as jest.Mock).mockResolvedValue([]);

    const output = await service.execute({});

    expect(output.items).toEqual([]);
    expect(output.totalItems).toBe(0);
    expect(output.totalPages).toBe(0);
  });
});
