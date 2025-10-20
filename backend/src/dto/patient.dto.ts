import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";
import { Gender } from "@/models/patient.model";

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 80)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 80)
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string; // ISO string; will be converted to Date in service

  @IsNotEmpty()
  @IsEnum(["male", "female", "other"], {
    message: "Gender must be one of: male, female, other",
  })
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  @Length(7, 20)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  medicalHistory?: string;
}

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  @Length(2, 80)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 80)
  lastName?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(["male", "female", "other"], {
    message: "Gender must be one of: male, female, other",
  })
  gender?: Gender;

  @IsOptional()
  @IsString()
  @Length(7, 20)
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  medicalHistory?: string;
}

export class ListPatientsQueryDto {
  @IsOptional()
  @IsString()
  search?: string; // search in name/email/phone

  @IsOptional()
  @IsString()
  sortBy?: string; // firstName,lastName,createdAt

  @IsOptional()
  @IsString()
  sortOrder?: "asc" | "desc";

  @IsOptional()
  @IsString()
  page?: string; // numeric string

  @IsOptional()
  @IsString()
  limit?: string; // numeric string
}
