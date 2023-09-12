import * as t from "io-ts";
import { optional } from "io-ts-extra";

enum TaskPriority {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

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

export const createGroupCodec = t.type({
  title: t.string,
  description: t.string,
  userId: t.number,
});

export interface Label {
  name: string;
  color: string;
}

export interface ICreateGroup extends t.TypeOf<typeof createGroupCodec> {}

export const createTaskCodec = t.type({
  title: t.string,
  description: t.string,
  dueDate: t.string,
  priority: t.keyof(TaskPriority),
  groupId: t.number,
  labelId: t.array(t.number),
  userId:t.number
});

export interface ICreateTask extends t.TypeOf<typeof createTaskCodec> {}

export const createSubTaskCodec = t.type({
  title: t.string,
  description: t.string,
  taskId: t.number
});

export interface ICreateSubTask extends t.TypeOf<typeof createSubTaskCodec> {}

export const createLabelCodec = t.type({
  name: t.string,
  color: t.string,
  userId: t.number
});

export interface ICreateLabel extends t.TypeOf<typeof createLabelCodec> {}
