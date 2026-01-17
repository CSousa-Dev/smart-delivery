import {
  AttributeValueValidationError,
  AttributeValueValidationItem,
  AttributeValueValidationResult,
} from '../entities/attribute-value-validation.entity';
import { ResolvedAttribute } from '../entities/resolved-attribute.entity';

export class AttributeValueValidationService {
  validate(
    items: AttributeValueValidationItem[],
    resolvedAttributes: Map<string, ResolvedAttribute>
  ): AttributeValueValidationResult {
    const errors: AttributeValueValidationError[] = [];

    for (const item of items) {
      const resolved = resolvedAttributes.get(item.attributeId);
      if (!resolved) {
        errors.push({
          attributeId: item.attributeId,
          reason: 'ATTRIBUTE_NOT_FOUND',
        });
        continue;
      }

      const itemErrors = this.validateItem(item, resolved);
      errors.push(...itemErrors);
    }

    return AttributeValueValidationResult.build(errors);
  }

  private validateItem(
    item: AttributeValueValidationItem,
    attribute: ResolvedAttribute
  ): AttributeValueValidationError[] {
    const errors: AttributeValueValidationError[] = [];

    if (attribute.isMultiValue) {
      if (attribute.type === 'option') {
        const ids = item.allowedValueIds ?? [];
        if (attribute.isRequired && ids.length === 0) {
          errors.push({
            attributeId: item.attributeId,
            reason: 'REQUIRED_VALUE_MISSING',
          });
          return errors;
        }

        const allowedIds = new Set(attribute.allowedValues.map((value) => value.id));
        for (const id of ids) {
          if (!allowedIds.has(id)) {
            errors.push({
              attributeId: item.attributeId,
              reason: 'INVALID_ALLOWED_VALUE',
              value: id,
            });
          }
        }
        return errors;
      }

      const values = item.values ?? [];
      if (attribute.isRequired && values.length === 0) {
        errors.push({
          attributeId: item.attributeId,
          reason: 'REQUIRED_VALUE_MISSING',
        });
        return errors;
      }

      for (const value of values) {
        errors.push(...this.validateScalarValue(attribute, value));
      }

      return errors;
    }

    if (attribute.type === 'option') {
      const id = item.allowedValueId ?? null;
      if (attribute.isRequired && !id) {
        errors.push({
          attributeId: item.attributeId,
          reason: 'REQUIRED_VALUE_MISSING',
        });
        return errors;
      }

      if (id) {
        const allowedIds = new Set(attribute.allowedValues.map((value) => value.id));
        if (!allowedIds.has(id)) {
          errors.push({
            attributeId: item.attributeId,
            reason: 'INVALID_ALLOWED_VALUE',
            value: id,
          });
        }
      }

      return errors;
    }

    const value = item.value ?? null;
    if (attribute.isRequired && (value === null || value === undefined || value === '')) {
      errors.push({
        attributeId: item.attributeId,
        reason: 'REQUIRED_VALUE_MISSING',
      });
      return errors;
    }

    if (value !== null && value !== undefined && value !== '') {
      errors.push(...this.validateScalarValue(attribute, value));
    }

    return errors;
  }

  private validateScalarValue(
    attribute: ResolvedAttribute,
    rawValue: string | number | boolean
  ): AttributeValueValidationError[] {
    const errors: AttributeValueValidationError[] = [];
    const valueAsString = String(rawValue);

    switch (attribute.type) {
      case 'text': {
        const length = valueAsString.length;
        if (
          (attribute.minValue !== null && length < attribute.minValue) ||
          (attribute.maxValue !== null && length > attribute.maxValue)
        ) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'VALUE_OUT_OF_BOUNDS',
            value: rawValue,
          });
        }
        break;
      }
      case 'number': {
        const numberValue = typeof rawValue === 'number' ? rawValue : Number(valueAsString);
        if (!Number.isInteger(numberValue)) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'INVALID_NUMBER',
            value: rawValue,
          });
          break;
        }
        if (
          (attribute.minValue !== null && numberValue < attribute.minValue) ||
          (attribute.maxValue !== null && numberValue > attribute.maxValue)
        ) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'VALUE_OUT_OF_BOUNDS',
            value: rawValue,
          });
        }
        break;
      }
      case 'decimal': {
        const numberValue = Number(valueAsString);
        if (Number.isNaN(numberValue)) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'INVALID_DECIMAL',
            value: rawValue,
          });
          break;
        }
        if (
          (attribute.minValue !== null && numberValue < attribute.minValue) ||
          (attribute.maxValue !== null && numberValue > attribute.maxValue)
        ) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'VALUE_OUT_OF_BOUNDS',
            value: rawValue,
          });
        }
        break;
      }
      case 'date': {
        const isoDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!isoDate.test(valueAsString)) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'INVALID_DATE',
            value: rawValue,
          });
        }
        break;
      }
      case 'url': {
        try {
          const parsed = new URL(valueAsString);
          if (!parsed.protocol || !parsed.host) {
            throw new Error('Invalid');
          }
        } catch {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'INVALID_URL',
            value: rawValue,
          });
        }
        break;
      }
      case 'boolean': {
        if (
          !(
            rawValue === true ||
            rawValue === false ||
            valueAsString === 'true' ||
            valueAsString === 'false'
          )
        ) {
          errors.push({
            attributeId: attribute.attributeId,
            reason: 'INVALID_BOOLEAN',
            value: rawValue,
          });
        }
        break;
      }
      default:
        break;
    }

    return errors;
  }
}
