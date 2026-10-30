import { z } from "zod";

export const registerSchema = z.strictObject({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),

  email: z.email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.strictObject({
  email: z.email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});
