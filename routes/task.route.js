import express from "express";
import { addTask, deleteTask, getAllTask, statusChange, updateTask } from "../controllers/tasks.controller.js";
import { hasRole } from "../middleware/HasRole.js";

const router = express.Router();

router.get('/', hasRole("admin"), getAllTask)
router.post('/:projectId', hasRole("admin"), addTask)
router.put('/:id', hasRole("admin"), updateTask)
router.delete('/:id', hasRole("admin"), deleteTask)
router.put('/status/:id', statusChange)


export default router;
