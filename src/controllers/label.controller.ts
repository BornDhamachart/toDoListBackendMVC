import { Request, Response } from "express";
import { CustomRequest, deleteCodec } from "../interfaces/common.interface";
import { createLabel, deleteLabel, getLabel, updateLabel } from "../services/label.service";
import { createLabelCodec, updateLabelCodec } from "../interfaces/label.interface";

  export const getLabelController = async (req: CustomRequest, res: Response) => {
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

  export const createLabelController = async (req: CustomRequest, res: Response) => {
    const args = req?.body;
    const userId = req?.userId;
  
    if (createLabelCodec.decode(args)._tag === "Right") {
      try {
        const result = await createLabel(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };

  export const updateLabelController = async (req: CustomRequest, res: Response) => {
    const args = req?.body;
    const userId = req?.userId;
  
    if (updateLabelCodec.decode(args)._tag === "Right") {
      try {
        const result = await updateLabel(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };

  export const deleteLabelController = async (req: CustomRequest, res: Response) => {
    const args = req?.body;
    const userId = req.userId;
  
    if (deleteCodec.decode(args)._tag === "Right") {
      try {
        const result = await deleteLabel(args, userId);
        res.status(200).json({ status: "ok", result: result });
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    } else {
      res.status(500).json({ error: "Error invalid codec" });
    }
  };