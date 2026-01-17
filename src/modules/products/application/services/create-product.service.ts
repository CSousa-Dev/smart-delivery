import {
  CreateProductInput,
  CreateProductOutput,
} from '../dtos/create-product.dto';
import { Product, ProductCode, ProductTitle } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { BusinessUnitRepository } from '../../domain/ports/business-unit.repository';
import { CategoryRepository } from '../../domain/ports/category.repository';
import { AttributeValueValidationPort } from '../../domain/ports/attribute-value-validation.port';
import {
  BusinessUnitNotFoundError,
  BusinessUnitOrganizationMismatchError,
  CategoryNotFoundError,
  CategoryVerticalNotEnabledError,
  InvalidProductAttributesError,
  MissingRequiredAttributesError,
  ProductCodeAlreadyExistsError,
  ProductTitleAlreadyExistsError,
} from '../../domain/errors/product.errors';

export class CreateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly attributeValueValidationPort: AttributeValueValidationPort
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const businessUnit = await this.businessUnitRepository.findById(input.businessUnitId);
    if (!businessUnit) {
      throw new BusinessUnitNotFoundError(input.businessUnitId);
    }
    if (businessUnit.organizationId !== input.organizationId) {
      throw new BusinessUnitOrganizationMismatchError(
        input.businessUnitId,
        input.organizationId
      );
    }

    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new CategoryNotFoundError(input.categoryId);
    }
    if (!businessUnit.enabledVerticalIds.includes(category.verticalId)) {
      throw new CategoryVerticalNotEnabledError(input.categoryId, category.verticalId);
    }

    const code = ProductCode.create(input.code);
    const title = ProductTitle.create(input.title);

    const codeExists = await this.productRepository.existsByCodeAndOrganizationId(
      code.normalized,
      input.organizationId
    );
    if (codeExists) {
      throw new ProductCodeAlreadyExistsError(input.code);
    }

    const titleExists = await this.productRepository.existsByTitleAndBusinessUnitId(
      title.normalized,
      input.businessUnitId
    );
    if (titleExists) {
      throw new ProductTitleAlreadyExistsError(input.title);
    }

    const validation = await this.attributeValueValidationPort.validate({
      categoryId: input.categoryId,
      verticalId: category.verticalId,
      attributes: input.attributes ?? [],
    });
    if (!validation.isValid) {
      const hasMissingRequired = validation.errors.some(
        (error) => error.reason === 'REQUIRED_VALUE_MISSING'
      );
      if (hasMissingRequired) {
        throw new MissingRequiredAttributesError();
      }
      throw new InvalidProductAttributesError();
    }

    const product = Product.create({
      ...input,
      attributes: input.attributes ?? [],
    });

    await this.productRepository.save(product);

    return {
      id: product.getId().value,
      organizationId: product.getOrganizationId(),
      businessUnitId: product.getBusinessUnitId(),
      categoryId: product.getCategoryId(),
      code: product.getCode(),
      title: product.getTitle(),
      shortDescription: product.getShortDescription(),
      description: product.getDescription(),
      images: product.getImages().map((image) => ({
        url: image.url,
        order: image.order,
        altText: image.altText,
        isPrimary: image.isPrimary,
      })),
      attributes: product.getAttributes().map((attribute) => ({
        attributeId: attribute.attributeId,
        value: attribute.value,
      })),
      createdBy: product.getCreatedBy(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    };
  }
}
