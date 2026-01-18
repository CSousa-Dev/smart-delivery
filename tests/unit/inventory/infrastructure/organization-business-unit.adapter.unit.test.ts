import { OrganizationBusinessUnitAdapter } from '../../../../src/modules/inventory/infrastructure/external/organization-business-unit.adapter';

describe('OrganizationBusinessUnitAdapter', () => {
  it('should return false when business unit does not exist', async () => {
    const prisma = {
      businessUnit: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const adapter = new OrganizationBusinessUnitAdapter(prisma);

    const result = await adapter.existsById('bu-1');

    expect(result).toBe(false);
    expect(prisma.businessUnit.findUnique).toHaveBeenCalledWith({
      where: { id: 'bu-1' },
      select: { id: true },
    });
  });

  it('should return true when business unit exists', async () => {
    const prisma = {
      businessUnit: {
        findUnique: jest.fn().mockResolvedValue({ id: 'bu-1' }),
      },
    } as any;

    const adapter = new OrganizationBusinessUnitAdapter(prisma);

    const result = await adapter.existsById('bu-1');

    expect(result).toBe(true);
  });

  it('should return false when business unit does not belong to organization', async () => {
    const prisma = {
      businessUnit: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const adapter = new OrganizationBusinessUnitAdapter(prisma);

    const result = await adapter.existsByIdAndOrganizationId('bu-1', 'org-1');

    expect(result).toBe(false);
    expect(prisma.businessUnit.findFirst).toHaveBeenCalledWith({
      where: { id: 'bu-1', organizationId: 'org-1' },
      select: { id: true },
    });
  });

  it('should return true when business unit belongs to organization', async () => {
    const prisma = {
      businessUnit: {
        findFirst: jest.fn().mockResolvedValue({ id: 'bu-1' }),
      },
    } as any;

    const adapter = new OrganizationBusinessUnitAdapter(prisma);

    const result = await adapter.existsByIdAndOrganizationId('bu-1', 'org-1');

    expect(result).toBe(true);
  });
});
