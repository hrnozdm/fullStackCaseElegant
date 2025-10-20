import { ObjectId } from "mongodb";

export interface IBaseModel {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
