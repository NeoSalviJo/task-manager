import * as TaskModel from "../models/TaskModel";
import { Task, TaskStatus, TaskPriority, CreateTaskDTO, UpdateTaskDTO } from "../types";

export function getAllTasks(status?: string, priority?: string, assignee?: string): Task[] {
  let tasks = TaskModel.getAllTasks();

  if (status) tasks = tasks.filter((t) => t.status === status);
  if (priority) tasks = tasks.filter((t) => t.priority === priority);
  if (assignee) tasks = tasks.filter((t) => t.assignee === assignee);

  return tasks;
}

export function getTaskById(id: string): Task | null {
  return TaskModel.getTaskById(id) ?? null;
}

export function createTask(dto: CreateTaskDTO): Task {
  return TaskModel.createTask(dto);
}

export function updateTask(id: string, dto: UpdateTaskDTO): Task | null {
  return TaskModel.updateTask(id, dto);
}

export function deleteTask(id: string): boolean {
  return TaskModel.deleteTask(id);
}