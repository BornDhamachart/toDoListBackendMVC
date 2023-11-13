import { Request, Response } from "express";
import { CustomRequest, deleteCodec } from "../interfaces/common.interface";
import { createGroupCodec, updateGroupCodec } from "../interfaces/group.interface";
import { createGroup, deleteGroup, updateGroup } from "../services/group.service";

export const createGroupController = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (createGroupCodec.decode(args)._tag === "Right") {
    try {
      const result = await createGroup(args, userId);
      res.status(200).json({ status: "ok", result: result });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const updateGroupController = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (updateGroupCodec.decode(args)._tag === "Right") {
    try {
      const result = await updateGroup(args, userId);
      res.status(200).json({ status: "ok", result: result });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const deleteGroupController = async (req: CustomRequest, res: Response) => {
  const args = req?.body;
  const userId = req?.userId;

  if (deleteCodec.decode(args)._tag === "Right") {
    try {
      const result = await deleteGroup(args, userId);
      res.status(200).json({ status: "ok", result: result });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};