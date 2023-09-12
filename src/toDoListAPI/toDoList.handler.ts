import { Request, Response } from "express";
import {
  registerCodec,
  loginCodec,
  createGroupCodec,
  createTaskCodec,
  createSubTaskCodec,
  createLabelCodec,
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
} from "./toDoList.resolver";

export const registerHandler = async (
    req: Request,
    res: Response
  ) => {
    const args = req?.body;
  
    if (registerCodec.decode(args)._tag === "Right") {
      try {
        const result = await register(args);
        res.status(200).json({status : "ok"});
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
      res.status(200).json({ status: "ok", token : result});
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const authenticationHandler = async (req: Request, res: Response) => {
  const authHeader = req?.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')){
    try {
      const result = await authentication(authHeader);
      res.status(200).json({ status: "ok", result: result });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Invalid or missing Authorization header" });
  }
};

export const createGroupHandler = async (
  req: Request,
  res: Response
) => {
  const args = req?.body;

  if (createGroupCodec.decode(args)._tag === "Right") {
    try {
      const result = await createGroup(args);
      res.status(200).json({status : "ok"});
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const createTaskHandler = async (
  req: Request,
  res: Response
) => {
  const args = req?.body;

  if (createTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await createTask(args);
      res.status(200).json({status : "ok"});
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const createSubTaskHandler = async (
  req: Request,
  res: Response
) => {
  const args = req?.body;

  if (createSubTaskCodec.decode(args)._tag === "Right") {
    try {
      const result = await createSubTask(args);
      res.status(200).json({status : "ok"});
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const createLabelHandler = async (
  req: Request,
  res: Response
) => {
  const args = req?.body;

  if (createLabelCodec.decode(args)._tag === "Right") {
    try {
      const result = await createLabel(args);
      res.status(200).json({status : "ok"});
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  } else {
    res.status(500).json({ error: "Error invalid codec" });
  }
};

export const getTaskHandler = async (
  req: Request,
  res: Response
) => {
  const queryParams = req?.query;
  console.log("queryParams", queryParams)

  const filteredQueryParams= Object.keys(queryParams)
  .filter(key => queryParams[key] !== "")
  .reduce((result:any, key:any) => {
    result[key] = queryParams[key];
    return result;
  }, {});

  console.log("filteredQueryParams", filteredQueryParams)

    try {
      const result = await getTask(filteredQueryParams);
      res.status(200).json({status : "ok", result : result});
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  }

  export const getLabelHandler = async (
    req: Request,
    res: Response
  ) => {
    const queryParams = req?.query;
    console.log("queryParams", queryParams)
  
    const filteredQueryParams= Object.keys(queryParams)
    .filter(key => queryParams[key] !== "")
    .reduce((result:any, key:any) => {
      result[key] = queryParams[key];
      return result;
    }, {});
  
    console.log("filteredQueryParams", filteredQueryParams)
  
      try {
        const result = await getLabel(filteredQueryParams);
        res.status(200).json({status : "ok", result : result});
      } catch (e) {
        res.status(500).json({ error: String(e) });
      }
    }