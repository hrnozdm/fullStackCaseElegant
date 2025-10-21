import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "@/components/tables/shared/data-table-pagination";
import { DataTableViewOptions } from "@/components/tables/shared/data-table-visibility";
import { DataTableFilter } from "@/components/tables/shared/data-table-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { IPatient } from "@/lib/schema/patient";

interface PatientDataTableProps {
  columns: ColumnDef<IPatient>[];
  data: IPatient[];
  enableView?: boolean;
  enableSelect?: boolean;
  filterColumn?: string;
  onAddPatient?: () => void;
  isLoading?: boolean;
  canManagePatients?: boolean;
}

export function PatientDataTable({
  columns,
  data,
  enableView = true,
  enableSelect = false,
  filterColumn = "firstName",
  onAddPatient,
  isLoading = false,
  canManagePatients = false,
}: PatientDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Hastalar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 m-4 overflow-x-auto">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          {filterColumn && (
            <DataTableFilter table={table} columnName={filterColumn} />
          )}
        </div>

        <div className="flex items-center gap-4">
          {onAddPatient && canManagePatients && (
            <Button
              onClick={onAddPatient}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Yeni Hasta Ekle
            </Button>
          )}
          {enableView && <DataTableViewOptions table={table} />}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {enableSelect && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={table.getIsAllPageRowsSelected()}
                      onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                      }
                      aria-label="Tümünü seç"
                    />
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
                >
                  {enableSelect && (
                    <TableCell>
                      <Checkbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Satırı seç"
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableSelect ? 1 : 0)}
                  className="h-24 text-center"
                >
                  Hasta bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} enableSelect={enableSelect} />
    </div>
  );
}
