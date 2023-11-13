import * as t from "io-ts";
import { optional } from "io-ts-extra";
import { TaskPriority } from "./common.interface";

export const createTaskCodec = t.type({
  title: t.string,
  description: t.string,
  dueDate: t.string,
  priority: t.keyof(TaskPriority),
  groupId: t.number,
  labelId: t.array(t.number),
});

export interface ICreateTask extends t.TypeOf<typeof createTaskCodec> {}

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