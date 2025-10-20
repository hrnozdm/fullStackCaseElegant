import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { usePatients } from "@/hooks/use-patients";
import { PatientDataTable } from "@/components/tables/patient/data-table";
import { createPatientColumns } from "@/components/tables/patient/columns";
import { PatientForm } from "@/components/forms/patient-form";
import { useAuth } from "@/context/auth-context";
import type { IPatient } from "@/lib/schema/patient";

function PatientsPage() {
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | undefined>();

  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const {
    data: patientsResponse,
    isLoading,
    error,
  } = usePatients({
    limit: "50",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const patients = patientsResponse?.data?.items || [];

  const handleAddPatient = () => {
    setEditingPatient(undefined);
    setShowForm(true);
  };

  const handleEditPatient = (patient: IPatient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPatient(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPatient(undefined);
  };

  const columns = createPatientColumns({
    onEdit: handleEditPatient,
  });

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Hata Oluştu
          </h2>
          <p className="text-red-600">
            Hastalar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
            deneyin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hasta Yönetimi</h1>
        <p className="text-gray-600 mt-2">
          Hastaları görüntüleyin, ekleyin ve düzenleyin.
        </p>
      </div>

      {showForm ? (
        <div className="mb-8">
          <PatientForm
            patient={editingPatient}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <PatientDataTable
            columns={columns}
            data={patients}
            onAddPatient={handleAddPatient}
            isLoading={isLoading}
            filterColumn="firstName"
            enableView={true}
            enableSelect={false}
          />
        </div>
      )}

      {patientsResponse?.data && !showForm && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Toplam {patientsResponse.data.total} hasta bulundu
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/(app)/patients/")({
  component: PatientsPage,
});
