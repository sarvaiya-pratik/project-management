

import express from "express";
import { getAllUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/authUser.js";
import { hasRole } from "../middleware/HasRole.js";
const router = express.Router();



router.get('/', authUser, hasRole("admin"), getAllUser)
router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/:id', updateUser)


export default router;
