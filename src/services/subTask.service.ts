import { PrismaClient } from "../../prisma/client";
import { IDelete } from "../interfaces/common.interface";
import { ICreateSubTask, IUpdateSubTask } from "../interfaces/subTask.interface";


export const prisma = new PrismaClient();

export const createSubTask = async (args: ICreateSubTask, userId:number) => {
  try {
    return await prisma.subtask.create({
      data: {
        title: args?.title,
        description: args?.description,
        task: { connect: { id: args?.taskId } },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateTask failed");
  }
};

export const updateSubTask = async (args: IUpdateSubTask, userId:number) => {
  try {
    return await prisma.subtask.update({
      where: {
        id: args?.subTaskId,
      },
      data : {
        title: args?.title,
        description: args?.description,
        completed: args?.completed === "Y" ? true : false,
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("UpdateSubTask failed");
  }
};

export const deleteSubTask = async (args: IDelete, userId:number) => {
  try {
    return await prisma.subtask.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteSubTask failed");
  }
};
 