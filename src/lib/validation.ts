import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "نام باید حداقل ۲ حرف باشد").max(80),
  email: z.string().trim().toLowerCase().email("ایمیل معتبر نیست"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد").max(200),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export const messageSchema = z.object({
  content: z.string().trim().min(1, "پیام نمی‌تواند خالی باشد").max(8000),
  conversationId: z.string().optional(),
});
