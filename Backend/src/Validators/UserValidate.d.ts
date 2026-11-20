import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strict>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strict>;
//# sourceMappingURL=UserValidate.d.ts.map