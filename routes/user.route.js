

import express from "express";
import { getAllUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/authUser.middleware.js";
import { userRole } from "../middleware/userRole.middleware.js";
const router = express.Router();

router.get('/', authUser, userRole("admin"), getAllUser)
router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/:id', updateUser)


export default router;
