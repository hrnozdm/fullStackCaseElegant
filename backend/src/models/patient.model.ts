import { IBaseModel } from "@/models/base.model";

export type Gender = "male" | "female" | "other";

export interface IPatient extends IBaseModel {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  email: string;
  address: string;
  medicalHistory?: string;
}
