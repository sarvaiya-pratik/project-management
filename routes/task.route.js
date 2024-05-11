import express from "express";
import { addTask, deleteTask, getAllTask, statusChange, updateTask } from "../controllers/tasks.controller.js";
import { userRole } from "../middleware/userRole.middleware.js";

const router = express.Router();

router.get('/', userRole("admin"), getAllTask)
router.post('/:projectId', userRole("admin"), addTask)
router.put('/:id', userRole("admin"), updateTask)
router.delete('/:id', userRole("admin"), deleteTask)
router.put('/status/:id', statusChange)


export default router;
