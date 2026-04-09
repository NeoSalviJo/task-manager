import { Request, Response } from "express";
import * as TaskModel from "../models/TaskModel";
import { CreateTaskDTO, UpdateTaskDTO } from "../types";

const queryStr = (val: unknown): string | undefined => {
  if (typeof val === "string") return val || undefined;
  if (Array.isArray(val) && typeof val[0] === "string") return (val[0] as string) || undefined;
  return undefined;
};

export function getAllTasks(req: Request, res: Response): void {
  let tasks = TaskModel.getAllTasks();

  const status = queryStr(req.query.status);
  const priority = queryStr(req.query.priority);

  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }

  if (priority) {
    tasks = tasks.filter((t) => t.priority === priority);
  }

  res.status(200).json({ success: true, data: tasks, total: tasks.length });
}

export function getTaskById(req: Request, res: Response): void {
  const task = TaskModel.getTaskById(String(req.params.id));

  if (!task) {
    res.status(404).json({ success: false, error: "Task not found" });
    return;
  }

  res.status(200).json({ success: true, data: task });
}

export function createTask(req: Request, res: Response): void {
  const body: CreateTaskDTO = req.body;

  if (!body.title || !body.description) {
    res.status(400).json({ success: false, error: "Title and description are required" });
    return;
  }

  const task = TaskModel.createTask(body);
  res.status(201).json({ success: true, data: task });
}

export function updateTask(req: Request, res: Response): void {
  const body: UpdateTaskDTO = req.body;
  const updated = TaskModel.updateTask(String(req.params.id), body);

  if (!updated) {
    res.status(404).json({ success: false, error: "Task not found" });
    return;
  }

  res.status(200).json({ success: true, data: updated });
}

export function deleteTask(req: Request, res: Response): void {
  // TODO: call TaskModel.deleteTask and return the right response
}
