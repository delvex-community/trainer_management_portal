import { z } from "zod";

export const SignupValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  contact: z
    .string()
    .min(10, { message: "Invalid Number" })
    .max(10, { message: "Invalid Number" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20),
});

export const TrainerValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  contact: z
    .string()
    .min(10, { message: "Invalid number" })
    .max(10, { message: "Invalid number" }),
  tech: z.string(),
  file: z.custom<File[]>() || z.string(),
});
