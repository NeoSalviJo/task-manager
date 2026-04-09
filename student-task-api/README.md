# Task Manager API

A REST API built with TypeScript and Express for managing tasks.

## How to run

```
npm install
npm run dev
```

Server starts at http://localhost:3000

## Endpoints

| Method | Route | What it does |
|--------|-------|-------------|
| GET | /api/tasks | get all tasks |
| GET | /api/tasks/:id | get one task |
| POST | /api/tasks | create a task |
| PATCH | /api/tasks/:id | update a task |
| DELETE | /api/tasks/:id | delete a task (not done yet) |

## Filtering

You can filter tasks by status or priority using query params:

```
GET /api/tasks?status=TODO
GET /api/tasks?priority=HIGH
```

## Example POST body

```json
{
  "title": "Finish the project",
  "description": "Make sure everything works before submission",
  "priority": "HIGH",
  "assignee": "someone@email.com"
}
```

## Status options
- TODO
- IN_PROGRESS
- DONE

## Priority options
- LOW
- MEDIUM
- HIGH

## What still needs to be done

- finish the delete task function in TaskModel.ts
- hook up the delete route in taskRoutes.ts
- finish the deleteTask controller in TaskController.ts
- maybe add more filtering options
