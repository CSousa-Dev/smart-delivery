# Allowed Values (Global)

Base path: `/api/attributes/{attributeId}/allowed-values`

## Create Allowed Value
`POST /attributes/{attributeId}/allowed-values`

Request body:
```json
{
  "name": "Grande",
  "value": "Large",
  "description": "Tamanho grande"
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "value-id",
    "attributeId": "attribute-id",
    "name": "Grande",
    "value": "Large",
    "description": "Tamanho grande",
    "createdAt": "2026-02-09T12:00:00.000Z"
  }
}
```

Possible errors:
- `ATTRIBUTE_NOT_FOUND`
- `ATTRIBUTE_NOT_OPTION`
- `ALLOWED_VALUE_NAME_EXISTS`
- `ALLOWED_VALUE_VALUE_EXISTS`
- `INVALID_ALLOWED_VALUE_VALUE`
- `INVALID_ALLOWED_VALUE_NAME`
- `ALLOWED_VALUE_OUT_OF_BOUNDS`

## List Allowed Values
`GET /attributes/{attributeId}/allowed-values`

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "value-id",
        "attributeId": "attribute-id",
        "name": "Grande",
        "value": "Large",
        "description": "Tamanho grande"
      }
    ]
  }
}
```

## Get Allowed Value
`GET /attributes/{attributeId}/allowed-values/{allowedValueId}`

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "value-id",
    "attributeId": "attribute-id",
    "name": "Grande",
    "value": "Large",
    "description": "Tamanho grande",
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": null
  }
}
```

Possible errors:
- `ALLOWED_VALUE_NOT_FOUND`

## Update Allowed Value
`PATCH /attributes/{attributeId}/allowed-values/{allowedValueId}`

Request body:
```json
{
  "name": "Grande Atualizado",
  "value": "Large",
  "description": "Tamanho grande atualizado"
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "value-id",
    "attributeId": "attribute-id",
    "name": "Grande Atualizado",
    "value": "Large",
    "description": "Tamanho grande atualizado",
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": "2026-02-09T12:30:00.000Z"
  }
}
```

Possible errors:
- `ATTRIBUTE_NOT_FOUND`
- `ATTRIBUTE_NOT_OPTION`
- `ALLOWED_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_NAME_EXISTS`
- `ALLOWED_VALUE_VALUE_EXISTS`
- `INVALID_ALLOWED_VALUE_VALUE`
- `INVALID_ALLOWED_VALUE_NAME`
- `ALLOWED_VALUE_OUT_OF_BOUNDS`
- `ALLOWED_VALUE_IN_USE`

## Delete Allowed Value
`DELETE /attributes/{attributeId}/allowed-values/{allowedValueId}`

Response `204` (no content).

Possible errors:
- `ALLOWED_VALUE_NOT_FOUND`
- `ALLOWED_VALUE_IN_USE`
