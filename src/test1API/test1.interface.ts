import * as t from "io-ts";
import { optional } from "io-ts-extra";

export const getTest1Codec = t.type({
//   name: t.string,
//   profileImage: optional(t.string),
//   coverImage: optional(t.string),
//   email: t.string,
//   tel: optional(t.string),
//   bio: optional(t.string),
});

export interface IGetTest1
  extends t.TypeOf<typeof getTest1Codec> {}
