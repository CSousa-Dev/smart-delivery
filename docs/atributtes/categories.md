# Categories (Attributes)

Base path: `/api/attributes/categories`

Categorias podem ser reutilizadas com o mesmo nome em diferentes pais, mas cada categoria tem sempre um unico pai. A depth volta a representar a posicao fixa na arvore daquele nodo, e o limite maximo agora e 5.

## Create Category
`POST /attributes/categories`

Request body:
```json
{
  "verticalId": "vertical-id",
  "parentCategoryId": null,
  "name": "Bebidas",
  "code": "BEVERAGES",
  "description": "Categoria de bebidas"
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "category-id",
    "verticalId": "vertical-id",
    "parentCategoryId": null,
    "name": "Bebidas",
    "code": "BEVERAGES",
    "description": "Categoria de bebidas",
    "depth": 1,
    "isActive": true,
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": null
  }
}
```

Possible errors:
- `VERTICAL_NOT_FOUND`
- `PARENT_CATEGORY_NOT_FOUND`
- `CATEGORY_NAME_ALREADY_EXISTS`
- `CATEGORY_CODE_ALREADY_EXISTS`
- `INVALID_CATEGORY_CODE`
- `PARENT_CATEGORY_WRONG_VERTICAL`
- `CATEGORY_DEPTH_EXCEEDED`
- `CATEGORY_HIERARCHY_CYCLE`

## Get Category
`GET /attributes/categories/{categoryId}`

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "category-id",
    "verticalId": "vertical-id",
    "parentCategoryId": null,
    "name": "Bebidas",
    "code": "BEVERAGES",
    "description": "Categoria de bebidas",
    "depth": 1,
    "isActive": true,
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": "2026-02-09T12:10:00.000Z"
  }
}
```

Possible errors:
- `CATEGORY_NOT_FOUND`

## List Categories
`GET /attributes/categories`

Query params:
- `verticalId` (optional): filtra categorias por vertical.

Response `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "category-id",
        "verticalId": "vertical-id",
        "parentCategoryId": null,
        "name": "Bebidas",
        "code": "BEVERAGES",
        "description": "Categoria de bebidas",
        "depth": 1,
        "isActive": true,
        "createdAt": "2026-02-09T12:00:00.000Z",
        "updatedAt": "2026-02-09T12:10:00.000Z"
      }
    ]
  }
}
```

## Update Category
`PATCH /attributes/categories/{categoryId}`

Request body:
```json
{
  "name": "Bebidas Atualizado",
  "code": "BEVERAGES",
  "description": "Categoria de bebidas atualizada",
  "parentCategoryId": null
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": "category-id",
    "verticalId": "vertical-id",
    "parentCategoryId": null,
    "name": "Bebidas Atualizado",
    "code": "BEVERAGES",
    "description": "Categoria de bebidas atualizada",
    "depth": 1,
    "isActive": true,
    "createdAt": "2026-02-09T12:00:00.000Z",
    "updatedAt": "2026-02-09T12:20:00.000Z"
  }
}
```

Possible errors:
- `CATEGORY_NOT_FOUND`
- `PARENT_CATEGORY_NOT_FOUND`
- `CATEGORY_NAME_ALREADY_EXISTS`
- `CATEGORY_CODE_ALREADY_EXISTS`
- `INVALID_CATEGORY_CODE`
- `PARENT_CATEGORY_WRONG_VERTICAL`
- `CATEGORY_DEPTH_EXCEEDED`
- `CATEGORY_HIERARCHY_CYCLE`

## Inactivate Category
`PATCH /attributes/categories/{categoryId}/inactivate`

Response `204` (no content).

Possible errors:
- `CATEGORY_NOT_FOUND`
- `CATEGORY_ALREADY_INACTIVE`

## Activate Category
`PATCH /attributes/categories/{categoryId}/activate`

Response `204` (no content).

Possible errors:
- `CATEGORY_NOT_FOUND`
- `CATEGORY_ALREADY_ACTIVE`
