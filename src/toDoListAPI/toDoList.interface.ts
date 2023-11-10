import * as t from "io-ts";
import { optional } from "io-ts-extra";

import { Request } from "express";

export interface CustomRequest extends Request {
  userId: number;
  role: string;
}

enum TaskPriority {
  Critical = "Critical",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

/**
 * @openapi
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - fname
 *        - lname
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *        fname:
 *          type: string
 *          default: jane
 *        lname:
 *          type: string
 *          default: doe
 *    RegisterResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        result:
 *          type: object
 *          properties:
 *             id:
 *               type: number
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             fname:
 *               type: string
 *             lname:
 *               type: string
 *             role:
 *               type: string
 *             createdAt:
 *               type: string
 *             updatedAt:
 *               type: string
 */

export const registerCodec = t.type({
  email: t.string,
  password: t.string,
  fname: t.string,
  lname: t.string,
});

export interface IRegister extends t.TypeOf<typeof registerCodec> {}

export const loginCodec = t.type({
  email: t.string,
  password: t.string,
});

export interface ILogin extends t.TypeOf<typeof loginCodec> {}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateGroup:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Group1
 *        description:
 *          type: string
 *          default: GroupDescription1
 *    CreateGroupResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        result:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            userId:
 *              type: number
 */
export const createGroupCodec = t.type({
  title: t.string,
  description: t.string,
});

export interface ICreateGroup extends t.TypeOf<typeof createGroupCodec> {}

export const createTaskCodec = t.type({
  title: t.string,
  description: t.string,
  dueDate: t.string,
  priority: t.keyof(TaskPriority),
  groupId: t.number,
  labelId: t.array(t.number),
});

export interface ICreateTask extends t.TypeOf<typeof createTaskCodec> {}

export const createSubTaskCodec = t.type({
  title: t.string,
  description: t.string,
  taskId: t.number,
});

export interface ICreateSubTask extends t.TypeOf<typeof createSubTaskCodec> {}

export const createLabelCodec = t.type({
  name: t.string,
  color: t.string,
});

export interface ICreateLabel extends t.TypeOf<typeof createLabelCodec> {}

export const deleteCodec = t.type({
  id: t.number,
});

export interface IDelete extends t.TypeOf<typeof deleteCodec> {}

export const updateGroupCodec = t.type({
  groupId: t.number,
  title: t.string,
  description: t.string,
});

export interface IUpdateGroup extends t.TypeOf<typeof updateGroupCodec> {}

export const updateTaskCodec = t.type({
  taskId: t.number,
  title: t.string,
  description: t.string,
  dueDate: t.string,
  completed: t.string,
  priority: t.keyof(TaskPriority),
  groupId: t.number,
});

export interface IUpdateTask extends t.TypeOf<typeof updateTaskCodec> {}

export const updateSubTaskCodec = t.type({
  subTaskId: t.number,
  title: t.string,
  description: t.string,
  completed: t.string,
});

export interface IUpdateSubTask extends t.TypeOf<typeof updateSubTaskCodec> {}

export const updateLabelCodec = t.type({
  labelId: t.number,
  name: t.string,
  color: t.string,
});

export interface IUpdateLabel extends t.TypeOf<typeof updateLabelCodec> {}
