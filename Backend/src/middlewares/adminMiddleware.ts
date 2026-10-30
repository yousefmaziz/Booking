import type { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const role = (req as any).user.role;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Cant Do That , You Are Not Admin" });
  }
  next();
};
