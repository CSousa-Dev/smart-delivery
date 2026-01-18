import { UnlinkProductFromItemService } from '../../../../../src/modules/inventory/application/services/unlink-product-from-item.service';
import { PrismaProductItemLinkRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/product-item-link/product-item-link.repository.impl';
import { PrismaInventoryItemRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/inventory-item/inventory-item.repository.impl';
import { ProductRepository } from '../../../../../src/modules/inventory/domain/ports/product.repository';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Unlink Product from Item – [CAP-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createInventoryTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.productItemLink.deleteMany();
    await prisma.inventoryItem.deleteMany();
    await prisma.unitOfMeasure.deleteMany();
  });

  const seedLink = async () => {
    await prisma.unitOfMeasure.create({
      data: {
        id: 'uom-1',
        organizationId: 'org-1',
        code: 'KG',
        codeNormalized: 'KG',
        name: 'Kilograma',
        nameNormalized: 'kilograma',
        symbol: 'kg',
        allowsFraction: true,
        status: 'ACTIVE',
        createdBy: 'user-1',
      },
    });
    await prisma.inventoryItem.create({
      data: {
        id: 'item-1',
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        nameNormalized: 'acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: false,
        createdBy: 'user-1',
      },
    });
    await prisma.productItemLink.create({
      data: {
        id: 'link-1',
        businessUnitId: 'bu-1',
        productId: 'prod-1',
        itemId: 'item-1',
        status: 'ACTIVE',
        createdBy: 'user-1',
      },
    });
  };

  it('should deactivate link – [SCN-001]', async () => {
    await seedLink();
    const productRepository: ProductRepository = {
      findById: jest.fn().mockResolvedValue({ id: 'prod-1', businessUnitId: 'bu-1' }),
    };

    const service = new UnlinkProductFromItemService(
      new PrismaProductItemLinkRepository(prisma),
      new PrismaInventoryItemRepository(prisma),
      productRepository
    );

    const output = await service.execute({
      productId: 'prod-1',
      itemId: 'item-1',
      businessUnitId: 'bu-1',
      updatedBy: 'user-1',
    });

    const persisted = await prisma.productItemLink.findUnique({
      where: { id: output.id },
    });

    expect(persisted?.status).toBe('INACTIVE');
  });
});
