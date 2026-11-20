import type { Request, Response } from "express";
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const registerUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=UserController.d.ts.map