# Attributes (Definitions)

Base path: `/api/attributes`

## Create Attribute
`POST /attributes`

Request body:
```json
{
  "name": "Peso",
  "code": "WEIGHT",
  "description": "Peso do produto",
  "type": "number",
  "isMultiValue": false,
  "isRequired": true,
  "minValue": 0,
  "maxValue": 100
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "attr-id",
    "name": "Peso",
    "code": "WEIGHT",
    "description": "Peso do produto",
    "type": "number",
    "isMultiValue": false,
    "isRequired": true,
    "minValue": 0,
    "maxValue": 100,
    "defaultValueId": null,
    "createdAt": "2026-02-09T12:00:00.000Z"
  }
}
```

Possible errors:
- `ATTRIBUTE_NAME_ALREADY_EXISTS`
- `ATTRIBUTE_CODE_ALREADY_EXISTS`
- `INVALID_ATTRIBUTE_CODE`
- `INVALID_ATTRIBUTE_TYPE`
- `INVALID_ATTRIBUTE_LIMITS`
- `INVALID_DEFAULT_VALUE`
- `DEFAULT_VALUE_NOT_FOUND`
- `INVALID_ALLOWED_VALUE_NAME`
- `INVALID_ALLOWED_VALUE_VALUE`
- `ALLOWED_VALUE_OUT_OF_BOUNDS`
- `ALLOWED_VALUE_NAME_EXISTS`
- `ALLOWED_VALUE_VALUE_EXISTS`

## List Attributes
`GET /attributes/definitions`

Query params:
- `limit` (optional)
- `offset` (optional)

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "attr-id",
        "name": "Peso",
        "code": "WEIGHT",
        "description": "Peso do produto",
        "type": "number",
        "isMultiValue": false,
        "isRequired": true,
        "minValue": 0,
        "maxValue": 100,
        "defaultValueId": null,
        "createdAt": "2026-02-09T12:00:00.000Z",
        "updatedAt": null
      }
    ]
  }
}
```

## Get Attribute
`GET /attributes/definitions/{attributeId}`

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "attr-id",
    "name": "Peso",
    "code": "WEIGHT",
    "description": "Peso do produto",
    "type": "number",
    "isMultiValue": false,
    "isRequired": true,
    "minValue": 0,
    "maxValue": 100,
    "defaultValueId": null,
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": null
  }
}
```

Possible errors:
- `ATTRIBUTE_NOT_FOUND`

## Update Attribute
`PATCH /attributes/definitions/{attributeId}`

Request body:
```json
{
  "name": "Peso Atualizado",
  "code": "WEIGHT",
  "description": "Peso do produto atualizado",
  "type": "number",
  "isMultiValue": false,
  "isRequired": true,
  "minValue": 0,
  "maxValue": 200,
  "defaultValueId": null
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "attr-id",
    "name": "Peso Atualizado",
    "code": "WEIGHT",
    "description": "Peso do produto atualizado",
    "type": "number",
    "isMultiValue": false,
    "isRequired": true,
    "minValue": 0,
    "maxValue": 200,
    "defaultValueId": null,
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": "2026-02-09T12:30:00.000Z"
  }
}
```

Possible errors:
- `ATTRIBUTE_NOT_FOUND`
- `ATTRIBUTE_NAME_ALREADY_EXISTS`
- `ATTRIBUTE_CODE_ALREADY_EXISTS`
- `INVALID_ATTRIBUTE_CODE`
- `INVALID_ATTRIBUTE_TYPE`
- `INVALID_ATTRIBUTE_LIMITS`
- `INVALID_DEFAULT_VALUE`
- `DEFAULT_VALUE_NOT_FOUND`

## Delete Attribute
`DELETE /attributes/definitions/{attributeId}`

Response `204` (no content).

Possible errors:
- `ATTRIBUTE_NOT_FOUND`
- `ATTRIBUTE_IN_USE`
