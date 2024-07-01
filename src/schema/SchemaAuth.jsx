import * as z from "zod";

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Mat khau phai it nhat 6 ki tu" }),
});
