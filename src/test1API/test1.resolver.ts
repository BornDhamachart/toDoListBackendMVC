import { PrismaClient } from "../../prisma/client";
import {
    IGetTest1
} from "./test1.interface";

export const prisma = new PrismaClient();

export const getTest1 = (
  args: IGetTest1
) => prisma.test1.create({
    // data: {
    //   name: args.name,
    //   answer: {
    //     create: {
    //       choice: args.answer,
    //     },
    //   },
    //   choices: {
    //     create: args.choices,
    //   },
    //   category: {
    //     connect: {
    //       id: args.categoryId,
    //     },
    //   },
    // },
    // include: {
    //   answer: true,
    //   choices: true
    // }
  });
