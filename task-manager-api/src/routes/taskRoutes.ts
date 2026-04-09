import { Router } from "express";
import * as TaskController from "../controllers/TaskController";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema, taskFilterSchema } from "../schemas/taskSchemas";

const router = Router();

router.get("/", validate(taskFilterSchema, "query"), TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", validate(createTaskSchema), TaskController.createTask);
router.patch("/:id", validate(updateTaskSchema), TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;