import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import type { postSchema } from "@/lib/schema/post";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";
import { PostSelectCell } from "@/components/tables/post/custom-cells/post-select-cell";
import { HeaderSortingButton } from "@/components/tables/shared/header-sorting-button";
import { PostRouteCommentsCell } from "@/components/tables/post/custom-cells/post-route-comments-cell";

export const postColumns: ColumnDef<z.infer<typeof postSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <PostSelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <HeaderSortingButton column={column} title="ID" />;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Body" />;
    },
    cell: ({ row }) => (
      <div className="w-[500px] truncate text-ellipsis text-wrap">
        {row.original.body}
      </div>
    ),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User Id" />;
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Comments" />;
    },
    cell: ({ row }) => {
      return <PostRouteCommentsCell row={row} />;
    },
  },
];
