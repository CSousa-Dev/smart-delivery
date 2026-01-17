import { ValidateAttributeValuesInput, ValidateAttributeValuesOutput } from '../dtos/validate-attribute-values.dto';
import { AttributeValueValidationService } from '../../domain/services/attribute-value-validation.service';
import { ResolveAttributeConfigurationService } from './resolve-attribute-configuration.service';
import { InvalidValidationPayloadError, VerticalRequiredForCategoriesError } from '../../domain/errors/validation.errors';

export class ValidateAttributeValuesService {
  constructor(
    private readonly resolveAttributeConfigurationService: ResolveAttributeConfigurationService,
    private readonly validationService: AttributeValueValidationService
  ) {}

  async execute(input: ValidateAttributeValuesInput): Promise<ValidateAttributeValuesOutput> {
    if (!input.items || input.items.length === 0) {
      throw new InvalidValidationPayloadError();
    }

    if (input.categoryIds && input.categoryIds.length > 0 && !input.verticalId) {
      throw new VerticalRequiredForCategoriesError();
    }

    const listInput: { verticalId?: string; categoryIds?: string[] } = {};
    if (input.verticalId) {
      listInput.verticalId = input.verticalId;
    }
    if (input.categoryIds && input.categoryIds.length > 0) {
      listInput.categoryIds = input.categoryIds;
    }

    const resolved = await this.resolveAttributeConfigurationService.list(listInput);

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

    const result = this.validationService.validate(input.items, resolvedMap as any);

    return {
      isValid: result.isValid,
      errors: result.errors,
    };
  }
}
