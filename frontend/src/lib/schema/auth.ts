import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email alanı zorunludur"),

  password: z
    .string()
    .min(1, "Şifre alanı zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Ad soyad alanı zorunludur")
    .min(2, "Ad soyad en az 2 karakter olmalıdır"),
  email: z
    .string()
    .min(1, "Email alanı zorunludur"),

  password: z
    .string()
    .min(1, "Şifre alanı zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
  confirmPassword: z
    .string()
    .min(1, "Şifre tekrar alanı zorunludur"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
