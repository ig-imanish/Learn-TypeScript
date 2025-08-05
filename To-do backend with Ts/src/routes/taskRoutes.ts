import { Router } from "express";
import { getAllTasks, getTaskById, createTask, markTaskAsDone } from "../controllers/taskController";

let router: Router = Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.get('/tasks/:id', getTaskById);
router.patch('/tasks/:id/done', markTaskAsDone);

export { router }