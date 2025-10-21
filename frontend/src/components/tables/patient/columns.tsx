import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import type { IPatient } from "@/lib/schema/patient";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { PatientActionsCell } from "./custom-cells/patient-actions-cell";

interface PatientColumnsProps {
  onEdit?: (patient: IPatient) => void;
  canManagePatients?: boolean;
}

export const createPatientColumns = ({
  onEdit,
  canManagePatients = false,
}: PatientColumnsProps = {}): ColumnDef<IPatient>[] => [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ad" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.original?.firstName || ""}</div>;
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Soyad" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.original?.lastName || ""}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600">{row.original?.email || ""}</div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Telefon" />;
    },
    cell: ({ row }) => {
      return <div className="text-sm">{row.original?.phone || ""}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Cinsiyet" />;
    },
    cell: ({ row }) => {
      const genderMap = {
        male: "Erkek",
        female: "Kadın",
        other: "Diğer",
      };
      return (
        <div className="text-sm">
          {row.original?.gender
            ? genderMap[row.original.gender] || row.original.gender
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Doğum Tarihi" />;
    },
    cell: ({ row }) => {
      const date = row.original?.dateOfBirth
        ? new Date(row.original.dateOfBirth)
        : null;
      return (
        <div className="text-sm">
          {date ? date.toLocaleDateString("tr-TR") : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Adres"
          enableSorting={false}
        />
      );
    },
    cell: ({ row }) => {
      const address = row.original?.address || "";
      return (
        <div className="text-sm max-w-[200px] truncate" title={address}>
          {address}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Kayıt Tarihi" />;
    },
    cell: ({ row }) => {
      const date = row.original?.createdAt
        ? new Date(row.original.createdAt)
        : null;
      return (
        <div className="text-sm text-gray-500">
          {date ? date.toLocaleDateString("tr-TR") : ""}
        </div>
      );
    },
  },
  ...(canManagePatients
    ? [
        {
          id: "actions",
          header: () => <div className="text-center">İşlemler</div>,
          cell: ({ row }: { row: Row<IPatient> }) => {
            return <PatientActionsCell row={row} onEdit={onEdit} />;
          },
          enableSorting: false,
          enableHiding: false,
        },
      ]
    : []),
];
