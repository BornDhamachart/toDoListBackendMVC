import { Request, Response } from "express";
import { CustomRequest } from "../interfaces/common.interface";
import { getUser } from "../services/user.service";

export const getUserController = async (req: CustomRequest, res: Response) => {
  try {
    const result = await getUser();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};