import express from "express";
import { addProject, deleteProject, getAllProject, updateProject, } from "../controllers/project.controller.js";
import { userRole } from "../middleware/userRole.middleware.js";

const router = express.Router();

router.get('/', getAllProject);
router.post('/add', userRole("admin"), addProject);
router.delete('/:id', userRole("admin"), deleteProject);
router.put('/:id', userRole("admin"), updateProject);

export default router;
