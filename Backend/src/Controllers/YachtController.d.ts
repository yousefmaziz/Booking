import type { Request, Response } from "express";
export declare const createYacht: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllYachts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getYachtById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateYacht: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteYacht: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=YachtController.d.ts.map