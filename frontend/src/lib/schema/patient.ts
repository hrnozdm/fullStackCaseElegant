import { z } from "zod";

export const patientCreateSchema = z.object({
  firstName: z
    .string()
    .min(2, "Ad en az 2 karakter olmalıdır")
    .max(80, "Ad en fazla 80 karakter olabilir"),
  lastName: z
    .string()
    .min(2, "Soyad en az 2 karakter olmalıdır")
    .max(80, "Soyad en fazla 80 karakter olabilir"),
  dateOfBirth: z.string().min(1, "Doğum tarihi zorunludur"),
  gender: z.enum(["male", "female", "other"], {
    message: "Cinsiyet seçimi zorunludur",
  }),
  phone: z
    .string()
    .min(7, "Telefon numarası en az 7 karakter olmalıdır")
    .max(20, "Telefon numarası en fazla 20 karakter olabilir"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  address: z
    .string()
    .min(1, "Adres zorunludur")
    .max(300, "Adres en fazla 300 karakter olabilir"),
  medicalHistory: z
    .string()
    .max(5000, "Tıbbi geçmiş en fazla 5000 karakter olabilir")
    .optional(),
});

export const patientUpdateSchema = patientCreateSchema.partial();

export const patientListQuerySchema = z.object({
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type IPatientCreate = z.infer<typeof patientCreateSchema>;
export type IPatientUpdate = z.infer<typeof patientUpdateSchema>;
export type IPatientListQuery = z.infer<typeof patientListQuerySchema>;

export const patientSchema = z
  .object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    gender: z.enum(["male", "female", "other"]).optional(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    medicalHistory: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .optional();

export type IPatient = z.infer<typeof patientSchema>;

export const patientCreateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: patientSchema.optional(),
});

export const patientListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      items: z.array(patientSchema),
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    })
    .optional(),
});

export const patientErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

export type IPatientCreateResponse = z.infer<
  typeof patientCreateResponseSchema
>;
export type IPatientListResponse = z.infer<typeof patientListResponseSchema>;
export type IPatientErrorResponse = z.infer<typeof patientErrorResponseSchema>;

export const genderOptions = [
  { value: "male", label: "Erkek" },
  { value: "female", label: "Kadın" },
  { value: "other", label: "Diğer" },
] as const;
