import { UserId } from "@/types/user";
import { Context } from "grammy";

export interface IControlFlow {
  sendData: (ctx: Context, userId: UserId) => void,
}