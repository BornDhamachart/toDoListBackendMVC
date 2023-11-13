import { PrismaClient } from "../../prisma/client";
import { IDelete } from "../interfaces/common.interface";
import { ICreateTask, IUpdateTask } from "../interfaces/task.interface";


export const prisma = new PrismaClient();

export const getTask = async (filteredQueryParams : any, userId:number) => {
  try {
    return await prisma.task.findMany({
      where: {
        title: {
          contains: filteredQueryParams?.title,
        },
        description: {
          contains: filteredQueryParams?.description,
        },
        dueDate : {gte: filteredQueryParams?.dueDate ? `${filteredQueryParams?.dueDate}T00:00:00Z` : undefined,
        lte: filteredQueryParams?.dueDate ? `${filteredQueryParams?.dueDate}T23:59:59Z` : undefined
        },
        completed : filteredQueryParams?.completed === "Y" ? true : false,
        priority :  filteredQueryParams?.priority,
        groupId : filteredQueryParams?.groupId,
        group: {
          userId: userId,
        },
      },
      include : {
        subTasks : true,
        group : true
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("GetTask failed");
  }
};

export const createTask = async (args: ICreateTask, userId:number) => {
  const inputDueDate = args?.dueDate === "" ? null : `${args?.dueDate}T00:00:00Z`
  try {
    return await prisma.task.create({
      data: {
        title: args?.title,
        description: args?.description,
        dueDate : inputDueDate,
        priority : args?.priority,
        group: { connect: { id: args?.groupId } },
        labels: {
          connect : args?.labelId.map((r:number) => ({id : r}))
        },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateTask failed");
  }
};

export const updateTask = async (args: IUpdateTask, userId:number) => {
  const inputDueDate = args?.dueDate === "" ? null : `${args?.dueDate}T00:00:00Z`
  try {
    return await prisma.task.update({
      where: {
        id: args?.taskId,
      },
      data : {
        title: args?.title,
        description: args?.description,
        dueDate: inputDueDate,
        completed: args?.completed === "Y" ? true : false,
        priority: args?.priority,
        groupId : args?.groupId
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("UpdateTask failed");
  }
};

export const deleteTask = async (args: IDelete, userId:number) => {
  try {
    return await prisma.task.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteTask failed");
  }
};