import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .email({ message: "Please enter a valid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter (A-Z)",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter (a-z)",
    })
    .regex(/[0-9]/, { message: "Must contain at least one number (0-9)" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Must contain at least one special character",
    }),
  mobile: z
    .string()
    .trim()
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
      message: "Please enter a valid Bangladeshi mobile number",
    }),
});
