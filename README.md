# TaskFlow — Task Manager API

**Demo Video:** [https://youtu.be/NVpF-c2OOiI](https://youtu.be/NVpF-c2OOiI)

---

## Description

TaskFlow is a production-quality REST API for managing tasks, built entirely in TypeScript with Express. It follows a professional layered architecture (Routes → Controllers → Services → Models) with runtime validation via Zod, centralized error handling, and strict TypeScript throughout. The project demonstrates industrial software practices including clean separation of concerns, type-safe request validation, and consistent API response shapes.

---

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js
- **Framework:** Express
- **Validation:** Zod
- **Other:** UUID, dotenv, Morgan

---

## Project Structure

task-manager-api/
├── src/
│ ├── controllers/ # HTTP layer — reads req, sends res
│ │ └── TaskController.ts
│ ├── services/ # Business logic layer
│ │ └── TaskService.ts
│ ├── models/ # Data layer — in-memory storage
│ │ └── TaskModel.ts
│ ├── routes/ # Route definitions + validation middleware
│ │ └── taskRoutes.ts
│ ├── schemas/ # Zod validation schemas
│ │ └── taskSchemas.ts
│ ├── middleware/ # Reusable middleware
│ │ ├── validate.ts
│ │ └── errorHandler.ts
│ ├── types/ # Shared TypeScript types and enums
│ │ └── index.ts
│ ├── app.ts # Express app setup
│ └── index.ts # Server entry point
├── .env # Environment variables (not committed)
├── .gitignore
├── package.json
└── tsconfig.json


---

## Requirements

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

---

## How to Run

**1. Clone the repository:**
```bash
git clone https://github.com/NeoSalviJo/task-manager.git
cd task-manager/task-manager-api
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create a `.env` file** in the `task-manager-api` folder:
PORT=3000


**4. Start the development server:**
```bash
npm run dev
```

The server will start at `http://localhost:3000`

> Note: Data is stored in memory. All tasks reset to the 3 seed tasks every time the server restarts.

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `zod` | Runtime schema validation |
| `uuid` | Generating unique task IDs |
| `dotenv` | Loading environment variables |
| `morgan` | HTTP request logging |
| `typescript` | TypeScript compiler |
| `ts-node` / `tsx` | Running TypeScript directly |
| `@types/express` | TypeScript types for Express |
| `@types/morgan` | TypeScript types for Morgan |
| `@types/node` | TypeScript types for Node.js |

---

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/tasks` | Get all tasks (supports filters) |
| GET | `/api/tasks/:id` | Get a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Filtering

Filter tasks using query params on `GET /api/tasks`. All filters are optional and combinable:
GET /api/tasks?status=TODO
GET /api/tasks?priority=HIGH
GET /api/tasks?assignee=someone@email.com
GET /api/tasks?status=IN_PROGRESS&priority=HIGH


Invalid values return a `400` error with a descriptive message.

---

## Example Requests

### Create a Task — `POST /api/tasks`

```json
{
  "title": "Finish the project",
  "description": "Make sure everything works before submission",
  "priority": "HIGH",
  "assignee": "someone@email.com"
}
```

### Update a Task — `PATCH /api/tasks/:id`

```json
{
  "status": "DONE"
}
```

---

## Valid Values

**Status:** `TODO` · `IN_PROGRESS` · `DONE`

**Priority:** `LOW` · `MEDIUM` · `HIGH`

---

## Response Format

All responses follow a consistent shape:

**Success:**
```json
{
  "success": true,
  "data": { }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Task not found"
}
```

**Validation failure:**
```json
{
  "success": false,
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```
