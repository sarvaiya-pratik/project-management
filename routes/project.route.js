import express from "express";
import { addProject, deleteProject, getAllProject, updateProject, } from "../controllers/project.controller.js";
import { hasRole } from "../middleware/HasRole.js";

const router = express.Router();

// Login
router.get('/', getAllProject);
router.post('/add', addProject);
router.delete('/:id', deleteProject);
router.put('/:id', updateProject);

export default router;
