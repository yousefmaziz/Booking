import { z } from "zod";

export const createYachtSchema = z.strictObject({
  name: z.string().trim().min(3),
  description: z.string().trim().min(10),
  pricePerDay: z.number().positive(),
  image: z.url(),
  location: z.string().trim().min(2),
  capacity: z.number().int().positive(),
  available: z.boolean().optional(),
});

export const updateYachtSchema = createYachtSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const yachtIdParamsSchema = z.strictObject({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid yacht ID"),
});
