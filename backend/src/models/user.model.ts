import { IBaseModel } from "./base.model";

export interface IUser extends IBaseModel {
  name: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "nurse";
}
