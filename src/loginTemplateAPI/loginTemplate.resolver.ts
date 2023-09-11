import { PrismaClient } from "../../prisma/client";
import { IRegister, ILogin, IAuthentication } from "./loginTemplate.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

const saltRounds: number = 10;
const secret = "secretTest";

export const register = (args: IRegister) => {
  bcrypt.hash(
    args.password,
    saltRounds,
    function (err: any, hashPassword: any) {
      prisma.users.create({
        data: {
          email: args.email,
          password: hashPassword,
          fname: args.email,
          lname: args.email,
        },
      });
    }
  );
};

export const registerNew = async (args: IRegister) => {
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
    bcrypt.compare(args.password, user[0]?.password, function (err, isLogin) {
      if (isLogin) {
        const token = jwt.sign({ email: user[0]?.email, fullname: user[0]?.fname }, secret, {
          expiresIn: "1hr",
        });
        return token;
      } else {
        throw new Error("Login failed");
      }
    });
  } catch (e) {
    console.error(e);
  }
};

export const authentication = async (args: IAuthentication) => {
  try {
    const token = args.token.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (e) {
    console.error(e);
  }
};
