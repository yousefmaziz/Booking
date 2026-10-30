import { z } from "zod";

export const bookingSchema = z
  .strictObject({
    yachtId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid yacht ID"),

    startDate: z.iso.date(),

    endDate: z.iso.date(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });
export const bookingIdParamsSchema = z.strictObject({
  bookingId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid booking ID"),
});
