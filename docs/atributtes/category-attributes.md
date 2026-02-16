# Category Attributes

Base path: `/api/attributes/categories/{categoryId}/attributes`

## List Category Attributes
`GET /attributes/categories/{categoryId}/attributes`

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "link-id",
        "categoryId": "category-id",
        "verticalId": "vertical-id",
        "categoryChain": ["root-id", "category-id"],
        "attributeId": "attribute-id",
        "attribute": {
          "name": "Peso",
          "code": "WEIGHT",
          "description": "Peso do produto",
          "type": "number",
          "isRequired": true,
          "isMultiValue": false,
          "minValue": 0,
          "maxValue": 100,
          "defaultValueId": null
        },
        "hasOverride": true,
        "override": {
          "isRequired": null,
          "isMultiValue": null,
          "minValue": 0,
          "maxValue": 10,
          "defaultValueId": null,
          "defaultValueScope": null,
          "allowedValueRefs": [
            { "sourceScope": "ATTRIBUTE", "sourceValueId": "value-id" }
          ],
          "additionalAllowedValues": []
        },
        "createdAt": "2026-02-09T12:00:00.000Z",
        "updatedAt": null
      }
    ]
  }
}
```

Possible errors:
- `CATEGORY_NOT_FOUND`

## Link Attribute to Category
`POST /attributes/categories/{categoryId}/attributes`

Request body:
```json
{
  "attributeId": "attribute-id",
  "isRequired": true,
  "isMultiValue": false,
  "minValue": 1,
  "maxValue": 10,
  "defaultValueId": null,
  "allowedValueRefs": [
    { "sourceScope": "ATTRIBUTE", "sourceValueId": "value-id" }
  ],
  "additionalAllowedValues": [
    { "name": "Pequeno", "value": "Small", "description": "Tamanho pequeno" }
  ]
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "link-id",
    "categoryId": "category-id",
    "attributeId": "attribute-id",
    "isRequired": true,
    "isMultiValue": false,
    "minValue": 1,
    "maxValue": 10,
    "defaultValueId": null,
    "defaultValueScope": null,
    "createdAt": "2026-02-09T12:00:00.000Z"
  }
}
```

Possible errors:
- `CATEGORY_NOT_FOUND`
- `ATTRIBUTE_NOT_FOUND`
- `CATEGORY_ATTRIBUTE_EXISTS`
- `ATTRIBUTE_NOT_IN_VERTICAL`
- `INVALID_ATTRIBUTE_LIMITS`
- `ATTRIBUTE_NOT_OPTION`
- `INVALID_DEFAULT_VALUE`
- `DEFAULT_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_CONFLICT`

## Update Category Attribute
`PATCH /attributes/categories/{categoryId}/attributes/{attributeId}`

Request body (mesmo formato do create):
```json
{
  "isRequired": true,
  "isMultiValue": false,
  "minValue": 1,
  "maxValue": 10,
  "defaultValueId": null,
  "allowedValueRefs": [
    { "sourceScope": "ATTRIBUTE", "sourceValueId": "value-id" }
  ],
  "additionalAllowedValues": [
    { "name": "Pequeno", "value": "Small", "description": "Tamanho pequeno" }
  ]
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "link-id",
    "categoryId": "category-id",
    "attributeId": "attribute-id",
    "isRequired": true,
    "isMultiValue": false,
    "minValue": 1,
    "maxValue": 10,
    "defaultValueId": null,
    "defaultValueScope": null,
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": "2026-02-09T12:30:00.000Z"
  }
}
```

Possible errors:
- `CATEGORY_NOT_FOUND`
- `ATTRIBUTE_NOT_FOUND`
- `CATEGORY_ATTRIBUTE_NOT_FOUND`
- `ATTRIBUTE_NOT_IN_VERTICAL`
- `INVALID_ATTRIBUTE_LIMITS`
- `ATTRIBUTE_NOT_OPTION`
- `INVALID_DEFAULT_VALUE`
- `DEFAULT_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_CONFLICT`

## Unlink Attribute from Category
`DELETE /attributes/categories/{categoryId}/attributes/{attributeId}`

Response `204` (no content).

Possible errors:
- `CATEGORY_ATTRIBUTE_NOT_FOUND`
