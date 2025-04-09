import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid Email address"),
  phone: z.string().min(10, "Phone Number must be at least 10 digits"),
});

export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Zip code must be at least 5 digits").regex(/^\d+$/, "Zip code must contain only numbers"),
});

export const accountSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must match the Password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  account: accountSchema,
});