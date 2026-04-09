import { v4 as uuidv4 } from "uuid";
import { Task, TaskStatus, TaskPriority, CreateTaskDTO, UpdateTaskDTO } from "../types";

let tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Set up project repo",
    description: "Initialize the GitHub repo and add all team members",
    status: TaskStatus.DONE,
    priority: TaskPriority.HIGH,
    assignee: "john@email.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Build login page",
    description: "Create the login and signup UI with form validation",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    assignee: "sarah@email.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Write README",
    description: "Document how to run the project and all the endpoints",
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    assignee: "mike@email.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(dto: CreateTaskDTO): Task {
  const newTask: Task = {
    id: uuidv4(),
    title: dto.title,
    description: dto.description,
    status: dto.status ?? TaskStatus.TODO,
    priority: dto.priority ?? TaskPriority.MEDIUM,
    assignee: dto.assignee,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id: string, dto: UpdateTaskDTO): Task | null {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...dto,
    updatedAt: new Date().toISOString(),
  };

  return tasks[index];
}

// Finished
export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
