import { VerticalAttribute } from '../entities/vertical-attribute.entity';

export interface VerticalAttributeRepository {
  save(verticalAttribute: VerticalAttribute): Promise<void>;
  update(verticalAttribute: VerticalAttribute): Promise<void>;
  delete(verticalId: string, attributeId: string): Promise<void>;
  existsByVerticalAndAttribute(verticalId: string, attributeId: string): Promise<boolean>;
  existsByAttributeId(attributeId: string): Promise<boolean>;
  saveSubsetLinks(verticalAttributeId: string, allowedValueIds: string[]): Promise<void>;
  deleteSubsetLinks(verticalAttributeId: string): Promise<void>;
  findByVerticalAndAttribute(
    verticalId: string,
    attributeId: string
  ): Promise<{
    id: string;
    isRequired: boolean | null;
    isMultiValue: boolean | null;
    minValue: number | null;
    maxValue: number | null;
    defaultValueId: string | null;
    defaultValueScope: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  } | null>;
  listSubsetLinks(verticalAttributeId: string): Promise<string[]>;
  listByVertical(verticalId: string): Promise<
    Array<{
      id: string;
      attributeId: string;
      isRequired: boolean | null;
      isMultiValue: boolean | null;
      minValue: number | null;
      maxValue: number | null;
      defaultValueId: string | null;
      defaultValueScope: string | null;
    }>
  >;
}
