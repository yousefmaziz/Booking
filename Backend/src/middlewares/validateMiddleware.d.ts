import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
type ValidationTarget = "body" | "params";
export declare const validateMiddleware: (schema: z.ZodType, target?: ValidationTarget) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=validateMiddleware.d.ts.map