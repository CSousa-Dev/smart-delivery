# Verticals (Attributes)

Base path: `/api/attributes/verticals`

## Create Vertical
`POST /attributes/verticals`

Request body:
```json
{
  "name": "Restaurantes",
  "code": "RESTAURANTS",
  "description": "Vertical de restaurantes"
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "vertical-id",
    "name": "Restaurantes",
    "code": "RESTAURANTS",
    "description": "Vertical de restaurantes",
    "isActive": true,
    "createdAt": "2026-02-08T12:00:00.000Z"
  }
}
```

Possible errors:
- `VERTICAL_NAME_ALREADY_EXISTS`
- `VERTICAL_CODE_ALREADY_EXISTS`
- `INVALID_VERTICAL_NAME`
- `INVALID_VERTICAL_CODE`
- `INVALID_VERTICAL_DESCRIPTION`

## Get Vertical
`GET /attributes/verticals/{verticalId}`

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "vertical-id",
    "name": "Restaurantes",
    "code": "RESTAURANTS",
    "description": "Vertical de restaurantes",
    "isActive": true,
    "createdAt": "2026-02-08T12:00:00.000Z",
    "updatedAt": "2026-02-08T12:30:00.000Z"
  }
}
```

Possible errors:
- `VERTICAL_NOT_FOUND`

## List Verticals
`GET /attributes/verticals`

Retorna verticais ativas e inativas.

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "vertical-id",
        "name": "Restaurantes",
        "code": "RESTAURANTS",
        "description": "Vertical de restaurantes",
        "isActive": true,
        "createdAt": "2026-02-08T12:00:00.000Z",
        "updatedAt": "2026-02-08T12:30:00.000Z"
      },
      {
        "id": "vertical-id-2",
        "name": "Mercado",
        "code": "MARKET",
        "description": "Vertical de mercado",
        "isActive": false,
        "createdAt": "2026-02-01T10:00:00.000Z",
        "updatedAt": "2026-02-05T11:00:00.000Z"
      }
    ]
  }
}
```

## Update Vertical
`PATCH /attributes/verticals/{verticalId}`

Request body:
```json
{
  "name": "Restaurantes Atualizado",
  "code": "RESTAURANTS",
  "description": "Vertical de restaurantes atualizada"
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "vertical-id",
    "name": "Restaurantes Atualizado",
    "code": "RESTAURANTS",
    "description": "Vertical de restaurantes atualizada",
    "isActive": true,
    "createdAt": "2026-02-08T12:00:00.000Z",
    "updatedAt": "2026-02-08T12:40:00.000Z"
  }
}
```

Possible errors:
- `VERTICAL_NOT_FOUND`
- `VERTICAL_NAME_ALREADY_EXISTS`
- `VERTICAL_CODE_ALREADY_EXISTS`
- `INVALID_VERTICAL_NAME`
- `INVALID_VERTICAL_CODE`
- `INVALID_VERTICAL_DESCRIPTION`

## Inactivate Vertical
`PATCH /attributes/verticals/{verticalId}/inactivate`

Response `204` (no content).

Possible errors:
- `VERTICAL_NOT_FOUND`
- `VERTICAL_ALREADY_INACTIVE`

## Activate Vertical
`PATCH /attributes/verticals/{verticalId}/activate`

Response `204` (no content).

Possible errors:
- `VERTICAL_NOT_FOUND`
- `VERTICAL_ALREADY_ACTIVE`
