import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

import connectDb from "./db/connectDb.js";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import taskRouter from "./routes/task.route.js"
import { authUser } from "./middleware/authUser.js";
import { hasRole } from "./middleware/HasRole.js";
const app = express();

connectDb();

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Project Management App",
            version: "0.1.0",
            description:
                "This is Project management app for handle the projects",
        },
        servers: [
            {
                url: "http://localhost:8000"
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true
    })
);


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/project", authUser, hasRole("admin"), projectRouter);
app.use("/tasks", authUser, taskRouter)

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



