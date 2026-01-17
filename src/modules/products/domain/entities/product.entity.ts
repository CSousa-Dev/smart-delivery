import { randomUUID } from 'crypto';
import {
  InvalidProductCodeError,
  InvalidProductDescriptionError,
  InvalidProductImagesError,
  InvalidProductAttributesError,
  InvalidProductShortDescriptionError,
  InvalidProductTitleError,
} from '../errors/product.errors';

export class ProductId {
  private constructor(public readonly value: string) {}

  static create(value?: string): ProductId {
    return new ProductId(value ?? randomUUID());
  }
}

export class OrganizationId {
  private constructor(public readonly value: string) {}

  static create(value: string): OrganizationId {
    return new OrganizationId(value);
  }
}

export class BusinessUnitId {
  private constructor(public readonly value: string) {}

  static create(value: string): BusinessUnitId {
    return new BusinessUnitId(value);
  }
}

export class CategoryId {
  private constructor(public readonly value: string) {}

  static create(value: string): CategoryId {
    return new CategoryId(value);
  }
}

export class ProductCode {
  private static readonly CODE_REGEX = /^[A-Za-z0-9_-]+$/;

  private constructor(
    public readonly value: string,
    public readonly normalized: string
  ) {}

  static create(value: string): ProductCode {
    if (!value || value.trim() !== value) {
      throw new InvalidProductCodeError(value);
    }
    if (value.length < 3 || value.length > 40) {
      throw new InvalidProductCodeError(value);
    }
    if (!this.CODE_REGEX.test(value)) {
      throw new InvalidProductCodeError(value);
    }

    return new ProductCode(value, value.toLowerCase());
  }
}

export class ProductTitle {
  private constructor(
    public readonly value: string,
    public readonly normalized: string
  ) {}

  static create(value: string): ProductTitle {
    const trimmed = value.trim();
    if (trimmed.length < 3 || trimmed.length > 120) {
      throw new InvalidProductTitleError(value);
    }

    return new ProductTitle(trimmed, trimmed.toLowerCase());
  }
}

export class ProductShortDescription {
  private constructor(public readonly value: string) {}

  static create(value: string): ProductShortDescription {
    const trimmed = value.trim();
    if (trimmed.length < 10 || trimmed.length > 160) {
      throw new InvalidProductShortDescriptionError(value);
    }

    return new ProductShortDescription(trimmed);
  }
}

export class ProductDescription {
  private constructor(public readonly value: string) {}

  static create(value: string): ProductDescription {
    const trimmed = value.trim();
    if (trimmed.length < 10 || trimmed.length > 2000) {
      throw new InvalidProductDescriptionError(value);
    }

    return new ProductDescription(trimmed);
  }
}

export class ProductImage {
  private constructor(
    public readonly url: string,
    public readonly order: number,
    public readonly altText: string | null,
    public readonly isPrimary: boolean
  ) {}

  static create(props: {
    url: string;
    order: number;
    altText?: string | null;
    isPrimary: boolean;
  }): ProductImage {
    const url = props.url.trim();
    if (!url) {
      throw new InvalidProductImagesError();
    }
    if (!Number.isInteger(props.order) || props.order < 1 || props.order > 4) {
      throw new InvalidProductImagesError();
    }

    return new ProductImage(url, props.order, props.altText?.trim() ?? null, props.isPrimary);
  }
}

export class ProductAttributeValue {
  private constructor(
    public readonly attributeId: string,
    public readonly value: string
  ) {}

  static create(props: { attributeId: string; value: string }): ProductAttributeValue {
    const attributeId = props.attributeId.trim();
    const value = props.value.trim();
    if (!attributeId || !value) {
      throw new InvalidProductAttributesError();
    }

    return new ProductAttributeValue(attributeId, value);
  }
}

export interface CreateProductProps {
  id?: string;
  organizationId: string;
  businessUnitId: string;
  categoryId: string;
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  images: Array<{
    url: string;
    order: number;
    altText?: string | null;
    isPrimary: boolean;
  }>;
  attributes: Array<{ attributeId: string; value: string }>;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Product {
  private constructor(
    private readonly id: ProductId,
    private readonly organizationId: OrganizationId,
    private readonly businessUnitId: BusinessUnitId,
    private readonly categoryId: CategoryId,
    private readonly code: ProductCode,
    private readonly title: ProductTitle,
    private readonly shortDescription: ProductShortDescription,
    private readonly description: ProductDescription,
    private readonly images: ProductImage[],
    private readonly attributes: ProductAttributeValue[],
    private readonly createdBy: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateProductProps): Product {
    const images = props.images.map((image) => ProductImage.create(image));
    Product.validateImages(images);
    const attributes = props.attributes.map((attribute) =>
      ProductAttributeValue.create(attribute)
    );

    return new Product(
      ProductId.create(props.id),
      OrganizationId.create(props.organizationId),
      BusinessUnitId.create(props.businessUnitId),
      CategoryId.create(props.categoryId),
      ProductCode.create(props.code),
      ProductTitle.create(props.title),
      ProductShortDescription.create(props.shortDescription),
      ProductDescription.create(props.description),
      images,
      attributes,
      props.createdBy,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  private static validateImages(images: ProductImage[]): void {
    if (images.length === 0 || images.length > 4) {
      throw new InvalidProductImagesError();
    }

    const primaryCount = images.filter((image) => image.isPrimary).length;
    if (primaryCount !== 1) {
      throw new InvalidProductImagesError();
    }

    const orders = new Set<number>();
    for (const image of images) {
      if (orders.has(image.order)) {
        throw new InvalidProductImagesError();
      }
      orders.add(image.order);
    }
  }

  getId(): ProductId {
    return this.id;
  }

  getOrganizationId(): string {
    return this.organizationId.value;
  }

  getBusinessUnitId(): string {
    return this.businessUnitId.value;
  }

  getCategoryId(): string {
    return this.categoryId.value;
  }

  getCode(): string {
    return this.code.value;
  }

  getCodeNormalized(): string {
    return this.code.normalized;
  }

  getTitle(): string {
    return this.title.value;
  }

  getTitleNormalized(): string {
    return this.title.normalized;
  }

  getShortDescription(): string {
    return this.shortDescription.value;
  }

  getDescription(): string {
    return this.description.value;
  }

  getImages(): ProductImage[] {
    return this.images;
  }

  getAttributes(): ProductAttributeValue[] {
    return this.attributes;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
