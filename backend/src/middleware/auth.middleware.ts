import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import env from "@/config/env.config";

export interface JwtPayload {
  userId: string;
  email: string;
  role?: "admin" | "doctor" | "nurse";
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const JWT_SECRET = env.JWT_SECRET || "harunozdemir";

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: (env.JWT_EXPIRES_IN || "24h") as any,
  };
  return jwt.sign(payload, JWT_SECRET as unknown as jwt.Secret, options);
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token not found",
      });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
        return;
      }

      req.user = decoded as JwtPayload;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token validation error",
    });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!roles.includes(req.user.role || "")) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
      return;
    }

    next();
  };
};

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    next();
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.user = decoded as JwtPayload;
    }
    next();
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};
