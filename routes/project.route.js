import express from "express";
import { addProject, getAllProject, } from "../controllers/project.controller.js";
import { authUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Login
router.get("/all", getAllProject);
router.post("/add", authUser,addProject);

export default router;
