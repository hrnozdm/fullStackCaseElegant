import type { postSchema } from "@/lib/schema/post";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { Row } from "@tanstack/react-table";
import type z from "zod";

export function PostSelectCell({
  row,
}: {
  row: Row<z.infer<typeof postSchema>>;
}) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}
