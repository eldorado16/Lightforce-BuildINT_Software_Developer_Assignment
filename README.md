# Task Manager REST API

## 1. Project Overview

A RESTful Task Manager API built with Node.js and Express.js. The API allows users to create, read, update, and delete tasks. All data is stored in-memory (no database required).

### Tech Stack

- Runtime: Node.js
- Framework: Express.js
- ID Generation: UUID v4
- Storage: In-memory array (no database)

## 2. How to Run the Project

### Prerequisites

- Node.js v16 or higher
- npm (comes with Node.js)

### Setup Steps

Step 1 - Clone the repository:

```bash
git clone https://github.com/eldorado16/Lightforce-BuildINT_Software_Developer_Assignment.git
cd Lightforce-BuildINT_Software_Developer_Assignment
```

Step 2 - Install dependencies:

```bash
npm install
```

Step 3 - Start the server:

```bash
npm start
```

Step 4 - Server will be running at:

```text
http://localhost:3000
```

## 3. API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Status Code | Description |
| --- | --- | --- | --- |
| POST | /tasks | 201 Created | Create a new task |
| GET | /tasks | 200 OK | Get all tasks |
| GET | /tasks/:id | 200 OK | Get a single task by ID |
| PUT | /tasks/:id | 200 OK | Update task title or description |
| PATCH | /tasks/:id/done | 200 OK | Mark a task as completed |
| DELETE | /tasks/:id | 200 OK | Delete a task |

## 4. Example Requests (curl)

### POST /tasks - Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

Response (201):

```json
{
  "id": "a3f9c1d2-4b5e-...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### GET /tasks - Get All Tasks

```bash
curl http://localhost:3000/tasks
```

Response (200): Array of all task objects

### GET /tasks/:id - Get One Task

```bash
curl http://localhost:3000/tasks/a3f9c1d2-4b5e-...
```

Response (200): Single task object | 404 if not found

### PUT /tasks/:id - Update a Task

```bash
curl -X PUT http://localhost:3000/tasks/a3f9c1d2-4b5e-... \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and fruits"}'
```

Response (200): Updated task object

### PATCH /tasks/:id/done - Mark as Done

```bash
curl -X PATCH http://localhost:3000/tasks/a3f9c1d2-4b5e-.../done
```

Response (200): Task with status set to `done`

### DELETE /tasks/:id - Delete a Task

```bash
curl -X DELETE http://localhost:3000/tasks/a3f9c1d2-4b5e-...
```

Response (200): `{ "message": "Task deleted successfully" }`

## 5. Error Handling

All error responses are returned as JSON in the following format:

```json
{ "error": "descriptive error message" }
```

| Status Code | When it occurs |
| --- | --- |
| 400 Bad Request | Missing required fields, empty title, or task already completed |
| 404 Not Found | Task ID does not exist in the system |
| 405 Method Not Allowed | Unsupported HTTP method used on a valid route |
| 500 Server Error | Unexpected internal server error |
