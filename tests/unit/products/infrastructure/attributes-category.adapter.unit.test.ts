import { AttributesCategoryAdapter } from '../../../../src/modules/products/infrastructure/external/attributes-category.adapter';

describe('AttributesCategoryAdapter', () => {
  it('should return null when category does not exist', async () => {
    const prisma = {
      category: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const adapter = new AttributesCategoryAdapter(prisma);

    const result = await adapter.findById('cat-1');

    expect(result).toBeNull();
    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { id: 'cat-1' },
      select: { id: true, verticalId: true, vertical: { select: { code: true } } },
    });
  });

  it('should return category with vertical id and vertical code', async () => {
    const prisma = {
      category: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'cat-1',
          verticalId: 'vert-1',
          vertical: { code: 'v1' },
        }),
      },
    } as any;

    const adapter = new AttributesCategoryAdapter(prisma);

    const result = await adapter.findById('cat-1');

    expect(result).toEqual({
      id: 'cat-1',
      verticalCode: 'v1',
      verticalId: 'vert-1',
    });
  });
});
