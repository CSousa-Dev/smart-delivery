import { ResolvedAttribute, ResolvedAllowedValue } from '../entities/resolved-attribute.entity';

export type ResolutionAllowedValue = ResolvedAllowedValue & { scope: 'ATTRIBUTE' | 'VERTICAL' | 'CATEGORY' };

export interface ResolutionAttributeData {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  isRequired: boolean;
  isMultiValue: boolean;
  minValue: number;
  maxValue: number;
  defaultValueId: string | null;
}

export interface ResolutionOverrideData {
  isRequired: boolean | null;
  isMultiValue: boolean | null;
  minValue: number | null;
  maxValue: number | null;
  defaultValueId: string | null;
  defaultValueScope: string | null;
}

export class AttributeResolutionService {
  resolve(
    attribute: ResolutionAttributeData,
    verticalOverride: ResolutionOverrideData | null,
    categoryOverrides: ResolutionOverrideData[],
    allowedValues: ResolutionAllowedValue[]
  ): ResolvedAttribute {
    const effective = this.resolveOverrides(attribute, verticalOverride, categoryOverrides);
    const resolvedAllowedValues =
      attribute.type === 'option' ? allowedValues.map(({ scope: _scope, ...value }) => value) : [];

    const defaultValueId =
      attribute.type === 'option' && effective.isRequired && !effective.isMultiValue
        ? this.resolveDefaultValueId(effective.defaultValueId, resolvedAllowedValues)
        : null;

    return new ResolvedAttribute(
      attribute.id,
      attribute.name,
      attribute.code,
      attribute.description,
      attribute.type,
      effective.isMultiValue,
      effective.isRequired,
      effective.minValue,
      effective.maxValue,
      defaultValueId,
      resolvedAllowedValues
    );
  }

  private resolveOverrides(
    attribute: ResolutionAttributeData,
    verticalOverride: ResolutionOverrideData | null,
    categoryOverrides: ResolutionOverrideData[]
  ) {
    const chain = [...categoryOverrides, verticalOverride].filter(
      (override): override is ResolutionOverrideData => Boolean(override)
    );

    const firstDefined = <T>(selector: (item: ResolutionOverrideData) => T | null, fallback: T): T => {
      for (const item of chain) {
        const value = selector(item);
        if (value !== null && value !== undefined) {
          return value;
        }
      }
      return fallback;
    };

    const minValue = firstDefined((item) => item.minValue, attribute.minValue);
    const maxValue = firstDefined((item) => item.maxValue, attribute.maxValue);

    const effectiveMinMax =
      minValue === null && maxValue === null ? this.defaultLimits(attribute.type) : { minValue, maxValue };

    return {
      isRequired: firstDefined((item) => item.isRequired, attribute.isRequired),
      isMultiValue: firstDefined((item) => item.isMultiValue, attribute.isMultiValue),
      minValue: effectiveMinMax.minValue,
      maxValue: effectiveMinMax.maxValue,
      defaultValueId: firstDefined((item) => item.defaultValueId, attribute.defaultValueId),
    };
  }

  private resolveDefaultValueId(
    defaultValueId: string | null,
    allowedValues: ResolvedAllowedValue[]
  ): string | null {
    if (!defaultValueId) {
      return null;
    }

    const exists = allowedValues.some((value) => value.id === defaultValueId);
    return exists ? defaultValueId : null;
  }

  private defaultLimits(type: string): { minValue: number | null; maxValue: number | null } {
    switch (type) {
      case 'text':
        return { minValue: 1, maxValue: 255 };
      case 'number':
      case 'decimal':
        return { minValue: -1000000, maxValue: 1000000 };
      case 'option':
        return { minValue: 1, maxValue: 100 };
      default:
        return { minValue: null, maxValue: null };
    }
  }
}
