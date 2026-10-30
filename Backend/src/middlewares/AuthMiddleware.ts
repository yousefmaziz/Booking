import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid authorization header",
    });
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  if (typeof decoded === "string" || typeof decoded.id !== "string") {
    return res.status(401).json({
      message: "Invalid token payload",
    });
  }

  try {
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    (req as any).user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication service error",
    });
  }
};
