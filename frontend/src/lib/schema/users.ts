import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(1, "Ad zorunludur"),
  email: z.email("Geçerli email giriniz"),
  password: z.string().min(6, "En az 6 karakter"),
});

export type IUserCreate = z.infer<typeof userCreateSchema>;

export const userCreateResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: z.object({
      id: z.string(),
      email: z.string(),
      role: z.string(),
      name: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
    token: z.string(),
  }).optional(),
  message: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(1, "Şifre zorunludur"),
});

export type IUserLogin = z.infer<typeof userLoginSchema>;


export const userLoginResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: z.object({
      id: z.string(),
      email: z.string(),
      role: z.string(),
      name: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
    token: z.string(),
  }),
});


export const userLoginErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

export type IUserLoginResponse = z.infer<typeof userLoginResponseSchema>;
export type IUserLoginErrorResponse = z.infer<typeof userLoginErrorResponseSchema>;