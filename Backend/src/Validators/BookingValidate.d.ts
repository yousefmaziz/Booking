import { z } from "zod";
export declare const bookingSchema: z.ZodObject<{
    yachtId: z.ZodString;
    startDate: z.ZodISODate;
    endDate: z.ZodISODate;
}, z.core.$strict>;
export declare const bookingIdParamsSchema: z.ZodObject<{
    bookingId: z.ZodString;
}, z.core.$strict>;
//# sourceMappingURL=BookingValidate.d.ts.map