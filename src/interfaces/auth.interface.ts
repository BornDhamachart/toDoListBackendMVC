import * as t from "io-ts";
import { optional } from "io-ts-extra";

import { Request } from "express";

export interface CustomRequest extends Request {
    userId: number;
    role: string;
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