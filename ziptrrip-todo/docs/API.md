# API Documentation

Base URL:

`http://localhost:4000/api`

## Health

### GET `/health`

Response:

```json
{
  "status": "ok"
}
```

## List todos

### GET `/todos`

Optional query parameters:

- `completed=true|false`
- `search=<text>`

Example:

`GET /api/todos?completed=false&search=learn`

## Get todo

### GET `/todos/:id`

Example:

`GET /api/todos/1`

Returns 404 if the todo does not exist.

## Create todo

### POST `/todos`

Request:

```json
{
  "title": "Learn TypeScript",
  "description": "Complete TypeScript generics practice",
  "priority": "high",
  "dueDate": "2026-09-10"
}
```

`title` is required.

## Update todo

### PUT `/todos/:id`

Request fields are optional:

```json
{
  "title": "Learn TypeScript deeply",
  "completed": true,
  "priority": "medium"
}
```

## Toggle todo

### PATCH `/todos/:id/toggle`

No request body is required.

## Delete todo

### DELETE `/todos/:id`

Returns HTTP 204 on success.
