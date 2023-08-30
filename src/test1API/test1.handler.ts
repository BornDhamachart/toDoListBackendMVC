import { Request, Response } from "express";
import {
    getTest1Codec
  } from "./test1.interface";
import {
    getTest1
} from "./test1.resolver";

// export const getTest1Handler = async (
//     req: Request,
//     res: Response
//   ) => {
//     const args = req?.body;
  
//     if (getTest1Codec.decode(args)._tag === "Right") {
//       try {
//         const result = await getTest1(args);
//         res.status(200).json(result);
//       } catch (e) {
//         res.status(500).json({ error: String(e) });
//       }
//     } else {
//       res.status(500).json({ error: "Error invalid codec" });
//     }
//   };
  
//   export const getTest1Handler = async (
//     req: Request,
//     res: Response
//   ) => {
//     try {
//       const response = await getTest1();
//       return res.status(200).send(response);
//     } catch (e) {
//       return res.status(500).send(e);
//     }
//   };