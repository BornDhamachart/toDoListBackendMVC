import express from "express";
import {
  createGroupController,
  deleteGroupController,
  updateGroupController,
} from "../controllers/group.controller";
import { authToken } from "../middlewares";

const router = express.Router();

/**
 * @openapi
 * '/createGroup':
 *  post:
 *     tags:
 *     - Group
 *     summary: Create a new group
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateGroup'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateGroupResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
(router as any).post("/createGroup", authToken, createGroupController);
(router as any).post("/updateGroup", authToken, updateGroupController);
(router as any).post("/deleteGroup", authToken, deleteGroupController);

export default router;
