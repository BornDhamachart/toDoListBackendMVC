import { Request, Response } from "express";
import {
  registerCodec,
  loginCodec,
  createGroupCodec,
  createTaskCodec,
  createSubTaskCodec,
  createLabelCodec,
  deleteCodec,
  updateGroupCodec,
  updateTaskCodec,
  updateSubTaskCodec,
  updateLabelCodec,
  CustomRequest,
} from "./toDoList.interface";
import {
  register,
  login,
  authentication,
  createGroup,
  createTask,
  createSubTask,
  createLabel,
  getTask,
  getLabel,
  updateLabel,
  updateSubTask,
  updateTask,
  updateGroup,
  deleteLabel,
  deleteSubTask,
  deleteTask,
  deleteGroup,
  getUser,
} from "./toDoList.resolver";

export const registerHandler = async (req: Request, res: Response) => {
  const args = req?.body;

  if (registerCodec.decode(args)._tag === "Right") {
    try {
      const result = await register(args);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
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

export const authenticationHandler = async (req: Request, res: Response) => {
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

export const createGroupHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (createGroupCodec.decode(args)._tag === "Right") {
    try {
      const result = await createGroup(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const createTaskHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (createTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await createTask(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const createSubTaskHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req.userId;

  if (createSubTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await createSubTask(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const createLabelHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (createLabelCodec.decode(args)._tag === "Right") {
    try {
      const result = await createLabel(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const getTaskHandler = async (req: CustomRequest, res: Response) => {
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

export const getLabelHandler = async (req: CustomRequest, res: Response) => {
  const queryParams = req?.query;
  const userId = req?.userId;

  const filteredQueryParams = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== "")
    .reduce((result: any, key: any) => {
      result[key] = queryParams[key];
      return result;
    }, {});

  try {
    const result = await getLabel(filteredQueryParams, userId);
    res.status(200).json({ status: "ok", result: result });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

export const deleteGroupHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (deleteCodec.decode(args)._tag === "Right") {
    try {
      const result = await deleteGroup(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const deleteTaskHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (deleteCodec.decode(args)._tag === "Right") {
    try {
      const result = await deleteTask(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const deleteSubTaskHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req.userId;

  if (deleteCodec.decode(args)._tag === "Right") {
    try {
      const result = await deleteSubTask(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const deleteLabelHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req.userId;

  if (deleteCodec.decode(args)._tag === "Right") {
    try {
      const result = await deleteLabel(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const updateGroupHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (updateGroupCodec.decode(args)._tag === "Right") {
    try {
      const result = await updateGroup(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const updateTaskHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (updateTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await updateTask(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const updateSubTaskHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (updateSubTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await updateSubTask(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const updateLabelHandler = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (updateLabelCodec.decode(args)._tag === "Right") {
    try {
      const result = await updateLabel(args, userId);
      res.status(200).json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

//ADMIN PERMISSION
export const getUserHandler = async (req: CustomRequest, res: Response) => {
    try {
      const result = await getUser();
      res.status(200).send(result);
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  }
