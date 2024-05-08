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


const runServer = async () => {
  try {
      await connectDb();
      app.listen(process.env.PORT, () => {
          console.log('Server is running on PORT', process.env.PORT);
      });
  } catch (error) {
      console.error('Error starting the server:', error);
      process.exit(1);
  }
}

runServer()



