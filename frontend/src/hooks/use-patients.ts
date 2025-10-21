import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  type IPatientCreate,
  type IPatientUpdate,
  type IPatientListQuery,
  patientCreateResponseSchema,
  patientListResponseSchema,
  patientErrorResponseSchema,
} from "@/lib/schema/patient";
import { toast } from "sonner";

// Hasta oluşturma
async function createPatient({ body }: { body: IPatientCreate }) {
  const { data } = await api.post(`/patients`, body);

  const parsedResponse = patientCreateResponseSchema.safeParseAsync(data);
  if (!parsedResponse) {
    const errorParsed = patientErrorResponseSchema.safeParse(data);
    if (errorParsed.success) {
      throw new Error(errorParsed.data.message);
    }
    throw new Error("Beklenmeyen response formatı");
  }

  return parsedResponse;
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { body: IPatientCreate }) => createPatient(params),
    onSuccess: () => {
      toast.success("Hasta başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error(error.message || "Hasta oluşturulurken hata oluştu");
    },
  });
}

// Hasta listesi çekme
async function fetchPatients(query: IPatientListQuery = {}) {
  const params = new URLSearchParams();

  if (query.search) params.append("search", query.search);
  if (query.sortBy) params.append("sortBy", query.sortBy);
  if (query.sortOrder) params.append("sortOrder", query.sortOrder);
  if (query.page) params.append("page", query.page);
  if (query.limit) params.append("limit", query.limit);

  const { data } = await api.get(`/patients?${params.toString()}`);

  const parsedResponse = patientListResponseSchema.safeParseAsync(data);
  if (!parsedResponse) {
    const errorParsed = patientErrorResponseSchema.safeParse(data);
    if (errorParsed.success) {
      throw new Error(errorParsed.data.message);
    }
    throw new Error("Beklenmeyen response formatı");
  }

  return parsedResponse;
}

export function usePatients(query: IPatientListQuery = {}) {
  return useQuery({
    queryKey: ["patients", query],
    queryFn: () => fetchPatients(query),
  });
}

// Tekil hasta çekme
async function fetchPatient(id: string) {
  const { data } = await api.get(`/patients/${id}`);

  const successParsed = patientCreateResponseSchema.safeParse(data);
  if (successParsed.success) {
    return successParsed.data;
  }

  const errorParsed = patientErrorResponseSchema.safeParse(data);
  if (errorParsed.success) {
    throw new Error(errorParsed.data.message);
  }

  throw new Error("Beklenmeyen response formatı");
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
}

// Hasta güncelleme
async function updatePatient({
  id,
  body,
}: {
  id: string;
  body: IPatientUpdate;
}) {
  const { data } = await api.put(`/patients/${id}`, body);

  const parsedResponse = patientCreateResponseSchema.safeParseAsync(data);
  if (!parsedResponse) {
    const errorParsed = patientErrorResponseSchema.safeParse(data);
    if (errorParsed.success) {
      throw new Error(errorParsed.data.message);
    }
    throw new Error("Beklenmeyen response formatı");
  }

  return parsedResponse;
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; body: IPatientUpdate }) =>
      updatePatient(params),
    onSuccess: () => {
      toast.success("Hasta başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error(error.message || "Hasta güncellenirken hata oluştu");
    },
  });
}

// Hasta silme
async function deletePatient(id: string) {
  const { data } = await api.delete(`/patients/${id}`);
  return data;
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => {
      toast.success("Hasta başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error(error.message || "Hasta silinirken hata oluştu");
    },
  });
}
