import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = express.Router();

// Login
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
