import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDb from "./db/connectDb.js";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";

const app = express();

connectDb();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/project", projectRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("Your server run on ", 8000);
});
