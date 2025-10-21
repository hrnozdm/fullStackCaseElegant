import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { IPatient } from "@/lib/schema/patient";
import { useDeletePatient } from "@/hooks/use-patients";
import type { Row } from "@tanstack/react-table";

interface PatientActionsCellProps {
  row: Row<IPatient>;
  onEdit?: (patient: IPatient) => void;
}

export function PatientActionsCell({ row, onEdit }: PatientActionsCellProps) {
  const deletePatient = useDeletePatient();
  const patient = row.original;

  const handleEdit = () => {
    onEdit?.(patient);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `${patient?.firstName} ${patient?.lastName} adlı hastayı silmek istediğinizden emin misiniz?`
      )
    ) {
      deletePatient.mutate(patient?.id ?? "");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          İşlemler
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" side="left">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="w-full justify-start"
          >
            Düzenle
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deletePatient.isPending}
            className="w-full justify-start"
          >
            {deletePatient.isPending ? "Siliniyor..." : "Sil"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
