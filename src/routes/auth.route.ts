import express from "express";
import { authenticationController, loginController, registerController } from "../controllers/auth.controller";

const router = express.Router();

      /**
       * @openapi
       * '/register':
       *  post:
       *     tags:
       *     - User
       *     summary: Register a user
       *     requestBody:
       *      required: true
       *      content:
       *        application/json:
       *           schema:
       *              $ref: '#/components/schemas/Register'
       *     responses:
       *      200:
       *        description: Success
       *        content:
       *          application/json:
       *            schema:
       *              $ref: '#/components/schemas/RegisterResponse'
       *      409:
       *        description: Conflict
       *      400:
       *        description: Bad request
       *      500:
       *        description: Internal server error
       */
  router.post('/register', registerController);
  router.post('/login',loginController);
  router.post('/authentication',authenticationController);

  export default router;