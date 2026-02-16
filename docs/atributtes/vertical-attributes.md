# Vertical Attributes

Base path: `/api/attributes/verticals/{verticalId}/attributes`

## List Vertical Attributes
`GET /attributes/verticals/{verticalId}/attributes`

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "link-id",
        "verticalId": "vertical-id",
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
          "isRequired": true,
          "isMultiValue": null,
          "minValue": null,
          "maxValue": null,
          "defaultValueId": null,
          "defaultValueScope": null,
          "allowedValueIds": [],
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
- `VERTICAL_NOT_FOUND`

## Link Attribute to Vertical
`POST /attributes/verticals/{verticalId}/attributes`

Request body:
```json
{
  "attributeId": "attribute-id",
  "isRequired": true,
  "isMultiValue": false,
  "minValue": 1,
  "maxValue": 10,
  "defaultValueId": null,
  "allowedValueIds": [],
  "additionalAllowedValues": [
    { "name": "Grande", "value": "Large", "description": "Tamanho grande" }
  ]
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "link-id",
    "verticalId": "vertical-id",
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
- `VERTICAL_NOT_FOUND`
- `ATTRIBUTE_NOT_FOUND`
- `VERTICAL_ATTRIBUTE_EXISTS`
- `INVALID_ATTRIBUTE_LIMITS`
- `ATTRIBUTE_NOT_OPTION`
- `INVALID_DEFAULT_VALUE`
- `DEFAULT_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_CONFLICT`

## Update Vertical Attribute
`PATCH /attributes/verticals/{verticalId}/attributes/{attributeId}`

Request body (mesmo formato do create):
```json
{
  "isRequired": true,
  "isMultiValue": false,
  "minValue": 1,
  "maxValue": 10,
  "defaultValueId": null,
  "allowedValueIds": [],
  "additionalAllowedValues": [
    { "name": "Grande", "value": "Large", "description": "Tamanho grande" }
  ]
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "link-id",
    "verticalId": "vertical-id",
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
- `VERTICAL_NOT_FOUND`
- `ATTRIBUTE_NOT_FOUND`
- `VERTICAL_ATTRIBUTE_NOT_FOUND`
- `INVALID_ATTRIBUTE_LIMITS`
- `ATTRIBUTE_NOT_OPTION`
- `INVALID_DEFAULT_VALUE`
- `DEFAULT_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_CONFLICT`

## Unlink Attribute from Vertical
`DELETE /attributes/verticals/{verticalId}/attributes/{attributeId}`

Response `204` (no content).

Possible errors:
- `VERTICAL_ATTRIBUTE_NOT_FOUND`
