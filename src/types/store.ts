import { User } from "@/controllers/userController";
import { UserId } from "./user";

export type StorageState = Record<UserId, User>;
