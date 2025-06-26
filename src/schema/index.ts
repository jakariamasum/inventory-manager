import z from "zod";
export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  image: z.string().url("Invalid image URL"),
  stock: z.string().min(0, "Stock must be a non-negative integer"),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required").optional(),
  image: z.string().url("Invalid image URL").optional(),
  stock: z.string().min(0, "Stock must be a non-negative integer").optional(),
});
export const searchSchema = z.object({
  search: z.string().min(1, "Search query is required"),
});
