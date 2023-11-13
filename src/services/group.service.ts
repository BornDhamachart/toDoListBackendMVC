import { PrismaClient } from "../../prisma/client";
import { IDelete } from "../interfaces/common.interface";
import { ICreateGroup, IUpdateGroup } from "../interfaces/group.interface";


export const prisma = new PrismaClient();

export const createGroup = async (args: ICreateGroup, userId:number) => {
    try {
      return await prisma.group.create({
        data: {
          title: args?.title,
          description: args?.description,
          user: { connect: { id: userId } },
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error("CreateGroup failed");
    }
  };

  export const updateGroup = async (args: IUpdateGroup, userId:number) => {
    try {
      return await prisma.group.update({
        where: {
          id: args?.groupId,
        },
        data : {
          title: args?.title,
          description: args?.description
        }
      });
    } catch (e) {
      console.error(e);
      throw new Error("UpdateGroup failed");
    }
  };

  export const deleteGroup = async (args: IDelete, userId:number) => {
    try {
      return await prisma.group.delete({
        where: {
          id: args?.id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error("DeleteGroup failed");
    }
  };

 