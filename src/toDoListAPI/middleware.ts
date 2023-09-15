import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "./toDoList.interface";
import { authentication } from "./toDoList.resolver";

export const authToken = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req?.headers["authorization"];
  
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const decodedUser = await authentication(authHeader);
        if (typeof decodedUser === "object" && "userId" && "role" in decodedUser) {
          req.userId = (decodedUser as JwtPayload)?.userId;
          req.role = (decodedUser as JwtPayload)?.role;
          next();
        } else {
          throw new Error("Invalid user data");
        }
      } catch (e) {
        res.status(401).json({ error: String(e) });
      }
    } else {
      res.status(401).json({ error: "Invalid or missing Authorization header" });
    }
  };
  
  export const authPermission = (permissionRoles: string[]) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      const userRole = req?.role;
      try {
        if (permissionRoles.includes(userRole)) {
          next();
        } else {
          throw new Error("You don't have permission!");
        }
      } catch (e) {
        res.status(401).json({ error: String(e) });
      }
    };
  };