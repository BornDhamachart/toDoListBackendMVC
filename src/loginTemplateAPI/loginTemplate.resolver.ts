import { PrismaClient } from "../../prisma/client";
import { IRegister, ILogin, IAuthentication } from "./loginTemplate.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
