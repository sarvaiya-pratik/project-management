import express from "express";
import { addProject, deleteProject, getAllProject, updateProject, } from "../controllers/project.controller.js";
import { hasRole } from "../middleware/HasRole.js";

const router = express.Router();

router.get('/', getAllProject);
router.post('/add', hasRole("admin"), addProject);
router.delete('/:id', hasRole("admin"), deleteProject);
router.put('/:id', hasRole("admin"), updateProject);

export default router;
