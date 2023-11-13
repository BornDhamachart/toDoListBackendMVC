import { Request, Response } from "express";
import { CustomRequest, deleteCodec } from "../interfaces/common.interface";
import { createTask, deleteTask, getTask, updateTask } from "../services/task.service";
import { createTaskCodec, updateTaskCodec } from "../interfaces/task.interface";

export const getTaskController = async (req: CustomRequest, res: Response) => {
  const queryParams = req?.query;
  const userId = req?.userId;

  const filteredQueryParams = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== "")
    .reduce((result: any, key: any) => {
      result[key] = queryParams[key];
      return result;
    }, {});

  try {
    const result = await getTask(filteredQueryParams, userId);
    res.status(200).json({ status: "ok", result: result });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

export const createTaskController = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (createTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await createTask(args, userId);
      res.status(200).json({ status: "ok", result: result });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

  export const updateTaskController = async (req: CustomRequest, res: Response) => {
    const args = req?.body;
    const userId = req?.userId;
  
    if (updateTaskCodec.decode(args)._tag === "Right") {
      try {
        const result = await updateTask(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };

  export const deleteTaskController = async (req: CustomRequest, res: Response) => {
    const args = req?.body;
    const userId = req?.userId;
  
    if (deleteCodec.decode(args)._tag === "Right") {
      try {
        const result = await deleteTask(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };