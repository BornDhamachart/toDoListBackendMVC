import {
  authenticationHandler,
  createGroupHandler,
  createLabelHandler,
  createSubTaskHandler,
  createTaskHandler,
  deleteGroupHandler,
  deleteLabelHandler,
  deleteSubTaskHandler,
  deleteTaskHandler,
  getLabelHandler,
  getTaskHandler,
  getUserHandler,
  healthCheckHandler,
  loginHandler,
  registerHandler,
  updateGroupHandler,
  updateLabelHandler,
  updateSubTaskHandler,
  updateTaskHandler,
} from "./toDoListAPI";

export const AppRoutes = [
  {
    /**
     * @openapi
     * /healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Response if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    path: "/healthCheck",
    method: "get",
    action: healthCheckHandler,
  },
  {
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
    path: "/register",
    method: "post",
    action: registerHandler,
  },
  {
    path: "/login",
    method: "post",
    action: loginHandler,
  },
  {
    path: "/authentication",
    method: "post",
    action: authenticationHandler,
  },
];

export const ProtectedAppRoutes = [
  {
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
    path: "/createGroup",
    method: "post",
    action: createGroupHandler,
  },
  {
    path: "/createTask",
    method: "post",
    action: createTaskHandler,
  },
  {
    path: "/createSubTask",
    method: "post",
    action: createSubTaskHandler,
  },
  {
    path: "/createLabel",
    method: "post",
    action: createLabelHandler,
  },
  {
    path: "/getTask",
    method: "get",
    action: getTaskHandler,
  },
  {
    path: "/getLabel",
    method: "get",
    action: getLabelHandler,
  },
  {
    path: "/deleteGroup",
    method: "post",
    action: deleteGroupHandler,
  },
  {
    path: "/deleteTask",
    method: "post",
    action: deleteTaskHandler,
  },
  {
    path: "/deleteSubTask",
    method: "post",
    action: deleteSubTaskHandler,
  },
  {
    path: "/deleteLabel",
    method: "post",
    action: deleteLabelHandler,
  },
  {
    path: "/updateGroup",
    method: "post",
    action: updateGroupHandler,
  },
  {
    path: "/updateTask",
    method: "post",
    action: updateTaskHandler,
  },
  {
    path: "/updateSubTask",
    method: "post",
    action: updateSubTaskHandler,
  },
  {
    path: "/updateLabel",
    method: "post",
    action: updateLabelHandler,
  },
];

export const ProtectedPermissionAppRoutes = [
  {
    path: "/getUser",
    method: "get",
    action: getUserHandler,
  },
];
