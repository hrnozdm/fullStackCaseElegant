import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  Res,
  UseBefore,
} from "routing-controllers";
import { Req } from "routing-controllers";
import { Request, Response } from "express";
import { HttpStatus } from "@/constant/http.status";
import patientService from "@/service/patient.service";
import {
  authenticateToken,
  authorizeRoles,
} from "@/middleware/auth.middleware";
import {
  CreatePatientDto,
  ListPatientsQueryDto,
  UpdatePatientDto,
} from "@/dto/patient.dto";

@Controller("/api/patients")
export class PatientController {
  @Post("")
  @UseBefore(authenticateToken, authorizeRoles("admin", "doctor"))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreatePatientDto, @Res() res: Response) {
    try {
      const result = await patientService.create(body);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Patient created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create patient",
      });
    }
  }

  @Get("")
  @UseBefore(authenticateToken, authorizeRoles("admin", "doctor", "nurse"))
  @HttpCode(HttpStatus.OK)
  async list(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await patientService.list(req.query);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Patients listed successfully",
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to list patients",
      });
    }
  }

  @Get("/:id")
  @UseBefore(authenticateToken, authorizeRoles("admin", "doctor", "nurse"))
  @HttpCode(HttpStatus.OK)
  async get(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await patientService.getById(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Patient retrieved successfully",
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get patient",
      });
    }
  }

  @Put("/:id")
  @UseBefore(authenticateToken, authorizeRoles("admin", "doctor"))
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id") id: string,
    @Body() body: UpdatePatientDto,
    @Res() res: Response
  ) {
    try {
      const result = await patientService.update(id, body);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Patient updated successfully",
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update patient",
      });
    }
  }

  @Delete("/:id")
  @UseBefore(authenticateToken, authorizeRoles("admin"))
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await patientService.remove(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete patient",
      });
    }
  }
}
