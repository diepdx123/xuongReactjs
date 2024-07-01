import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Mat khau phai it nhat 6 ki tu" }),
});

export const registerSchema = z.object({
  userName: z.string().min(5, { message: "Ten phai it nhat 5 ki tu" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Mat khau phai co it nhat 6 ki tu" }),
});
