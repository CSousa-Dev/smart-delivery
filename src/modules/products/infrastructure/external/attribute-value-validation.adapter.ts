import { AttributeValueValidationPort } from '../../domain/ports/attribute-value-validation.port';
import { ResolveAttributeConfigurationService } from '../../../attributes/application/services/resolve-attribute-configuration.service';
import { AttributeValueValidationService } from '../../../attributes/domain/services/attribute-value-validation.service';
import { ResolvedAttributeOutput } from '../../../attributes/application/dtos/resolve-attribute-configuration.dto';
import { AttributeValueValidationItem } from '../../../attributes/domain/entities/attribute-value-validation.entity';

export class AttributeValueValidationAdapter implements AttributeValueValidationPort {
  constructor(
    private readonly resolveAttributeConfigurationService: ResolveAttributeConfigurationService,
    private readonly validationService: AttributeValueValidationService
  ) {}

  async validate(input: {
    categoryId: string;
    verticalId: string;
    attributes: Array<{ attributeId: string; value: string }>;
  }): Promise<{
    isValid: boolean;
    errors: Array<{
      attributeId: string;
      reason: string;
      value?: string | number | boolean | null;
    }>;
  }> {
    const resolved = await this.resolveAttributeConfigurationService.list({
      verticalId: input.verticalId,
      categoryIds: [input.categoryId],
    });

    const resolvedMap = new Map(
      resolved.items.map((item) => [
        item.attributeId,
        {
          attributeId: item.attributeId,
          name: item.name,
          code: item.code,
          description: item.description,
          type: item.type,
          isMultiValue: item.isMultiValue,
          isRequired: item.isRequired,
          minValue: item.minValue,
          maxValue: item.maxValue,
          defaultValueId: item.defaultValueId,
          allowedValues: item.allowedValues,
        },
      ])
    );

    const items = this.buildValidationItems(resolved.items, input.attributes);
    if (items.length === 0) {
      return { isValid: true, errors: [] };
    }

    const result = this.validationService.validate(items, resolvedMap as any);

    return {
      isValid: result.isValid,
      errors: result.errors,
    };
  }

  private buildValidationItems(
    resolved: ResolvedAttributeOutput[],
    attributes: Array<{ attributeId: string; value: string }>
  ): AttributeValueValidationItem[] {
    const inputByAttribute = new Map(
      attributes.map((attribute) => [attribute.attributeId, attribute.value])
    );
    const items: AttributeValueValidationItem[] = [];

    for (const attribute of resolved) {
      const inputValue = inputByAttribute.get(attribute.attributeId);
      if (inputValue !== undefined) {
        items.push(this.toValidationItem(attribute, inputValue));
        continue;
      }

      if (attribute.isRequired) {
        items.push(this.toMissingRequiredItem(attribute));
      }
    }

    return items;
  }

  private toValidationItem(
    attribute: ResolvedAttributeOutput,
    value: string
  ): AttributeValueValidationItem {
    if (attribute.isMultiValue) {
      if (attribute.type === 'option') {
        return { attributeId: attribute.attributeId, allowedValueIds: [value] };
      }
      return { attributeId: attribute.attributeId, values: [value] };
    }

    if (attribute.type === 'option') {
      return { attributeId: attribute.attributeId, allowedValueId: value };
    }

    return { attributeId: attribute.attributeId, value };
  }

  private toMissingRequiredItem(
    attribute: ResolvedAttributeOutput
  ): AttributeValueValidationItem {
    if (attribute.isMultiValue) {
      if (attribute.type === 'option') {
        return { attributeId: attribute.attributeId, allowedValueIds: [] };
      }
      return { attributeId: attribute.attributeId, values: [] };
    }

    if (attribute.type === 'option') {
      return { attributeId: attribute.attributeId, allowedValueId: null };
    }

    return { attributeId: attribute.attributeId, value: null };
  }
}
