import * as t from "io-ts";
import { optional } from "io-ts-extra";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateGroup:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Group1
 *        description:
 *          type: string
 *          default: GroupDescription1
 *    CreateGroupResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        result:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            userId:
 *              type: number
 */
export const createGroupCodec = t.type({
    title: t.string,
    description: t.string,
  });
  
  export interface ICreateGroup extends t.TypeOf<typeof createGroupCodec> {}

  export const updateGroupCodec = t.type({
    groupId: t.number,
    title: t.string,
    description: t.string,
  });
  
  export interface IUpdateGroup extends t.TypeOf<typeof updateGroupCodec> {}
  