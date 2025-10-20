import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import { Button } from "@/components/ui/button";
import type { commentSchema } from "@/lib/schema/post";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { PostCommentSelectCell } from "@/components/tables/post-detail-comment/custom-cell/post-select-cell";
import { ArrowUpDown } from "lucide-react";
import type z from "zod";

export const postDetailCommentColumns: ColumnDef<
  z.infer<typeof commentSchema>
>[] = [
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
    cell: ({ row }) => <PostCommentSelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Comment" />;
    },
    cell: ({ row }) => (
      <div className="w-[500px] truncate text-ellipsis text-wrap">
        {row.original.body}
      </div>
    ),
  },
  {
    accessorKey: "postId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Post ID" />;
    },
  },
];
