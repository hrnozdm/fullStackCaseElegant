import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  patientCreateSchema,
  patientUpdateSchema,
  genderOptions,
  type IPatientCreate,
  type IPatientUpdate,
  type IPatient,
} from "@/lib/schema/patient";
import { useCreatePatient, useUpdatePatient } from "@/hooks/use-patients";
import { useEffect } from "react";

interface PatientFormProps {
  patient?: IPatient;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type FormData = IPatientCreate | IPatientUpdate;

export function PatientForm({ patient, onSuccess, onCancel }: PatientFormProps) {
  const isEditing = !!patient;
  const schema = isEditing ? patientUpdateSchema : patientCreateSchema;
  
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: patient ? {
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth.split('T')[0], // ISO date to YYYY-MM-DD
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      medicalHistory: patient.medicalHistory || "",
    } : {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: undefined,
      phone: "",
      email: "",
      address: "",
      medicalHistory: "",
    },
  });

  const selectedGender = watch("gender");

  useEffect(() => {
    if (patient) {
      reset({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth.split('T')[0],
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        medicalHistory: patient.medicalHistory || "",
      });
    }
  }, [patient, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && patient) {
        await updatePatient.mutateAsync({ id: patient.id, body: data as IPatientUpdate });
      } else {
        await createPatient.mutateAsync({ body: data as IPatientCreate });
      }
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the hooks
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? "Hasta Bilgilerini Düzenle" : "Yeni Hasta Ekle"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad *
            </label>
            <Input
              {...register("firstName")}
              placeholder="Hasta adı"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Soyad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soyad *
            </label>
            <Input
              {...register("lastName")}
              placeholder="Hasta soyadı"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Doğum Tarihi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doğum Tarihi *
            </label>
            <Input
              {...register("dateOfBirth")}
              type="date"
              className={errors.dateOfBirth ? "border-red-500" : ""}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Cinsiyet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cinsiyet *
            </label>
            <Select
              value={selectedGender}
              onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}
            >
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Cinsiyet seçin" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Telefon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon *
            </label>
            <Input
              {...register("phone")}
              placeholder="0555 123 45 67"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="hasta@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Adres */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adres *
          </label>
          <Input
            {...register("address")}
            placeholder="Tam adres bilgisi"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Tıbbi Geçmiş */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tıbbi Geçmiş
          </label>
          <textarea
            {...register("medicalHistory")}
            placeholder="Hasta tıbbi geçmişi (isteğe bağlı)"
            rows={4}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.medicalHistory ? "border-red-500" : ""
            }`}
          />
          {errors.medicalHistory && (
            <p className="text-red-500 text-sm mt-1">{errors.medicalHistory.message}</p>
          )}
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              İptal
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting
              ? isEditing
                ? "Güncelleniyor..."
                : "Ekleniyor..."
              : isEditing
              ? "Güncelle"
              : "Hasta Ekle"}
          </Button>
        </div>
      </form>
    </div>
  );
}
