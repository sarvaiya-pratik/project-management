import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDb from "./db/connectDb.js";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import taskRouter from "./routes/task.route.js"
import { authUser } from "./middleware/authUser.js";
import { hasRole } from "./middleware/HasRole.js";
const app = express();

import pool from "./db/connectDb.js";




app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/project", authUser, projectRouter);
app.use("/tasks", authUser, taskRouter)


    app.listen(process.env.PORT, () => {
        console.log('Server is running on PORT', process.env.PORT);
    });





