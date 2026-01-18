import { OrganizationBusinessUnitAdapter } from '../../../../src/modules/products/infrastructure/external/organization-business-unit.adapter';

describe('OrganizationBusinessUnitAdapter', () => {
  it('should return null when business unit is not found', async () => {
    const prisma = {
      businessUnit: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
      businessUnitVertical: {
        findMany: jest.fn(),
      },
    } as any;

    const adapter = new OrganizationBusinessUnitAdapter(prisma);

    const result = await adapter.findById('bu-1');

    expect(result).toBeNull();
    expect(prisma.businessUnit.findUnique).toHaveBeenCalledWith({
      where: { id: 'bu-1' },
      select: { id: true, organizationId: true },
    });
  });

  it('should return business unit with active verticals', async () => {
    const prisma = {
      businessUnit: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'bu-1',
          organizationId: 'org-1',
        }),
      },
      businessUnitVertical: {
        findMany: jest.fn().mockResolvedValue([
          { verticalId: 'vert-1' },
          { verticalId: 'vert-2' },
        ]),
      },
    } as any;

    const adapter = new OrganizationBusinessUnitAdapter(prisma);

    const result = await adapter.findById('bu-1');

    expect(result).toEqual({
      id: 'bu-1',
      organizationId: 'org-1',
      activeVerticalIds: ['vert-1', 'vert-2'],
    });
    expect(prisma.businessUnitVertical.findMany).toHaveBeenCalledWith({
      where: { businessUnitId: 'bu-1', statusId: 'ACTIVE' },
      select: { verticalId: true },
    });
  });
});
