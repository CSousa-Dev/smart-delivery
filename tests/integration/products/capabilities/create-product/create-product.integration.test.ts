import { CreateProductService } from '../../../../../src/modules/products/application/services/create-product.service';
import { PrismaProductRepository } from '../../../../../src/modules/products/infrastructure/repositories/product/product.repository.impl';
import { createProductsTestPrismaClient } from '../../../../helpers/prisma/products/prisma-test-client';
import { BusinessUnitRepository } from '../../../../../src/modules/products/domain/ports/business-unit.repository';
import { CategoryRepository } from '../../../../../src/modules/products/domain/ports/category.repository';
import { AttributeValueValidationPort } from '../../../../../src/modules/products/domain/ports/attribute-value-validation.port';
import { OrganizationRepository } from '../../../../../src/modules/products/domain/ports/organization.repository';

const describeIf = process.env.DATABASE_URL_PRODUCTS_TEST ? describe : describe.skip;

describeIf('Capability Create Product – [CAP-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createProductsTestPrismaClient() as any;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.productAttributeValue.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
  });

  it('should create product-api with images and attributes – [SCN-001]', async () => {
    const productRepository = new PrismaProductRepository(prisma);
    const businessUnitRepository: BusinessUnitRepository = {
      findById: jest.fn().mockResolvedValue({
        id: 'bu-1',
        organizationId: 'org-1',
        activeVerticalCodes: ['v1'],
      }),
    };
    const categoryRepository: CategoryRepository = {
      findById: jest.fn().mockResolvedValue({
        id: 'cat-1',
        verticalCode: 'v1',
        verticalId: 'vert-1',
      }),
    };
    const attributeValueValidationPort: AttributeValueValidationPort = {
      validate: jest.fn().mockResolvedValue({
        isValid: true,
        errors: [],
      }),
    };
    const organizationRepository: OrganizationRepository = {
      findById: jest.fn().mockResolvedValue({
        id: 'org-1',
        ownerUserId: 'user-1',
      }),
    };

    const service = new CreateProductService(
      productRepository,
      businessUnitRepository,
      categoryRepository,
      attributeValueValidationPort,
      organizationRepository
    );

    const output = await service.execute({
      organizationId: 'org-1',
      businessUnitId: 'bu-1',
      categoryId: 'cat-1',
      code: 'PROD_1',
      title: 'Produto 1',
      shortDescription: 'Descricao curta valida',
      description: 'Descricao detalhada valida para o produto.',
      images: [
        { url: 'https://img/1.png', order: 1, isPrimary: true },
        { url: 'https://img/2.png', order: 2, isPrimary: false },
      ],
      attributes: [{ attributeId: 'attr-1', value: 'value-1' }],
      createdBy: 'user-1',
    });

    const persisted = await prisma.product.findUnique({
      where: { id: output.id },
      include: { images: true, attributes: true },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.code).toBe('PROD_1');
    expect(persisted?.images).toHaveLength(2);
    expect(persisted?.attributes).toHaveLength(1);
  });
});
