import express from "express";
import { authToken } from "../middlewares";
import { createTaskController, deleteTaskController, getTaskController, updateTaskController } from "../controllers/task.controller";

const router = express.Router();

(router as any).get("/getTask", authToken, getTaskController);
(router as any).post("/createTask", authToken, createTaskController);
(router as any).post("/updateTask", authToken, updateTaskController);
(router as any).post("/deleteTask", authToken, deleteTaskController);

export default router;
