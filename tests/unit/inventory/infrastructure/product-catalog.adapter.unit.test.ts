import { ProductCatalogAdapter } from '../../../../src/modules/inventory/infrastructure/external/product-catalog.adapter';

describe('ProductCatalogAdapter', () => {
  it('should return null when product does not exist', async () => {
    const prisma = {
      product: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const adapter = new ProductCatalogAdapter(prisma);

    const result = await adapter.findById('prod-1');

    expect(result).toBeNull();
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: 'prod-1' },
      select: { id: true, businessUnitId: true },
    });
  });

  it('should return product data when found', async () => {
    const prisma = {
      product: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'prod-1',
          businessUnitId: 'bu-1',
        }),
      },
    } as any;

    const adapter = new ProductCatalogAdapter(prisma);

    const result = await adapter.findById('prod-1');

    expect(result).toEqual({ id: 'prod-1', businessUnitId: 'bu-1' });
  });
});
