import { PrismaClient } from "../../prisma/client";
import { IDelete } from "../interfaces/common.interface";
import { ICreateLabel, IUpdateLabel } from "../interfaces/label.interface";


export const prisma = new PrismaClient();

export const createLabel = async (args: ICreateLabel, userId:number) => {
  try {
    return await prisma.label.create({
      data: {
        name: args?.name,
        color: args?.color,
        user : { connect: { id: userId } },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateTask failed");
  }
};

export const getLabel = async (filteredQueryParams : any, userId:number) => {
  try {
    return await prisma.label.findMany({
      where: {
        userId : userId
      },
    });

  } catch (e) {
    console.error(e);
    throw new Error("GetTask failed");
  }
};

export const updateLabel = async (args: IUpdateLabel, userId:number) => {
  try {
    return await prisma.label.update({
      where: {
        id: args?.labelId,
      },
      data : {
        name: args?.name,
        color: args?.color,
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("UpdateSubTask failed");
  }
};

export const deleteLabel = async (args: IDelete, userId:number) => {
  try {
    return await prisma.label.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteSubTask failed");
  }
};

 