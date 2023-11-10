import { PrismaClient } from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ILogin, IRegister } from "../interfaces/auth.interface";

export const prisma = new PrismaClient();

export const register = async (args: IRegister) => {
  try {
    const hashPassword = await bcrypt.hash(args.password, Number(process.env.SALT_ROUNDS));

    return await prisma.users.create({
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