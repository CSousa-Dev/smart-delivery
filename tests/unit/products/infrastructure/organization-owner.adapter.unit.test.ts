import { OrganizationOwnerAdapter } from '../../../../src/modules/products/infrastructure/external/organization-owner.adapter';

describe('OrganizationOwnerAdapter', () => {
  it('should return null when organization does not exist', async () => {
    const prisma = {
      organization: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const adapter = new OrganizationOwnerAdapter(prisma);

    const result = await adapter.findById('org-1');

    expect(result).toBeNull();
    expect(prisma.organization.findUnique).toHaveBeenCalledWith({
      where: { id: 'org-1' },
      select: { id: true, ownerUserId: true },
    });
  });

  it('should return organization owner', async () => {
    const prisma = {
      organization: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'org-1',
          ownerUserId: 'user-1',
        }),
      },
    } as any;

    const adapter = new OrganizationOwnerAdapter(prisma);

    const result = await adapter.findById('org-1');

    expect(result).toEqual({ id: 'org-1', ownerUserId: 'user-1' });
  });
});
