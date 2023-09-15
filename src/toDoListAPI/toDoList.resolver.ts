import { PrismaClient } from "../../prisma/client";
import { IRegister, ILogin, ICreateGroup, ICreateTask, ICreateSubTask, ICreateLabel, IDelete, IUpdateLabel, IUpdateSubTask, IUpdateTask, IUpdateGroup } from "./toDoList.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

export const register = async (args: IRegister) => {
  try {
    const hashPassword = await bcrypt.hash(args.password, Number(process.env.SALT_ROUNDS));

    await prisma.users.create({
      data: {
        email: args?.email,
        password: hashPassword,
        fname: args?.fname,
        lname: args?.lname,
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
        email: args?.email,
      },
    });

    if (user?.length === 0) {
      throw new Error("User not found");
    }

    const isLogin = await bcrypt.compare(args.password, user[0]?.password);

    if (isLogin) {
      const token = jwt.sign(
        { email: user[0]?.email, fullname: user[0]?.fname, userId: user[0]?.id, role: user[0]?.role},
        process.env.SECRET_KEY as string,
        {
          expiresIn: "6hr",
        }
      );

      return token;
    } else {
      throw new Error("Login failed");
    }
  } catch (e) {
    console.error(e);
    throw new Error("Login error");
  }
};

export const authentication = async (authHeader: string) => {
  try {
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token,  process.env.SECRET_KEY as string);
    return decoded;
  } catch (e) {
    console.error(e);
    throw new Error("Authentication failed");
  }
};

//CREATE
export const createGroup = async (args: ICreateGroup, userId:number) => {
  try {
    await prisma.group.create({
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

export const createTask = async (args: ICreateTask, userId:number) => {
  const inputDueDate = args?.dueDate === "" ? null : `${args?.dueDate}T00:00:00Z`
  try {
    await prisma.task.create({
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

export const createSubTask = async (args: ICreateSubTask, userId:number) => {
  try {
    await prisma.subtask.create({
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

export const createLabel = async (args: ICreateLabel, userId:number) => {
  try {
    await prisma.label.create({
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

//READ
export const getTask = async (filteredQueryParams : any, userId:number) => {
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
          userId: userId,
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

export const getLabel = async (filteredQueryParams : any, userId:number) => {
  try {
     const tasks = await prisma.label.findMany({
      where: {
        userId : userId
      },
    });
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error("GetTask failed");
  }
};

//DELETE
export const deleteGroup = async (args: IDelete, userId:number) => {
  try {
    await prisma.group.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteGroup failed");
  }
};

export const deleteTask = async (args: IDelete, userId:number) => {
  try {
    await prisma.task.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteTask failed");
  }
};

export const deleteSubTask = async (args: IDelete, userId:number) => {
  try {
    await prisma.subtask.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteSubTask failed");
  }
};

export const deleteLabel = async (args: IDelete, userId:number) => {
  try {
    await prisma.label.delete({
      where: {
        id: args?.id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("DeleteSubTask failed");
  }
};


//UPDATE
export const updateGroup = async (args: IUpdateGroup, userId:number) => {
  try {
    await prisma.group.update({
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
    throw new Error("DeleteGroup failed");
  }
};

export const updateTask = async (args: IUpdateTask, userId:number) => {
  const inputDueDate = args?.dueDate === "" ? null : `${args?.dueDate}T00:00:00Z`
  try {
    await prisma.task.update({
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
    throw new Error("DeleteTask failed");
  }
};

export const updateSubTask = async (args: IUpdateSubTask, userId:number) => {
  try {
    await prisma.subtask.update({
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
    throw new Error("DeleteSubTask failed");
  }
};

export const updateLabel = async (args: IUpdateLabel, userId:number) => {
  try {
    await prisma.label.update({
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
    throw new Error("DeleteSubTask failed");
  }
};

//ADMIN PERMISSION
export const getUser = async () => {
  try {
    return await prisma.users.findMany();
  } catch (e) {
    console.error(e);
    throw new Error("GetUser failed");
  }
};