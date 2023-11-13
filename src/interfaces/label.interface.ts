import * as t from "io-ts";
import { optional } from "io-ts-extra";

export const createLabelCodec = t.type({
  name: t.string,
  color: t.string,
});

export interface ICreateLabel extends t.TypeOf<typeof createLabelCodec> {}
  

export const updateLabelCodec = t.type({
  labelId: t.number,
  name: t.string,
  color: t.string,
});

export interface IUpdateLabel extends t.TypeOf<typeof updateLabelCodec> {}