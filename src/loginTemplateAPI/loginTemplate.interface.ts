import * as t from "io-ts";
import { optional } from "io-ts-extra";

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

export const authenticationCodec = t.type({
  token: t.string,
});

export interface IAuthentication extends t.TypeOf<typeof authenticationCodec> {}
