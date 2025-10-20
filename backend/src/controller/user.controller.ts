import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseBefore,
  Res,
} from "routing-controllers";
import { Response } from "express";
import userService from "@/service/user.service";
import { authenticateToken } from "@/middleware/auth.middleware";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "@/dto/user.dto";
import { HttpStatus } from "@/constant/http.status";

@Controller("/api/users")
export class UserController {
  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      const result = await userService.register(body);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    try {
      // Validation

      const result = await userService.login(body);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  }

  @Get("/:id")
  @UseBefore(authenticateToken)
  @HttpCode(HttpStatus.OK)
  async getUser(@Param("id") id: string, @Res() res: Response) {
    try {
      const user = await userService.getUser(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to get user",
      });
    }
  }

  @Put("/:id")
  @UseBefore(authenticateToken)
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param("id") id: string,
    @Body() body: UpdateUserDto,
    @Res() res: Response
  ) {
    try {
      const user = await userService.updateUser(id, body);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update user",
      });
    }
  }

  @Delete("/:id")
  @UseBefore(authenticateToken)
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param("id") id: string, @Res() res: Response) {
    try {
      const result = await userService.deleteUser(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete user",
      });
    }
  }
}
