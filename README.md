# Task Manager REST API

A production-style Task Manager REST API built with Node.js and Express.js for a developer assignment. It uses an in-memory array for storage and includes robust validation, consistent JSON responses, and centralized error handling.

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- In-memory data store
- UUID for ID generation

## Installation and Run

1. Open terminal in the project root:

```bash
cd task-manager-api
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Server runs on:

```text
http://localhost:3000
```

## Data Model

```json
{
  "id": "auto-generated unique string",
  "title": "string (required)",
  "description": "string (optional, default: '')",
  "status": "pending | done",
  "createdAt": "ISO timestamp string"
}
```

## API Endpoints with curl Examples

### 1. Create Task

- Endpoint: `POST /tasks`

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish assignment","description":"Implement all endpoints"}'
```

Sample request body:

```json
{
  "title": "Finish assignment",
  "description": "Implement all endpoints"
}
```

Sample success response (201):

```json
{
  "id": "d7d9db2e-0a87-4c31-9acd-74e4974af0a7",
  "title": "Finish assignment",
  "description": "Implement all endpoints",
  "status": "pending",
  "createdAt": "2026-04-13T12:30:12.000Z"
}
```

Sample error response (400):

```json
{
  "error": "Title is required"
}
```

### 2. Get All Tasks

- Endpoint: `GET /tasks`
- Bonus filters:
  - `GET /tasks?status=pending`
  - `GET /tasks?status=done`
  - `GET /tasks?sort=createdAt` (newest first)

```bash
curl http://localhost:3000/tasks
```

```bash
curl "http://localhost:3000/tasks?status=pending&sort=createdAt"
```

Sample success response (200):

```json
[
  {
    "id": "d7d9db2e-0a87-4c31-9acd-74e4974af0a7",
    "title": "Finish assignment",
    "description": "Implement all endpoints",
    "status": "pending",
    "createdAt": "2026-04-13T12:30:12.000Z"
  }
]
```

### 3. Get Task by ID

- Endpoint: `GET /tasks/:id`

```bash
curl http://localhost:3000/tasks/d7d9db2e-0a87-4c31-9acd-74e4974af0a7
```

Sample success response (200):

```json
{
  "id": "d7d9db2e-0a87-4c31-9acd-74e4974af0a7",
  "title": "Finish assignment",
  "description": "Implement all endpoints",
  "status": "pending",
  "createdAt": "2026-04-13T12:30:12.000Z"
}
```

Sample error response (404):

```json
{
  "error": "Task not found"
}
```

### 4. Update Task

- Endpoint: `PUT /tasks/:id`

```bash
curl -X PUT http://localhost:3000/tasks/d7d9db2e-0a87-4c31-9acd-74e4974af0a7 \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish assignment v2","description":"Updated details"}'
```

Sample request body:

```json
{
  "title": "Finish assignment v2",
  "description": "Updated details"
}
```

Sample success response (200):

```json
{
  "id": "d7d9db2e-0a87-4c31-9acd-74e4974af0a7",
  "title": "Finish assignment v2",
  "description": "Updated details",
  "status": "pending",
  "createdAt": "2026-04-13T12:30:12.000Z"
}
```

Sample error response (400):

```json
{
  "error": "Request body must include title or description"
}
```

### 5. Mark Task as Done

- Endpoint: `PATCH /tasks/:id/done`

```bash
curl -X PATCH http://localhost:3000/tasks/d7d9db2e-0a87-4c31-9acd-74e4974af0a7/done
```

Sample success response (200):

```json
{
  "id": "d7d9db2e-0a87-4c31-9acd-74e4974af0a7",
  "title": "Finish assignment v2",
  "description": "Updated details",
  "status": "done",
  "createdAt": "2026-04-13T12:30:12.000Z"
}
```

Sample error response (400):

```json
{
  "error": "Task is already completed"
}
```

### 6. Delete Task

- Endpoint: `DELETE /tasks/:id`

```bash
curl -X DELETE http://localhost:3000/tasks/d7d9db2e-0a87-4c31-9acd-74e4974af0a7
```

Sample success response (200):

```json
{
  "message": "Task deleted successfully"
}
```

Sample error response (404):

```json
{
  "error": "Task not found"
}
```

## Additional Notes

- All success and error responses are JSON.
- Invalid JSON payloads return `400` with a clear error.
- Unsupported HTTP methods on valid task routes return `405`.
