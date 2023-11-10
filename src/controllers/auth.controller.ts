import { Request, Response } from "express";
import { loginCodec, registerCodec } from "../interfaces/auth.interface";
import { authentication, login, register } from "../services/auth.service";

export const registerController = async (req: Request, res: Response) => {
    const args = req?.body;
  
    if (registerCodec.decode(args)._tag === "Right") {
      try {
        const result = await register(args);
        res.status(200).json({ status: "ok" ,result: result});
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };
  
  export const loginController = async (req: Request, res: Response) => {
    const args = req?.body;
  
    if (loginCodec.decode(args)._tag === "Right") {
      try {
        const result = await login(args);
        res.status(200).json({ status: "ok", token: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };
  
  export const authenticationController = async (req: Request, res: Response) => {
    const authHeader = req?.headers["authorization"];
  
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const result = await authentication(authHeader);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(401).json({ error: String(e) });
      }
    } else {
      res.status(401).json({ error: "Invalid or missing Authorization header" });
    }
  };