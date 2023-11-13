import { Request, Response } from "express";
import { CustomRequest, deleteCodec } from "../interfaces/common.interface";
import { createSubTaskCodec, updateSubTaskCodec } from "../interfaces/subTask.interface";
import { createSubTask, deleteSubTask, updateSubTask } from "../services/subTask.service";

export const createSubTaskController = async (
    req: CustomRequest,
    res: Response
  ) => {
    const args = req?.body;
    const userId = req.userId;
  
    if (createSubTaskCodec.decode(args)._tag === "Right") {
      try {
        const result = await createSubTask(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };

  export const updateSubTaskController = async (
    req: CustomRequest,
    res: Response
  ) => {
    const args = req?.body;
    const userId = req?.userId;
  
    if (updateSubTaskCodec.decode(args)._tag === "Right") {
      try {
        const result = await updateSubTask(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };

  export const deleteSubTaskController = async (
    req: CustomRequest,
    res: Response
  ) => {
    const args = req?.body;
    const userId = req.userId;
  
    if (deleteCodec.decode(args)._tag === "Right") {
      try {
        const result = await deleteSubTask(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };