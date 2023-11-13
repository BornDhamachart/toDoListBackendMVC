import express from "express";
import { authToken } from "../middlewares";
import { createSubTaskController, deleteSubTaskController, updateSubTaskController } from "../controllers/subTask.controller";

const router = express.Router();

(router as any).post("/createSubTask", authToken, createSubTaskController);
(router as any).post("/updateSubTask", authToken, updateSubTaskController);
(router as any).post("/deleteSubTask", authToken, deleteSubTaskController);

export default router;
