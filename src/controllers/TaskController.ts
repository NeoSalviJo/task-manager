import { Request, Response, NextFunction } from "express";
import * as TaskService from "../services/TaskService";
import { CreateTaskDTO, UpdateTaskDTO } from "../types";

const queryStr = (val: unknown): string | undefined => {
  if (typeof val === "string") return val || undefined;
  if (Array.isArray(val) && typeof val[0] === "string") return (val[0] as string) || undefined;
  return undefined;
};

export function getAllTasks(req: Request, res: Response, next: NextFunction): void {
  try {
    const status = queryStr(req.query.status);
    const priority = queryStr(req.query.priority);
    const assignee = queryStr(req.query.assignee);

    const tasks = TaskService.getAllTasks(status, priority, assignee);
    res.status(200).json({ success: true, data: tasks, total: tasks.length });
  } catch (err) {
    next(err);
  }
}

export function getTaskById(req: Request, res: Response, next: NextFunction): void {
  try {
    const task = TaskService.getTaskById(String(req.params.id));

    if (!task) {
      res.status(404).json({ success: false, error: "Task not found" });
      return;
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

export function createTask(req: Request, res: Response, next: NextFunction): void {
  try {
    const task = TaskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

export function updateTask(req: Request, res: Response, next: NextFunction): void {
  try {
    const body: UpdateTaskDTO = req.body;
    const updated = TaskService.updateTask(String(req.params.id), body);

    if (!updated) {
      res.status(404).json({ success: false, error: "Task not found" });
      return;
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export function deleteTask(req: Request, res: Response, next: NextFunction): void {
  try {
    const deleted = TaskService.deleteTask(String(req.params.id));

    if (!deleted) {
      res.status(404).json({ success: false, error: "Task not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
}