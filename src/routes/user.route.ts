import express from "express";
import { authPermission, authToken } from "../middlewares";
import { getUserController } from "../controllers/user.controller";

const router = express.Router();

(router as any).get("/getUser", authToken,authPermission(["Admin"]), getUserController);

export default router;
