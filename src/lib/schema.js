import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  userName: z
    .string()
    .min(2, "User name must be at least 2 characters")
    .max(50, "User name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be less than 50 characters"),
});
