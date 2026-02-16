# Resolved Attributes (Context)

Base path: `/api/attributes`

## List Resolved Attributes
`GET /attributes`

Query params:
- `verticalId` (optional)
- `categoryIds` (optional, comma-separated)
- `limit` (optional)
- `offset` (optional)

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "attributeId": "attr-id",
        "name": "Peso",
        "code": "WEIGHT",
        "description": "Peso do produto",
        "type": "number",
        "isMultiValue": false,
        "isRequired": true,
        "minValue": 0,
        "maxValue": 100,
        "defaultValueId": null,
        "allowedValues": []
      }
    ]
  }
}
```

Possible errors:
- `VERTICAL_NOT_FOUND`
- `INVALID_CATEGORY_CHAIN`
- `NO_ATTRIBUTES_FOR_CONTEXT`

## Get Resolved Attribute
`GET /attributes/{attributeId}`

Query params:
- `verticalId` (optional)
- `categoryIds` (optional, comma-separated)
- `includeCategoryOverrides` (optional, boolean)

### Default response (global or resolved by context)
Response `200`:
```json
{
  "success": true,
  "data": {
    "item": {
      "attributeId": "attr-id",
      "name": "Peso",
      "code": "WEIGHT",
      "description": "Peso do produto",
      "type": "number",
      "isMultiValue": false,
      "isRequired": true,
      "minValue": 0,
      "maxValue": 100,
      "defaultValueId": null,
      "allowedValues": []
    }
  }
}
```

### Response with category overrides
If `includeCategoryOverrides=true` and `verticalId` is provided **without** `categoryIds`, the response includes
the resolved attribute for the vertical plus a breakdown per category (including overrides and allowed value scopes).

Response `200`:
```json
{
  "success": true,
  "data": {
    "item": {
      "attributeId": "attr-id",
      "name": "Peso",
      "code": "WEIGHT",
      "description": "Peso do produto",
      "type": "number",
      "isMultiValue": false,
      "isRequired": true,
      "minValue": 0,
      "maxValue": 100,
      "defaultValueId": null,
      "allowedValues": []
    },
    "categories": [
      {
        "categoryId": "category-id",
        "categoryChain": ["root-id", "category-id"],
        "resolved": {
          "attributeId": "attr-id",
          "name": "Peso",
          "code": "WEIGHT",
          "description": "Peso do produto",
          "type": "number",
          "isMultiValue": false,
          "isRequired": true,
          "minValue": 0,
          "maxValue": 100,
          "defaultValueId": null,
          "allowedValues": []
        },
        "allowedValues": [
          {
            "id": "value-id",
            "name": "Grande",
            "value": "Large",
            "description": "Tamanho grande",
            "scope": "ATTRIBUTE"
          }
        ],
        "overrides": {
          "vertical": {
            "isRequired": true,
            "isMultiValue": null,
            "minValue": null,
            "maxValue": null,
            "defaultValueId": null,
            "defaultValueScope": null
          },
          "categories": [
            {
              "categoryId": "category-id",
              "override": {
                "isRequired": null,
                "isMultiValue": null,
                "minValue": 0,
                "maxValue": 10,
                "defaultValueId": null,
                "defaultValueScope": null
              }
            }
          ]
        }
      }
    ]
  }
}
```

Possible errors:
- `VERTICAL_NOT_FOUND`
- `INVALID_CATEGORY_CHAIN`
- `ATTRIBUTE_NOT_FOUND`
- `ATTRIBUTE_NOT_IN_VERTICAL`
- `NO_ATTRIBUTES_FOR_CONTEXT`
