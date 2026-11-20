import { z } from "zod";
export declare const createYachtSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    pricePerDay: z.ZodNumber;
    image: z.ZodURL;
    location: z.ZodString;
    capacity: z.ZodNumber;
    available: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const updateYachtSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    pricePerDay: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodURL>;
    location: z.ZodOptional<z.ZodString>;
    capacity: z.ZodOptional<z.ZodNumber>;
    available: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strict>;
export declare const yachtIdParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strict>;
//# sourceMappingURL=YachtValidate.d.ts.map