import express from "express";
import { authToken } from "../middlewares";
import { createLabelController, deleteLabelController, getLabelController, updateLabelController } from "../controllers/label.controller";

const router = express.Router();

(router as any).get("/getLabel", authToken, getLabelController);
(router as any).post("/createLabel", authToken, createLabelController);
(router as any).post("/updateLabel", authToken, updateLabelController);
(router as any).post("/deleteLabel", authToken, deleteLabelController);

export default router;
