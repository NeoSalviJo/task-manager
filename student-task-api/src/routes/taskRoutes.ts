import { Router } from "express";
import * as TaskController from "../controllers/TaskController";

const router = Router();

router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);

// TODO: add the DELETE route here

export default router;
