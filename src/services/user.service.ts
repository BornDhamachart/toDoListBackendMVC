import { PrismaClient } from "../../prisma/client";
import { IDelete } from "../interfaces/common.interface";
import { ICreateTask, IUpdateTask } from "../interfaces/task.interface";


export const prisma = new PrismaClient();

export const getUser = async () => {
  try {
    return await prisma.users.findMany();
  } catch (e) {
    console.error(e);
    throw new Error("GetUser failed");
  }
};