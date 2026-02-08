import { AttributeDTO } from './attribute.dto';
import { PictureDTO } from './picture.dto';

export class ProductDTO {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly sku: string | null;
  public readonly parentId: string | null;
  public readonly childrenIds: string[] | null;
  public readonly attributes: AttributeDTO[];
  public readonly pictures: PictureDTO[];
  public readonly hierarchy: 'PARENT' | 'CHILD' | 'SIMPLE';
  public readonly addons: Addon[];
  public readonly compositions: Component[];

  constructor(
    id: string,
    title: string,
    description: string,
    attributes: AttributeDTO[],
    pictures: PictureDTO[],
    sku: string | null,
    parentId: string | null,
    childrenIds: string[] | null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.sku = sku;
    this.parentId = parentId;
    this.childrenIds = childrenIds;
    this.attributes = attributes;
    this.pictures = pictures;
    this.hierarchy = this.determineHierarchy(parentId, childrenIds);
  }

  private determineHierarchy(
    parentId: string | null,
    childrenIds: string[] | null
  ): 'PARENT' | 'CHILD' | 'SIMPLE' {
    if (parentId) {
      return 'CHILD';
    } else if (childrenIds && childrenIds.length > 0) {
      return 'PARENT';
    } else {
      return 'SIMPLE';
    }
  }
}
