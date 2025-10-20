"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

export function DataTableFilter<TData>({
  table,
  columnName,
}: {
  table: Table<TData>;
  columnName: string;
}) {
  return (
    <div>
      <Input
        placeholder={`Filter ${columnName}...`}
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnName)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
