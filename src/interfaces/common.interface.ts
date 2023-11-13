import * as t from "io-ts";
import { Request } from "express";

export interface CustomRequest extends Request {
    userId: number;
    role: string;
  }
  
export enum TaskPriority {
    Critical = "Critical",
    High = "High",
    Medium = "Medium",
    Low = "Low",
  }

  export const deleteCodec = t.type({
    id: t.number,
  });
  
  export interface IDelete extends t.TypeOf<typeof deleteCodec> {}
  