import { PrismaClient } from '@prisma/client';
import { CreateCategoryService } from '../../../../../src/modules/attributes/application/services/create-category.service';
import { CategoryHierarchyService } from '../../../../../src/modules/attributes/domain/services/category-hierarchy.service';
import { PrismaCategoryRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/category/category.repository.impl';
import { PrismaVerticalRepository } from '../../../../../src/modules/attributes/infrastructure/repositories/vertical/vertical.repository.impl';
import { createAttributesTestPrismaClient } from '../../../../helpers/prisma/attributes/prisma-test-client';

const describeIf = process.env.DATABASE_URL_ATTRIBUTES_TEST ? describe : describe.skip;

describeIf('Capability Create Category – [CAP-003]', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = createAttributesTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.categoryAllowedValueLink.deleteMany();
    await prisma.categoryAllowedValue.deleteMany();
    await prisma.categoryAttribute.deleteMany();
    await prisma.verticalAllowedValueLink.deleteMany();
    await prisma.verticalAllowedValue.deleteMany();
    await prisma.verticalAttribute.deleteMany();
    await prisma.attributeAllowedValue.deleteMany();
    await prisma.category.deleteMany();
    await prisma.attribute.deleteMany();
    await prisma.vertical.deleteMany();
  });

  it('should create a root category – [SCN-001]', async () => {
    const vertical = await prisma.vertical.create({
      data: {
        id: 'vertical-1',
        name: 'Food',
        code: 'FOOD',
        description: 'Food operations',
      },
    });

    const service = new CreateCategoryService(
      new PrismaCategoryRepository(prisma),
      new PrismaVerticalRepository(prisma),
      new CategoryHierarchyService()
    );

    const output = await service.execute({
      verticalId: vertical.id,
      name: 'Bebidas',
      code: 'BEVERAGES',
      description: 'Bebidas',
    });

    const persisted = await prisma.category.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.depth).toBe(1);
  });

  it('should create a child category – [SCN-002]', async () => {
    const vertical = await prisma.vertical.create({
      data: {
        id: 'vertical-1',
        name: 'Food',
        code: 'FOOD',
        description: 'Food operations',
      },
    });

    const parent = await prisma.category.create({
      data: {
        id: 'category-1',
        verticalId: vertical.id,
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
        depth: 1,
      },
    });

    const service = new CreateCategoryService(
      new PrismaCategoryRepository(prisma),
      new PrismaVerticalRepository(prisma),
      new CategoryHierarchyService()
    );

    const output = await service.execute({
      verticalId: vertical.id,
      parentCategoryId: parent.id,
      name: 'Refrigerantes',
      code: 'SODA',
      description: 'Refrigerantes',
    });

    const persisted = await prisma.category.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.depth).toBe(2);

    expect(persisted?.parentCategoryId).toBe(parent.id);
  });
});
