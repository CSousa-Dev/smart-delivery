import { LinkProductToItemService } from '../../../../../src/modules/inventory/application/services/link-product-to-item.service';
import { PrismaProductItemLinkRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/product-item-link/product-item-link.repository.impl';
import { PrismaInventoryItemRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/inventory-item/inventory-item.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';
import { ProductRepository } from '../../../../../src/modules/inventory/domain/ports/product.repository';
import { ItemAlreadyLinkedError } from '../../../../../src/modules/inventory/domain/errors/product-item-link.errors';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Link Product to Inventory Item – [CAP-001]', () => {
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

  const seedUnitOfMeasure = async () => {
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
  };

  const seedItem = async (id = 'item-1', businessUnitId = 'bu-1') => {
    await seedUnitOfMeasure();
    await prisma.inventoryItem.create({
      data: {
        id,
        organizationId: 'org-1',
        businessUnitId,
        name: 'Acucar',
        nameNormalized: 'acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      },
    });
  };

  it('should link product and item – [SCN-001]', async () => {
    await seedItem();
    const productRepository: ProductRepository = {
      findById: jest.fn().mockResolvedValue({ id: 'prod-1', businessUnitId: 'bu-1' }),
    };

    const service = new LinkProductToItemService(
      new PrismaProductItemLinkRepository(prisma),
      new PrismaInventoryItemRepository(prisma),
      productRepository
    );

    const output = await service.execute({
      productId: 'prod-1',
      itemId: 'item-1',
      businessUnitId: 'bu-1',
      createdBy: 'user-1',
    });

    const persisted = await prisma.productItemLink.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.status).toBe('ACTIVE');
  });

  it('should reject when item already linked – [SCN-006]', async () => {
    await seedItem();
    const productRepository: ProductRepository = {
      findById: jest.fn().mockResolvedValue({ id: 'prod-1', businessUnitId: 'bu-1' }),
    };

    const service = new LinkProductToItemService(
      new PrismaProductItemLinkRepository(prisma),
      new PrismaInventoryItemRepository(prisma),
      productRepository
    );

    await service.execute({
      productId: 'prod-1',
      itemId: 'item-1',
      businessUnitId: 'bu-1',
      createdBy: 'user-1',
    });

    await expect(
      service.execute({
        productId: 'prod-2',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(ItemAlreadyLinkedError);
  });
});
