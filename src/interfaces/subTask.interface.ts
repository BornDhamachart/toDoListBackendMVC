import * as t from "io-ts";
import { optional } from "io-ts-extra";

export const createSubTaskCodec = t.type({
  title: t.string,
  description: t.string,
  taskId: t.number,
});

export interface ICreateSubTask extends t.TypeOf<typeof createSubTaskCodec> {}

export const updateSubTaskCodec = t.type({
  subTaskId: t.number,
  title: t.string,
  description: t.string,
  completed: t.string,
});

export interface IUpdateSubTask extends t.TypeOf<typeof updateSubTaskCodec> {}