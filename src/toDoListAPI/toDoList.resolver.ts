import { PrismaClient } from "../../prisma/client";
import { IRegister, ILogin, ICreateGroup, ICreateTask, ICreateSubTask, ICreateLabel } from "./toDoList.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from 'dayjs';
import { argv } from "process";

export const prisma = new PrismaClient();

const saltRounds: number = 10;
const secret = "secretTest";

export const register = async (args: IRegister) => {
  try {
    const hashPassword = await bcrypt.hash(args.password, saltRounds);

    await prisma.users.create({
      data: {
        email: args.email,
        password: hashPassword,
        fname: args.email,
        lname: args.email,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("Register failed");
  }
};

export const login = async (args: ILogin) => {
  try {
    const user = await prisma.users.findMany({
      where: {
        email: args.email,
      },
    });

    if (user?.length === 0) {
      throw new Error("User not found");
    }

    const isLogin = await bcrypt.compare(args.password, user[0]?.password);

    if (isLogin) {
      const token = jwt.sign(
        { email: user[0]?.email, fullname: user[0]?.fname },
        secret,
        {
          expiresIn: "1hr",
        }
      );

      return token;
    } else {
      throw new Error("Login failed");
    }
  } catch (e) {
    console.error(e);
    throw new Error("Login failed");
  }
};

export const authentication = async (authHeader: string) => {
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (e) {
    console.error(e);
    throw new Error("Authentication failed");
  }
};

//CREATE
export const createGroup = async (args: ICreateGroup) => {
  try {
    await prisma.group.create({
      data: {
        title: args.title,
        description: args.description,
        user: { connect: { id: args.userId } },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateGroup failed");
  }
};

export const createTask = async (args: ICreateTask) => {
  const inputDueDate = args.dueDate === "" ? null : `${args.dueDate}T00:00:00Z`
  try {
    await prisma.task.create({
      data: {
        title: args.title,
        description: args.description,
        dueDate : inputDueDate,
        priority : args.priority,
        group: { connect: { id: args.groupId } },
        labels: {
          connect : args.labelId.map((r:number) => ({id : r}))
        },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateTask failed");
  }
};

export const createSubTask = async (args: ICreateSubTask) => {
  try {
    await prisma.subtask.create({
      data: {
        title: args.title,
        description: args.description,
        task: { connect: { id: args.taskId } },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateTask failed");
  }
};

export const createLabel = async (args: ICreateLabel) => {
  try {
    await prisma.label.create({
      data: {
        name: args.name,
        color: args.color,
        user : { connect: { id: args.userId } },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("CreateTask failed");
  }
};

//READ
export const getTask = async (filteredQueryParams : any) => {
  console.log("filteredQueryParams",filteredQueryParams)
  try {
     const tasks = await prisma.task.findMany({
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
          userId: Number(filteredQueryParams?.userId), //get UserID from token
        },
      },
      include : {
        subTasks : true,
        group : true
      }
    });
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error("GetTask failed");
  }
};

export const getLabel = async (filteredQueryParams : any) => {
  console.log("filteredQueryParams",filteredQueryParams)
  try {
     const tasks = await prisma.label.findMany({
      where: {
        userId : Number(filteredQueryParams?.userId)// get from token
      },
    });
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error("GetTask failed");
  }
};
