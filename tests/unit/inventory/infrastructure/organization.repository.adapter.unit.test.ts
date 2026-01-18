import { OrganizationRepositoryAdapter } from '../../../../src/modules/inventory/infrastructure/external/organization.repository.adapter';

describe('OrganizationRepositoryAdapter', () => {
  it('should return false when organization does not exist', async () => {
    const prisma = {
      organization: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const adapter = new OrganizationRepositoryAdapter(prisma);

    const result = await adapter.existsById('org-1');

    expect(result).toBe(false);
    expect(prisma.organization.findUnique).toHaveBeenCalledWith({
      where: { id: 'org-1' },
      select: { id: true },
    });
  });

  it('should return true when organization exists', async () => {
    const prisma = {
      organization: {
        findUnique: jest.fn().mockResolvedValue({ id: 'org-1' }),
      },
    } as any;

    const adapter = new OrganizationRepositoryAdapter(prisma);

    const result = await adapter.existsById('org-1');

    expect(result).toBe(true);
  });
});
